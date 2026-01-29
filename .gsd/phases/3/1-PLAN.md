---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Collection Management Logic & Hook

## Objective
Implement the core logic and custom hooks for managing owned skins, wishlisted skins, and favorited champions.

## Context
- .gsd/SPEC.md
- lib/db.ts
- hooks/useCollection.ts
- hooks/useSkinMutations.ts

## Tasks

<task type="auto">
  <name>Create useCollection Hook</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/hooks/useCollection.ts</files>
  <action>
    - Implement a custom hook that fetches data based on the current active tab (Owned, Wishlist, Favorites).
    - Use TanStack Query to manage the fetching state and cache invalidation.
    - Include a secondary query for collection stats (total owned count, total skins).
  </action>
  <verify>Check useCollection.ts for correct SQL queries and state management.</verify>
  <done>The hook correctly returns filtered data and statistics.</done>
</task>

<task type="auto">
  <name>Implement Champion Favoriting Mutation</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/hooks/useChampionMutations.ts</files>
  <action>
    - Create a mutation hook to toggle the `is_favorited` state for a champion in the database.
    - Invalidate the `collection` query upon success.
  </action>
  <verify>Check for the existence of useChampionMutations.ts and its toggle logic.</verify>
  <done>Champions can be toggled as favorited and the UI reflects the change.</done>
</task>

## Success Criteria
- [ ] useCollection hook handles 3 distinct views.
- [ ] Collection stats are accurately calculated from the DB.
- [ ] Champion favoriting persists in the SQLite database.
