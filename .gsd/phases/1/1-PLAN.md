---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Data Persistence & Seeding

## Objective
Ensure the local SQLite database is correctly initialized, indexed, and seeded from the large JSON assets efficiently.

## Context
- .gsd/SPEC.md
- lib/db.ts
- lib/import.ts
- assets/data/champions.json

## Tasks

<task type="auto">
  <name>Finalize SQLite Schema & Indices</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/lib/db.ts</files>
  <action>
    - Add indices to champions(name) and skins(name, champion_id) to optimize search and joins.
    - Ensure 'skins' table has a composite index on (name, champion_id) if appropriate, or at least separate ones.
  </action>
  <verify>Check lib/db.ts for CREATE INDEX statements.</verify>
  <done>Indices are present on search-critical columns.</done>
</task>

<task type="auto">
  <name>Verify Seeding Performance & Totals</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/lib/import.ts</files>
  <action>
    - Ensure the import logic logs the final counts of champions and skins.
    - Confirm the use of withTransactionAsync for batch inserts.
  </action>
  <verify>Check logs for "Import finished" with item counts.</verify>
  <done>Database contains the expected number of records from JSON.</done>
</task>

## Success Criteria
- [ ] champions and skins tables indexed correctly.
- [ ] Database seeded successfully within one transaction.
- [ ] Query performance remains high with 6,000+ records.
