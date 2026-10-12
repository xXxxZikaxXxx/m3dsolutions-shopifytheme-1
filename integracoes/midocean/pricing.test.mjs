import test from 'node:test';
import assert from 'node:assert/strict';
import { simulatePrice, PRICING_SIMULATION_POLICY } from './pricing.mjs';

const money = (amountMinor, overrides = {}) => ({
  amountMinor, currency: 'EUR', unit: 'minor_per_unit', ...overrides,
});
const input = (overrides = {}) => ({
  quantity: 1,
  currency: 'EUR',
  vatBasisPoints: 0,
  supplierUnitCost: money(1000),
  printingUnitCosts: [],
  preparationUnitCost: null,
  ...overrides,
});

for (const [quantity, factor, unit] of [
  [199, '160', '1600'], [200, '150', '1500'],
  [499, '150', '1500'], [500, '140', '1400'],
  [1999, '140', '1400'], [2000, '135', '1350'],
]) {
  test(`factor boundary: ${quantity} units`, () => {
    const quote = simulatePrice(input({ quantity }));
    assert.deepEqual(quote.factor, { numerator: factor, denominator: '100' });
    assert.equal(quote.rounded.grossUnitMinor, unit);
    assert.equal(quote.rounded.grossTotalMinor, (BigInt(unit) * BigInt(quantity)).toString());
  });
}

test('minimum one-unit order and explicit zero VAT', () => {
  const quote = simulatePrice(input());
  assert.equal(quote.rounded.grossUnitMinor, '1600');
  assert.equal(quote.rounded.grossTotalMinor, '1600');
  assert.equal(quote.vatBasisPoints, 0);
  assert.equal(quote.exact.vatUnitMinor.numerator, '0');
  assert.equal(quote.policy.simulationOnly, true);
  assert.equal(quote.simulationOnly, true);
});

test('reject invalid, missing and unsafe quantities', () => {
  for (const quantity of [0, -1, 1.5, NaN, Infinity, undefined, '200', 200n, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => simulatePrice(input({ quantity })), /quantity/);
  }
});

test('multiple printing items and normalised setup each enter the base once', () => {
  const quote = simulatePrice(input({
    quantity: 200,
    vatBasisPoints: 2300,
    supplierUnitCost: money(100),
    printingUnitCosts: [money(20), money(30), money(0)],
    preparationUnitCost: money(10),
  }));
  assert.deepEqual(quote.costs, {
    supplierUnitMinor: '100', printingUnitMinor: '50',
    preparationUnitMinor: '10', baseUnitMinor: '160',
  });
  assert.equal(quote.rounded.netUnitDisplayMinor, '240');
  assert.equal(quote.rounded.grossUnitMinor, '295'); // 160 * 1.50 * 1.23 = 295.2 cents.
  assert.equal(quote.rounded.grossTotalMinor, '59000');
});

test('VAT occurs once, after the exact markup and before final gross rounding', () => {
  const quote = simulatePrice(input({
    quantity: 200, supplierUnitCost: money(37), vatBasisPoints: 2300,
  }));
  assert.deepEqual(quote.exact.netUnitMinor, { numerator: '5550', denominator: '100' });
  assert.deepEqual(quote.exact.vatUnitMinor, { numerator: '12765000', denominator: '1000000' });
  assert.deepEqual(quote.exact.grossUnitMinor, { numerator: '68265000', denominator: '1000000' });
  assert.equal(quote.rounded.netUnitDisplayMinor, '56');
  assert.equal(quote.rounded.grossUnitMinor, '68');
  // Rounding net to 56 first would give 69, applying VAT twice would give 84.
  assert.equal(quote.rounded.grossTotalMinor, '13600');
  assert.match(quote.policy.roundedNetPurpose, /display-only/);
});

test('HALF_UP handles an exact half-cent and neighbouring amounts', () => {
  const quote = simulatePrice(input({ quantity: 200, supplierUnitCost: money(1) }));
  assert.equal(quote.rounded.grossUnitMinor, '2'); // Exactly 1.5 cents.
  assert.equal(simulatePrice(input({ quantity: 2000, supplierUnitCost: money(1) })).rounded.grossUnitMinor, '1');
  assert.equal(simulatePrice(input({ quantity: 2000, supplierUnitCost: money(2) })).rounded.grossUnitMinor, '3');
});

test('totals use rounded gross unit, rather than silently rounding an exact total', () => {
  const quote = simulatePrice(input({ quantity: 2500, supplierUnitCost: money(297) }));
  assert.deepEqual(quote.exact.netUnitMinor, { numerator: '40095', denominator: '100' });
  assert.equal(quote.rounded.grossUnitMinor, '401');
  assert.equal(quote.rounded.grossTotalMinor, '1002500');
  // Exact total would be 1002375 cents; this proposal charges the rounded unit.
});

