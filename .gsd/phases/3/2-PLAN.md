---
phase: 3
plan: 2
wave: 1
---

# Plan 3.2: Collection UI & Progress Tracking

## Objective
Build the Collection tab interface with a segmented view for Owned items, Wishlist, and Favorited Champions, including progress tracking.

## Context
- app/(tabs)/collection.tsx
- hooks/useCollection.ts

## Tasks

<task type="auto">
  <name>Build Collection Tab Interface</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/collection.tsx</files>
  <action>
    - Implement a minimalist segmented control (Owned, Wishlist, Champions).
    - Use FlashList for rendering the items to ensure performance.
    - Display skin tiles for Owned/Wishlist and champion portraits for Favorites.
  </action>
  <verify>Check collection.tsx for segment switching and FlashList implementation.</verify>
  <done>User can switch between views and see their saved items smoothly.</done>
</task>

<task type="auto">
  <name>Implement Progress Tracking Header</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/collection.tsx</files>
  <action>
    - Add a header section showing the total completion percentage of the skin collection.
    - Style with a minimalist progress bar as per research findings.
  </action>
  <verify>Check for progress bar UI in the collection tab.</verify>
  <done>The header reflects accurate collection stats from the database.</done>
</task>

## Success Criteria
- [ ] Segmented control allows switching between 3 views.
- [ ] Collection progress is visible and accurate.
- [ ] List performance remains high using FlashList.
