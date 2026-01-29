# Research: Phase 3 - Collection Logic & UX

## Objective
Define the optimal implementation for the Collection tab, including progress tracking and champion favoriting.

## Findings

### 1. Collection Statistics
- **Progress Tracking**: Users should see their completion percentage (e.g., "Owned 120/1500 skins"). 
- **Implementation**: A simple SQL `COUNT` query can provide these stats for the header.
- **Visuals**: A minimalist progress bar (Neutral 200 background, Black foreground) fits the design spec.

### 2. Collection Tab Switching
- **Tabs**: "Owned", "Wishlist", and "Champions".
- **Navigation**: Segmented control or simple text buttons with an indicator. Given the minimalist focus, simple text labels with a black underline for the active state are preferred.

### 3. Champion Favoriting
- **Logic**: Unlike skins (which are owned/wishlisted), champions are usually "favorited" to quickly see who you play.
- **Database**: We already have an `is_favorite` column in the `champions` table from Phase 1.
- **UX**: Long press or a dedicated star icon on the champion portrait.

### 4. Performance
- **FlashList**: Even in the Collection tab, if a user owns 500+ skins, we should use `FlashList` for the same performance reasons identified in Phase 2.

## Implementation Strategy
- Use a single `useCollection` hook that can filter by "Owned", "Wishlist", or "Champions".
- Use `withTransactionAsync` for any bulk operations (though mostly atomic toggles in this phase).