test('reject negative, fractional, non-finite, textual and unsafe numeric costs', () => {
  for (const amount of [-1, -1n, 0.5, NaN, Infinity, '100', undefined, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => simulatePrice(input({ supplierUnitCost: money(amount) })), /amountMinor/);
  }
  assert.throws(() => simulatePrice(input({ printingUnitCosts: [money(-1)] })), /amountMinor/);
  assert.throws(() => simulatePrice(input({ preparationUnitCost: money(-1) })), /amountMinor/);
});

test('reject zero base and non-array or sparse printing inputs', () => {
  assert.throws(() => simulatePrice(input({ supplierUnitCost: money(0) })), /zero total cost/);
  assert.throws(() => simulatePrice(input({ supplierUnitCost: money(0), printingUnitCosts: [money(0)] })), /zero total cost/);
  for (const printingUnitCosts of [null, undefined, {}, new Array(1)]) {
    assert.throws(() => simulatePrice(input({ printingUnitCosts })), /printingUnitCosts/);
  }
  // Zero supplier cost is valid if the configuration has a positive printing cost.
  assert.equal(simulatePrice(input({ supplierUnitCost: money(0), printingUnitCosts: [money(100)] })).rounded.grossUnitMinor, '160');
});

test('reject inconsistent units/currencies, total setup, VAT-inclusive metadata and unknown fields', () => {
  assert.throws(() => simulatePrice(input({ currency: 'USD' })), /currency/);
  assert.throws(() => simulatePrice(input({ supplierUnitCost: money(100, { currency: 'USD' }) })), /currency/);
  assert.throws(() => simulatePrice(input({ printingUnitCosts: [money(100, { currency: 'eur' })] })), /currency/);
  assert.throws(() => simulatePrice(input({ supplierUnitCost: money(100, { unit: 'major_per_unit' }) })), /unit/);
  assert.throws(() => simulatePrice(input({ preparationUnitCost: money(100, { unit: 'minor_per_configuration' }) })), /normalise setup first/);
  assert.throws(() => simulatePrice(input({ preparationTotalCost: money(100) })), /unsupported field/);
  assert.throws(() => simulatePrice(input({ supplierUnitCost: money(100, { taxIncluded: true }) })), /unsupported field/);
  assert.throws(() => simulatePrice(input({ destination: 'PT' })), /unsupported field/);
});

test('VAT must be explicitly supplied as integer basis points, with no destination default', () => {
  for (const vatBasisPoints of [undefined, null, NaN, Infinity, -1, 23.5, '2300', 2300n, 10001]) {
    assert.throws(() => simulatePrice(input({ vatBasisPoints })), /vatBasisPoints/);
  }
  assert.equal(simulatePrice(input({ vatBasisPoints: 10000 })).rounded.grossUnitMinor, '3200');
  assert.equal(simulatePrice(input({ vatBasisPoints: 2100 })).rounded.grossUnitMinor, '1936');
});

test('bigint arithmetic preserves prices and totals beyond Number safe range', () => {
  const quote = simulatePrice(input({
    quantity: 2000,
    supplierUnitCost: money(1000000000000000000n),
    vatBasisPoints: 2300,
  }));
  assert.equal(quote.rounded.grossUnitMinor, '1660500000000000000');
  assert.equal(quote.rounded.grossTotalMinor, '3321000000000000000000');
  assert.deepEqual(JSON.parse(JSON.stringify(quote)), quote);
});

test('summing safe numeric components does not overflow into floating-point loss', () => {
  const quote = simulatePrice(input({
    quantity: 2000,
    supplierUnitCost: money(Number.MAX_SAFE_INTEGER),
    printingUnitCosts: [money(1)],
  }));
  assert.equal(quote.costs.baseUnitMinor, '9007199254740992');
  assert.equal(quote.rounded.grossUnitMinor, '12159718993900339');
  assert.equal(quote.rounded.grossTotalMinor, '24319437987800678000');
});

test('maximum safe quantity is accepted without precision loss in the total', () => {
  const quote = simulatePrice(input({
    quantity: Number.MAX_SAFE_INTEGER, supplierUnitCost: money(1),
  }));
  assert.equal(quote.quantity, Number.MAX_SAFE_INTEGER);
  assert.equal(quote.rounded.grossUnitMinor, '1');
  assert.equal(quote.rounded.grossTotalMinor, '9007199254740991');
});

test('inputs and policy remain unchanged across independent calls', () => {
  const request = input({ printingUnitCosts: [money(10)] });
  Object.freeze(request.supplierUnitCost);
  Object.freeze(request.printingUnitCosts[0]);
  Object.freeze(request.printingUnitCosts);
  Object.freeze(request);
  const before = JSON.stringify(request);
  const first = simulatePrice(request);
  first.policy.version = 'changed-by-caller';
  const second = simulatePrice(request);
  assert.equal(JSON.stringify(request), before);
  assert.equal(second.policy.version, PRICING_SIMULATION_POLICY.version);
  assert.equal(second.rounded.grossUnitMinor, '1616');
  assert.notEqual(first.policy, second.policy);
  assert.throws(() => simulatePrice(null), /plain object/);
  assert.throws(() => simulatePrice([]), /plain object/);
});
