# Research: Phase 2 - Explore Tab Performance

## Objective
Identify the best practices for rendering a searchable grid of 6,000+ skins in an Expo application while maintaining 60 FPS.

## Findings

### 1. List Component: FlashList vs FlatList
- **FlatList**: Standard React Native component. Struggles with large datasets as it creates/destroys components frequently, leading to memory overhead and "blank" spots during fast scrolling.
- **FlashList (Shopify)**: Highly optimized list component that recycles views. 
    - **Performance**: Up to 5x faster FPS than FlatList.
    - **Memory**: Lower memory footprint due to view recycling.
    - **Constraint**: Requires `estimatedItemSize` to be set for layout prediction.
- **Verdict**: Use `FlashList`.

### 2. Image Optimization
- **CommunityDragon CDN**: Reliable source for LoL assets.
- **Caching**: Using `expo-image` (based on SDWebImage/Glide) is recommended over the standard React Native `Image` for better caching, cross-fading, and performance.
- **Loading States**: Skeletons or subtle placeholders should be used to avoid layout shifts.

### 3. Filter/Search Performance
- **Database level**: Search should be performed in the SQLite query using `LIKE` with the indices we added in Phase 1 (`idx_skins_name`, `idx_champions_name`).
- **Debouncing**: Search input should be debounced (e.g., 200-300ms) to avoid hammering the database on every keystroke.

## Recommended Tech Stack for Phase 2
- **List**: `@shopify/flash-list`
- **Images**: `expo-image`
- **Logic**: TanStack Query (already set up) for managing the data fetching state.
