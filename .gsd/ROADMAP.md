# ROADMAP.md

> **Current Phase**: Phase 1: Foundation & Data
> **Milestone**: v1.0 - Core Wishlist Experience

## Must-Haves (from SPEC)
- [ ] Expo SQLite storage implementation.
- [ ] Data import pipeline (parsing JSON into SQLite).
- [ ] Explore tab with searchable skin grid.
- [ ] Filtering by Champion, Skin Line, Rarity.
- [ ] Sorting by Price, Release Date.
- [ ] Collection tab (Owned, Wishlisted, Fav Champions).
- [ ] CommunityDragon image integration.

## Phases

### Phase 1: Foundation & Data ✅
**Status**: ✅ Complete
**Objective**: Initialize project structure and seed SQLite database with champion/skin data from JSON.
- REQ-01: Set up Expo project with TypeScript and Tailwind.
- REQ-02: Implement SQLite schema and data import script.
- REQ-03: Create core navigation wrapper (Collection, Explore, Settings).

### Phase 2: Explore Tab ⬜
**Status**: ⬜ Not Started
**Objective**: Build a high-performance searchable grid for 6,000+ skins.
- REQ-04: Implement skin card component with remote images.
- REQ-05: Build search and filter logic (Champion, Rarity, Line).
- REQ-06: Implement sorting (Price, Date).

### Phase 3: Collection Logic ⬜
**Status**: ⬜ Not Started
**Objective**: Implement the persistent state for Owned, Wishlisted, and Favorite status.
- REQ-07: Add toggle buttons for Owned/Wishlist state.
- REQ-08: Build the Collection tab views (Owned list, Wishlist, Favorites).
- REQ-09: Implement Champion Favoriting list.

### Phase 4: Polish & Settings ⬜
**Status**: ⬜ Not Started
**Objective**: Final UI refinement and mandatory features.
- REQ-10: Settings screen with `expo-updates` integration.
- REQ-11: Performance optimization for large lists (FlashList).
- REQ-12: Minimal design polish and transition animations.
