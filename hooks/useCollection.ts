import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';
import { Skin } from './useSkins';

export interface Champion {
    id: number;
    name: string;
    alias: string;
    squarePortraitPath: string;
    is_favorited: number;
}

export const useCollection = (type: 'owned' | 'wishlist' | 'favorites') => {
    return useQuery({
        queryKey: ['collection', type],
        queryFn: async () => {
            if (type === 'favorites') {
                return await db.getAllAsync<Champion>('SELECT * FROM champions WHERE is_favorited = 1 ORDER BY name ASC');
            }

            const query = `
        SELECT s.*, c.name as champion_name 
        FROM skins s
        JOIN champions c ON s.champion_id = c.id
        WHERE ${type === 'owned' ? 's.is_owned = 1' : 's.is_wishlisted = 1'}
        ORDER BY s.name ASC
      `;
            return await db.getAllAsync<Skin>(query);
        },
    });
};
