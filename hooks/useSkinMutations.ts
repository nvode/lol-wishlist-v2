import { db } from '@/lib/db';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSkinMutations = () => {
    const queryClient = useQueryClient();

    const toggleOwned = useMutation({
        mutationFn: async ({ id, owned }: { id: number; owned: boolean }) => {
            await db.runAsync('UPDATE skins SET is_owned = ? WHERE id = ?', [owned ? 1 : 0, id]);
        },
        onMutate: async ({ id, owned }) => {
            await queryClient.cancelQueries({ queryKey: ['skins'] });
            const previousSkins = queryClient.getQueryData(['skins']);

            queryClient.setQueriesData({ queryKey: ['skins'] }, (oldData: any) => {
                if (!oldData) return oldData;
                return oldData.map((skin: any) =>
                    skin.id === id ? { ...skin, is_owned: owned ? 1 : 0 } : skin
                );
            });

            return { previousSkins };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousSkins) {
                queryClient.setQueriesData({ queryKey: ['skins'] }, context.previousSkins);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['skins'] });
            queryClient.invalidateQueries({ queryKey: ['collection'] });
        },
    });

    const toggleWishlist = useMutation({
        mutationFn: async ({ id, wishlisted }: { id: number; wishlisted: boolean }) => {
            await db.runAsync('UPDATE skins SET is_wishlisted = ? WHERE id = ?', [wishlisted ? 1 : 0, id]);
        },
        onMutate: async ({ id, wishlisted }) => {
            await queryClient.cancelQueries({ queryKey: ['skins'] });
            const previousSkins = queryClient.getQueryData(['skins']);

            queryClient.setQueriesData({ queryKey: ['skins'] }, (oldData: any) => {
                if (!oldData) return oldData;
                return oldData.map((skin: any) =>
                    skin.id === id ? { ...skin, is_wishlisted: wishlisted ? 1 : 0 } : skin
                );
            });

            return { previousSkins };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousSkins) {
                queryClient.setQueriesData({ queryKey: ['skins'] }, context.previousSkins);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['skins'] });
            queryClient.invalidateQueries({ queryKey: ['collection'] });
        },
    });

    return { toggleOwned, toggleWishlist };
};
