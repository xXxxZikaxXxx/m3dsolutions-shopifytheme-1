---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the local guidelines in [references/guidelines.md](references/guidelines.md)
2. Read the specified files (or ask which files to review)
3. Check against all rules in the guidelines
4. Output findings in the terse `file:line` format

## Project notes (M3D)

- The guidelines are a vendored snapshot (see `.claude/skills/README.md`); do not fetch a remote copy.
- Rules written for React/Tailwind (`onClick`, `useState`, `focus-visible:ring-*`, hydration) apply here as their Liquid, CSS and native JavaScript equivalents.
- The storefront copy is in Portuguese (Portugal): ignore the English "Title Case" rule and keep sentence case.
- The navigation pill rules in `AGENTS.md` take precedence over any animation guidance.

## Usage

When a user provides a file or pattern argument:
1. Read the guidelines from `references/guidelines.md`
2. Read the specified files
3. Apply all rules from the guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
