# DECISIONS.md - Architecture Decision Log

## ADR-001: Use Expo SQLite for persistence
- **Context**: Need local storage for skin ownership and wishlist status.
- **Decision**: Use `expo-sqlite` as requested.
- **Rationale**: Lightweight, standard for Expo, fits the "offline-first" requirement.

## ADR-002: CommunityDragon for Image Assets
- **Context**: Local asset bundling is prohibitive due to scale.
- **Decision**: Map JSON paths to `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/`.
- **Rationale**: Reliable, up-to-date, and matches the provided JSON path structure.
