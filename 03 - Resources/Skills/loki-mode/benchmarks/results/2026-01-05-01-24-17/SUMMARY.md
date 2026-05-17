---
type: skill-dokument
created: 2026-04-11
parent-skill: "loki-mode"
domain: communication-content
category: writing
tags:
  - skill-referenz
  - communication-content
  - writing
---
# Loki Mode Benchmark Results

**Generated:** 2026-01-05 07:34:38

## Overview

This directory contains benchmark results for Loki Mode multi-agent system.

## SWE-bench Lite Results

| Metric | Value |
|--------|-------|
| Problems | 300 |
| Patches Generated | 299 |
| Errors | 1 |
| Model | opus |
| Time | 22218.33s |

**Next Step:** Run the SWE-bench evaluator to validate patches:

```bash
python -m swebench.harness.run_evaluation     --predictions /Users/lokesh/git/loki-mode/benchmarks/results/2026-01-05-01-24-17/swebench-predictions.json     --max_workers 4
```

## Methodology

Loki Mode uses its multi-agent architecture to solve each problem:
1. **Architect Agent** analyzes the problem
2. **Engineer Agent** implements the solution
3. **QA Agent** validates with test cases
4. **Review Agent** checks code quality

This mirrors real-world software development more accurately than single-agent approaches.

## Running Benchmarks

```bash
# Setup only (download datasets)
./benchmarks/run-benchmarks.sh all

# Execute with Claude
./benchmarks/run-benchmarks.sh humaneval --execute
./benchmarks/run-benchmarks.sh humaneval --execute --limit 10  # First 10 only
./benchmarks/run-benchmarks.sh swebench --execute --limit 5    # First 5 only

# Use different model
./benchmarks/run-benchmarks.sh humaneval --execute --model opus
```

## Connections

- **Gehoert zu:** [[loki-mode]]
- **Pfad:** `benchmarks/results/2026-01-05-01-24-17/SUMMARY.md`
- **Domain:** [[Kommunikation & Content]]
- **Kategorie:** [[Schreiben & Texten]]
