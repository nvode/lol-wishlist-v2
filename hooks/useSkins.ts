import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';

export interface Skin {
    id: number;
    champion_id: number;
    name: string;
    rarity: string;
    is_legacy: number;
    splashPath: string;
    tilePath: string;
    loadScreenPath: string;
    description: string;
    is_owned: number;
    is_wishlisted: number;
    champion_name: string;
}

export interface SkinFilters {
    search?: string;
    rarity?: string;
    sortBy?: 'name' | 'id' | 'champion';
    championId?: number | null;
    onlyFavorited?: boolean;
    onlyUnowned?: boolean;
}

export const useSkins = ({
    search = '',
    rarity = '',
    sortBy = 'name',
    championId = null,
    onlyFavorited = false,
    onlyUnowned = false,
}: SkinFilters) => {
    return useQuery({
        queryKey: ['skins', search, rarity, sortBy, championId, onlyFavorited ? 'fav' : 'all', onlyUnowned ? 'unowned' : 'all'],
        queryFn: async (): Promise<Skin[]> => {
            let query = `
        SELECT s.*, c.name as champion_name 
        FROM skins s
        JOIN champions c ON s.champion_id = c.id
        WHERE (s.name LIKE ? OR c.name LIKE ?)
      `;
            const params: any[] = [`%${search}%`, `%${search}%`];

            if (rarity && rarity !== 'All') {
                query += ' AND s.rarity = ?';
                params.push(rarity);
            }

            if (championId) {
                query += ' AND s.champion_id = ?';
                params.push(championId);
            }

            if (onlyFavorited) {
                query += ' AND c.is_favorited = 1';
            }

            if (onlyUnowned) {
                query += ' AND s.is_owned = 0';
            }

            let orderBy = 's.id DESC';
            switch (sortBy) {
                case 'name':
                    orderBy = 's.name ASC';
                    break;
                case 'champion':
                    orderBy = 'c.name ASC, s.name ASC';
                    break;
            }
            query += ` ORDER BY ${orderBy}`;

            const result = await db.getAllAsync<Skin>(query, params);
            return result;
        },
    });
};
