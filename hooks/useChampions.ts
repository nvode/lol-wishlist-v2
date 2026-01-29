import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';

export interface Champion {
    id: number;
    name: string;
    alias: string;
    squarePortraitPath: string;
    is_favorited: number;
}

export const useChampions = () => {
    return useQuery({
        queryKey: ['champions'],
        queryFn: async (): Promise<Champion[]> => {
            return db.getAllAsync<Champion>('SELECT * FROM champions ORDER BY name ASC');
        },
    });
};
