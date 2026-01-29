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
            let data: (Skin | Champion)[] = [];
            if (type === 'favorites') {
                data = await db.getAllAsync<Champion>('SELECT * FROM champions WHERE is_favorited = 1 ORDER BY name ASC');
            } else {
                const query = `
                    SELECT s.*, c.name as champion_name 
                    FROM skins s
                    JOIN champions c ON s.champion_id = c.id
                    WHERE ${type === 'owned' ? 's.is_owned = 1' : 's.is_wishlisted = 1'}
                    ORDER BY s.name ASC
                `;
                data = await db.getAllAsync<Skin>(query);
            }

            const statsResult = await db.getFirstAsync<{ owned: number; total: number }>(
                'SELECT (SELECT COUNT(*) FROM skins WHERE is_owned = 1) as owned, (SELECT COUNT(*) FROM skins) as total'
            );

            return {
                data,
                stats: statsResult || { owned: 0, total: 0 }
            };
        },
    });
};
