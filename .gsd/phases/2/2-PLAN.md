---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Advanced Filters & Sorting

## Objective
Add functional filtering by rarity and sorting capabilities to the Explore tab.

## Context
- hooks/useSkins.ts
- app/(tabs)/explore.tsx

## Tasks

<task type="auto">
  <name>Implement Rarity Filtering & Sorting Logic</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/hooks/useSkins.ts, /Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/explore.tsx</files>
  <action>
    - Update `useSkins` hook to accept `rarity` and `sortBy` parameters.
    - Map internal rarity strings (kNoRarity, kEpic, kLegendary, kMythic, kUltimate) to human labels.
    - Add a horizontal scroll of Filter chips in the Explore header.
    - Implement sorting toggle (A-Z vs Newest/ID).
  </action>
  <verify>Filter through different rarities and confirm the count updates correctly.</verify>
  <done>Users can easily find skins by rarity and sort them.</done>
</task>

<task type="auto">
  <name>Rarity Visual Indicators</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/explore.tsx</files>
  <action>
    - Add a small color-coded badge or indicator on the skin card for different rarities.
    - Legendary: #D32F2F (Red), Mythic: #8E24AA (Purple), Epic: #039BE5 (Blue).
  </action>
  <verify>Check skin cards for rarity-colored elements.</verify>
  <done>Skin cards effectively communicate skin value/rarity.</done>
</task>

## Success Criteria
- [ ] At least 4-5 rarity filter chips are functional.
- [ ] Sorting between Alphabetical and Newest works.
- [ ] Visual rarity indicators are present on cards.
