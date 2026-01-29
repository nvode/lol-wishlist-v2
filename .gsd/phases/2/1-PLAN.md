---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Performance Grid Foundation

## Objective
Transition the Explore tab to use high-performance components and optimized image loading to handle 6,000+ skins seamlessly.

## Context
- .gsd/phases/2/RESEARCH.md
- app/(tabs)/explore.tsx
- lib/assets.ts

## Tasks

<task type="auto">
  <name>Implement FlashList & Expo Image</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/explore.tsx</files>
  <action>
    - Import { FlashList } from "@shopify/flash-list".
    - Import { Image } from "expo-image".
    - Replace FlatList with FlashList.
    - Set `estimatedItemSize={200}`.
    - Update renderSkin to use expo-image with `transition={200}` for smooth fading.
    - Ensure the layout remains a 2-column grid.
  </action>
  <verify>Check explore.tsx for FlashList and expo-image imports.</verify>
  <done>The list scrolls smoothly and images fade in without blocking the UI.</done>
</task>

<task type="auto">
  <name>Add Debounced Search Logic</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/explore.tsx</files>
  <action>
    - Implement a `useDebounce` pattern for the search input.
    - Ensure the `useSkins` hook is only re-triggered after 300ms of inactivity in the search bar.
  </action>
  <verify>Verify that database queries in the console/network don't fire on every keystroke.</verify>
  <done>Search is performant and doesn't hammer the database.</done>
</task>

## Success Criteria
- [ ] FlashList is used with correct estimated size.
- [ ] Expo Image is used for all skin tiles.
- [ ] Search input is debounced.
