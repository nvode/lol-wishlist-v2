---
phase: 4
plan: 2
wave: 1
---

# Plan 4.2: UI Polish & Haptics

## Objective
Apply final "premium" polish to the app, including haptic feedback and minimalist UI refinements.

## Context
- app/(tabs)/explore.tsx
- app/(tabs)/collection.tsx
- app/(tabs)/settings.tsx
- components/

## Tasks

<task type="auto">
  <name>Implement Haptic Feedback</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/explore.tsx, /Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/collection.tsx</files>
  <action>
    - Add `expo-haptics` (impactAsync) to all ownership/wishlist toggles.
    - Add subtle feedback to tab switches if custom tabs are used (we used standard, so it's less critical, but good for toggles).
    - Use "Light" or "Medium" impact for a snappy feel.
  </action>
  <verify>Check toggles for Haptics calls.</verify>
  <done>User actions provide tactile feedback.</done>
</task>

<task type="auto">
  <name>Final UI Refinements</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/explore.tsx, /Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/collection.tsx</files>
  <action>
    - Review spacing and typography to ensure consistent "800" weight for titles and "Neutral" palettes.
    - Ensure Empty States in Collection are visually appealing.
    - Add a subtle shadow or border to the tab bar to separate from content if needed.
  </action>
  <verify>Review modified files for aesthetic consistency.</verify>
  <done>The app has a cohesive "premium" minimalist look.</done>
</task>

## Success Criteria
- [ ] Haptic feedback on all critical interactions.
- [ ] UI is polished and consistent with the design specification.
- [ ] No "blank" states or jarring transitions.
