import { db } from '@/lib/db';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSkinMutations = () => {
    const queryClient = useQueryClient();

    const toggleOwned = useMutation({
        mutationFn: async ({ id, owned }: { id: number; owned: boolean }) => {
            await db.runAsync('UPDATE skins SET is_owned = ? WHERE id = ?', [owned ? 1 : 0, id]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skins'] });
            queryClient.invalidateQueries({ queryKey: ['collection'] });
        },
    });

    const toggleWishlist = useMutation({
        mutationFn: async ({ id, wishlisted }: { id: number; wishlisted: boolean }) => {
            await db.runAsync('UPDATE skins SET is_wishlisted = ? WHERE id = ?', [wishlisted ? 1 : 0, id]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skins'] });
            queryClient.invalidateQueries({ queryKey: ['collection'] });
        },
    });

    return { toggleOwned, toggleWishlist };
};
