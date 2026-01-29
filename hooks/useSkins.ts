import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';

export interface Skin {
    id: number;
    champion_id: number;
    name: number;
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

export const useSkins = (search: string = '', filter: string = '', sortBy: 'name' | 'id' = 'name') => {
    return useQuery({
        queryKey: ['skins', search, filter, sortBy],
        queryFn: async (): Promise<Skin[]> => {
            let query = `
        SELECT s.*, c.name as champion_name 
        FROM skins s
        JOIN champions c ON s.champion_id = c.id
        WHERE (s.name LIKE ? OR c.name LIKE ?)
      `;
            const params: any[] = [`%${search}%`, `%${search}%`];

            if (filter) {
                query += ' AND s.rarity = ?';
                params.push(filter);
            }

            query += ` ORDER BY s.${sortBy === 'name' ? 'name' : 'id'} ASC`;

            const result = await db.getAllAsync<Skin>(query, params);
            return result;
        },
    });
};
