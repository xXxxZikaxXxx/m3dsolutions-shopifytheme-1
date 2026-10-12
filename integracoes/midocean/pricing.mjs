/**
 * Local pricing simulation only. No supplier/Shopify connection or tax lookup.
 *
 * Costs are NET integer minor units per physical unit, in EUR. A preparation
 * cost is accepted only after the caller has normalised it to that same unit;
 * no allocation of a setup total, deduplication or feed selection happens here.
 * In this proposed simulation, normalised preparation is part of the marked-up
 * cost base. This is not an approved commercial treatment of preparation.
 *
 * Quantity means one configuration, and the selected factor applies to every
 * unit. Grouping across variants/artworks and unit rounding are proposals.
 *
 * Gross is rounded HALF_UP only at the final unit, AFTER the exact factor and
 * explicit VAT. Total is that rounded unit multiplied by quantity. Rounded net
 * is informational and MUST NOT be used as the base of the gross calculation.
 * Shopify can round/invoice differently; this module does not certify parity.
 * All monetary output and rational operands are decimal strings for JSON.
 * Output includes purchase costs and exact bases: PRIVATE server-side data,
 * never a storefront response. A separate public projection must omit costs.
 */

export const PRICING_SIMULATION_POLICY = Object.freeze({
  version: 'm3d-pricing-simulation-v1',
  simulationOnly: true,
  currency: 'EUR',
  minorUnitExponent: 2,
  costBasis: 'net',
  quantityScope: 'one-configuration-proposed',
  factorScope: 'all-units-in-configuration-proposed',
  preparationTreatment: 'normalised-per-unit-in-cost-base-proposed',
  rounding: 'half-up-final-gross-unit-proposed',
  totalBasis: 'rounded-gross-unit-times-quantity',
  roundedNetPurpose: 'display-only-not-gross-or-shopify-price-input',
});

const INPUT_KEYS = new Set([
  'quantity', 'currency', 'vatBasisPoints', 'supplierUnitCost',
  'printingUnitCosts', 'preparationUnitCost',
]);
const MONEY_KEYS = new Set(['amountMinor', 'currency', 'unit']);
const FACTOR_DENOMINATOR = 100n;
const VAT_DENOMINATOR = 10000n;

