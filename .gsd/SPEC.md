# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
A minimal, performant mobile app for League of Legends players to track their skin collection and manage a wishlist, leveraging local SQLite storage for a snappy offline-first experience.

## Goals
1. **Skin Exploration**: Provide a searchable grid of all available skins with robust filtering and sorting.
2. **Collection Management**: Enable users to track skins they own and skins they desire (wishlist).
3. **Champion Favorites**: Allow users to maintain a list of their most-liked champions.
4. **Offline First**: Use Expo SQLite for all persistent state, ensuring data remains available without an active connection.

## Non-Goals (Out of Scope)
- Real-time price tracking (using static JSON data).
- Social features (sharing lists, friend collections).
- Riot Games API integration (manual tracking only).
- Multi-region account syncing.

## Users
League of Legends enthusiasts who want a dedicated tool to organize their skin collection and plan future purchases outside of the main game client.

## Constraints
- **Platform**: Expo (React Native).
- **Storage**: Expo SQLite.
- **Styling**: Tailwind CSS (NativeWind/Uniwind).
- **Assets**: Remote images via CommunityDragon CDN.
- **Design**: Minimalist aesthetics.

## Success Criteria
- [ ] Users can find any skin within 3 taps/queries in the Explore tab.
- [ ] Wishlist and Owned status updates are persisted immediately to SQLite.
- [ ] The app handles the 6,000+ skin dataset gracefully with smooth scrolling.
- [ ] "Collection" tab accurately reflects the local database state.
