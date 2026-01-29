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

export const useSkins = (search: string = '', rarity: string = '', sortBy: 'name' | 'id' = 'name') => {
    return useQuery({
        queryKey: ['skins', search, rarity, sortBy],
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

            const orderBy = sortBy === 'name' ? 's.name ASC' : 's.id DESC';
            query += ` ORDER BY ${orderBy}`;

            const result = await db.getAllAsync<Skin>(query, params);
            return result;
        },
    });
};
