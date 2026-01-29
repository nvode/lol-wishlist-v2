# Research: Phase 4 - Polish & Settings

## Objective
Finalize the Settings screen with update capabilities and apply "premium" minimalist polish.

## Findings

### 1. Settings Screen Requirements
- **Rules Mapping**: Must include an update check using `expo-updates`.
- **UI Structure**:
    - **Header**: Large Title.
    - **Section**: "App" (Updates, Version).
    - **Section**: "Data" (Reset Database - for dev/user preference).
    - **Section**: "About" (CommunityDragon attribution).

### 2. Expo Updates Logic
- `Updates.useUpdates()` hook provides status.
- Trigger `Updates.fetchUpdateAsync()` if `available` is true.
- Use `Updates.reloadAsync()` to apply.

### 3. Premium UI Polish
- **Haptics**: Add `expo-haptics` for button presses (owned/wishlist toggles).
- **Transitions**: Ensure tab transitions are smooth.
- **Micro-interactions**: Hover/Press states for all buttons.
- **Typography**: Check if we need a custom font for the titles (e.g., Outfit or Inter). I'll stick to system fonts for now as per "minimalist" unless specified, but regular "800" weight works for premium feel.

### 4. Attribution
- CommunityDragon requires attribution for using their API/assets. This will be added to Settings.

## Recommended Tech Stack for Phase 4
- `expo-updates`
- `expo-haptics` (optional but recommended for premium feel)
