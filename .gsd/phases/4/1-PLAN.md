---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: Settings & Updates

## Objective
Implement the mandatory Settings screen with `expo-updates` integration and project credits.

## Context
- .gsd/SPEC.md
- app/(tabs)/settings.tsx

## Tasks

<task type="auto">
  <name>Build Settings Screen UI</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/settings.tsx</files>
  <action>
    - Group settings into logical sections: "App", "About", and "Data".
    - "App": Add "Check for Updates" row and Display Version.
    - "About": Add credits to CommunityDragon.
    - "Data": Add a "Reset App Data" option (Clears SQLite owned/wishlisted states).
  </action>
  <verify>Check settings.tsx for sections and rows.</verify>
  <done>The settings screen is usable and follows the minimalist style.</done>
</task>

<task type="auto">
  <name>Implement Expo Updates Logic</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/settings.tsx</files>
  <action>
    - Integrate `Updates.useUpdates()` and `Updates.fetchUpdateAsync()`.
    - Show an alert or indicator when an update is found/downloading.
    - Prompt the user to restart to apply updates.
  </action>
  <verify>Check for expo-updates imports and logic in settings.tsx.</verify>
  <done>Updates can be checked and applied from the UI.</done>
</task>

## Success Criteria
- [ ] Settings screen has "App", "About", and "Data" sections.
- [ ] Update check is functional.
- [ ] CommunityDragon is attributed.
