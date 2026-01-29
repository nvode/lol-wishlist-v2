import { db } from '@/lib/db';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChampionMutations = () => {
    const queryClient = useQueryClient();

    const toggleFavorite = useMutation({
        mutationFn: async ({ id, favorited }: { id: number; favorited: boolean }) => {
            await db.runAsync('UPDATE champions SET is_favorited = ? WHERE id = ?', [favorited ? 1 : 0, id]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collection'] });
            queryClient.invalidateQueries({ queryKey: ['champions'] });
        },
    });

    return { toggleFavorite };
};
