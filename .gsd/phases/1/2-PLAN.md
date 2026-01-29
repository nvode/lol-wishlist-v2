---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: Navigation & Styling

## Objective
Finalize the minimalist tab navigation and verify Tailwind (Uniwind) integration.

## Context
- app/(tabs)/_layout.tsx
- global.css
- metro.config.js

## Tasks

<task type="auto">
  <name>Finalize Tab Layout UI</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/app/(tabs)/_layout.tsx</files>
  <action>
    - Set custom tabBarIcon styles for consistency across all 3 tabs.
    - Ensure header fonts and spacing follow a minimal aesthetic (Neutral 900 for text, light backgrounds).
  </action>
  <verify>Check _layout.tsx for TabBarIcon configuration.</verify>
  <done>Navigation is clean, searchable, and uses Lucide icons with 1px stroke.</done>
</task>

<task type="auto">
  <name>Verify Uniwind scan paths</name>
  <files>/Users/sarabostrom/Code/quest/lol-wishlist-v2/global.css</files>
  <action>
    - Ensure Tailwind 4 is correctly picking up classes in app/ and components/.
    - (Tailwind 4 usually does this automatically if configured correctly).
  </action>
  <verify>Check global.css for standard @import tailwindcss.</verify>
  <done>Styling is reactive and classes are applied correctly.</done>
</task>

## Success Criteria
- [ ] Collection screen is the default tab.
- [ ] Explore and Settings screens are accessible.
- [ ] UI reflects the "Minimal" constraint from SPEC.md.