function assertRecord(value, label, allowedKeys) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be a plain object`);
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError(`${label} must be a plain object`);
  }
  for (const key of Reflect.ownKeys(value)) {
    if (!allowedKeys.has(key)) {
      throw new TypeError(`${label} contains an unsupported field`);
    }
  }
}

function minorAmount(value, label) {
  if (typeof value === 'bigint') {
    if (value < 0n) throw new RangeError(`${label} must not be negative`);
    return value;
  }
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new TypeError(`${label} must be a safe integer number or bigint`);
  }
  if (value < 0) throw new RangeError(`${label} must not be negative`);
  return BigInt(value);
}

function readUnitCost(value, currency, label) {
  assertRecord(value, label, MONEY_KEYS);
  if (value.currency !== currency) {
    throw new TypeError(`${label}.currency must match the simulation currency`);
  }
  if (value.unit !== 'minor_per_unit') {
    throw new TypeError(`${label}.unit must be minor_per_unit; normalise setup first`);
  }
  return minorAmount(value.amountMinor, `${label}.amountMinor`);
}

function factorNumerator(quantity) {
  if (quantity < 200) return 160n;
  if (quantity < 500) return 150n;
  if (quantity < 2000) return 140n;
  return 135n;
}

function roundHalfUp(numerator, denominator) {
  // Operands are non-negative. Compare twice the remainder, with no floats.
  const whole = numerator / denominator;
  const remainder = numerator % denominator;
  return whole + (remainder * 2n >= denominator ? 1n : 0n);
}

function rational(numerator, denominator) {
  return { numerator: numerator.toString(), denominator: denominator.toString() };
}

/**
 * @param {object} input
 * @param {number} input.quantity Positive safe integer for one configuration.
 * @param {'EUR'} input.currency No implicit currency conversion.
 * @param {number} input.vatBasisPoints Explicit integer 0..10000 (2300 = 23%).
 *   This validates arithmetic bounds, not destination or legal tax eligibility.
 * @param {{amountMinor: number|bigint, currency: 'EUR', unit: 'minor_per_unit'}} input.supplierUnitCost
 * @param {Array<{amountMinor: number|bigint, currency: 'EUR', unit: 'minor_per_unit'}>} input.printingUnitCosts
 * @param {{amountMinor: number|bigint, currency: 'EUR', unit: 'minor_per_unit'}|null} [input.preparationUnitCost]
 * @returns {object} JSON-serialisable simulation with exact unit rationals.
 */
export function simulatePrice(input) {
  assertRecord(input, 'input', INPUT_KEYS);
  const { quantity, currency, vatBasisPoints } = input;
  if (!Number.isSafeInteger(quantity) || quantity <= 0) {
    throw new RangeError('quantity must be a positive safe integer number');
  }
  if (currency !== PRICING_SIMULATION_POLICY.currency) {
    throw new TypeError('currency must be EUR; currency conversion is not supported');
  }
  if (!Number.isSafeInteger(vatBasisPoints) || vatBasisPoints < 0 || vatBasisPoints > 10000) {
    throw new RangeError('vatBasisPoints must be an explicit integer from 0 to 10000');
  }
  if (!Array.isArray(input.printingUnitCosts)) {
    throw new TypeError('printingUnitCosts must be an array, including when empty');
  }

  const supplierCost = readUnitCost(input.supplierUnitCost, currency, 'supplierUnitCost');
  let printingCost = 0n;
  // Iteration also validates undefined entries in sparse arrays.
  for (const [index, cost] of input.printingUnitCosts.entries()) {
    printingCost += readUnitCost(cost, currency, `printingUnitCosts[${index}]`);
  }
  const preparationCost = input.preparationUnitCost == null
    ? 0n
    : readUnitCost(input.preparationUnitCost, currency, 'preparationUnitCost');
  const baseCost = supplierCost + printingCost + preparationCost;
  if (baseCost === 0n) throw new RangeError('a zero total cost cannot produce a sale price');

  const factor = factorNumerator(quantity);
  const netNumerator = baseCost * factor;
  const vatNumerator = netNumerator * BigInt(vatBasisPoints);
  const grossNumerator = netNumerator * (VAT_DENOMINATOR + BigInt(vatBasisPoints));
  const grossDenominator = FACTOR_DENOMINATOR * VAT_DENOMINATOR;
  const netUnitDisplay = roundHalfUp(netNumerator, FACTOR_DENOMINATOR);
  const grossUnit = roundHalfUp(grossNumerator, grossDenominator);
  const grossTotal = grossUnit * BigInt(quantity);
  if (grossTotal === 0n) throw new RangeError('a zero total sale price is not supported');

  return {
    simulationOnly: true,
    policy: { ...PRICING_SIMULATION_POLICY },
    quantity,
    currency,
    vatBasisPoints,
    factor: rational(factor, FACTOR_DENOMINATOR),
    costs: {
      supplierUnitMinor: supplierCost.toString(),
      printingUnitMinor: printingCost.toString(),
      preparationUnitMinor: preparationCost.toString(),
      baseUnitMinor: baseCost.toString(),
    },
    exact: {
      netUnitMinor: rational(netNumerator, FACTOR_DENOMINATOR),
      vatUnitMinor: rational(vatNumerator, grossDenominator),
      grossUnitMinor: rational(grossNumerator, grossDenominator),
    },
    rounded: {
      netUnitDisplayMinor: netUnitDisplay.toString(),
      grossUnitMinor: grossUnit.toString(),
      grossTotalMinor: grossTotal.toString(),
    },
  };
}
