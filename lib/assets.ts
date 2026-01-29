const BASE_URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default';

export const getAssetUrl = (path: string | null) => {
    if (!path) return null;
    const cleanPath = path.toLowerCase().replace('/lol-game-data/assets/', '');
    return `${BASE_URL}/${cleanPath}`;
};
