import FilterModal from '@/components/FilterModal';
import { useSkinMutations } from '@/hooks/useSkinMutations';
import { useSkins } from '@/hooks/useSkins';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
// import { Image } from 'expo-image';
import { CheckCircle2, Heart, Search, SlidersHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, TextInput, View } from 'react-native';

const RARITIES = ['All', 'kNoRarity', 'kEpic', 'kLegendary', 'kMythic', 'kUltimate'];
const RARITY_LABELS: Record<string, string> = {
    kNoRarity: 'Standard',
    kEpic: 'Epic',
    kLegendary: 'Legendary',
    kMythic: 'Mythic',
    kUltimate: 'Ultimate',
    All: 'All'
};

const RARITY_COLORS: Record<string, string> = {
    kEpic: '#039BE5',
    kLegendary: '#D32F2F',
    kMythic: '#8E24AA',
    kUltimate: '#F57C00',
};

export default function ExploreScreen() {
    const [search, setSearch] = useState('');
    const [rarity, setRarity] = useState('All');
    const [sortBy, setSortBy] = useState<'name' | 'id' | 'champion'>('id');
    const [championId, setChampionId] = useState<number | null>(null);
    const [onlyFavorited, setOnlyFavorited] = useState(false);
    const [onlyUnowned, setOnlyUnowned] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const { data: skins, isLoading } = useSkins({
        search,
        rarity: rarity === 'All' ? '' : rarity,
        sortBy,
        championId,
        onlyFavorited,
        onlyUnowned
    });
    const { toggleOwned, toggleWishlist } = useSkinMutations();

    const handleToggleOwned = (id: number, isOwned: boolean) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleOwned.mutate({ id, owned: isOwned });
    };

    const handleToggleWishlist = (id: number, isWishlisted: boolean) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleWishlist.mutate({ id, wishlisted: isWishlisted });
    };

    const renderSkin = ({ item }: { item: any }) => {
        const imageUrl = getAssetUrl(item.tilePath);

        return (
            <View className="flex-1 p-2 m-1 bg-card rounded-lg border border-border">
                <View className="relative">
                    <Image
                        source={{ uri: imageUrl || 'https://via.placeholder.com/150' }}
                        className="w-full aspect-[1/1] rounded-lg bg-muted"
                        contentFit="cover"
                        transition={200}
                    />
                    {RARITY_COLORS[item.rarity] && (
                        <View
                            className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded shadow-sm"
                            style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
                        >
                            <Text className="text-[7px] text-white font-bold uppercase">
                                {RARITY_LABELS[item.rarity]}
                            </Text>
                        </View>
                    )}
                    <View className="absolute top-1.5 right-1.5 flex-row gap-1.5">
                        <Pressable
                            hitSlop={8}
                            onPress={() => handleToggleOwned(item.id, !item.is_owned)}
                            className={cn(
                                "p-2 rounded-full shadow-sm",
                                item.is_owned ? "bg-success" : "bg-card/90"
                            )}
                        >
                            <CheckCircle2 size={14} color={item.is_owned ? "white" : "#71717a"} strokeWidth={2} />
                        </Pressable>
                        <Pressable
                            hitSlop={8}
                            onPress={() => handleToggleWishlist(item.id, !item.is_wishlisted)}
                            className={cn(
                                "p-2 rounded-full shadow-sm",
                                item.is_wishlisted ? "bg-info" : "bg-card/90"
                            )}
                        >
                            <Heart size={14} color={item.is_wishlisted ? "white" : "#71717a"} strokeWidth={2} fill={item.is_wishlisted ? "white" : "transparent"} />
                        </Pressable>
                    </View>
                </View>
                <View className="mt-2">
                    <Text className="text-xs font-semibold text-foreground" numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                        {item.champion_name}
                    </Text>
                </View>
            </View>
        );
    };

    const activeFilterCount = [
        rarity !== 'All',
        championId !== null,
        onlyFavorited,
        onlyUnowned
    ].filter(Boolean).length;

    return (
        <View className="flex-1 bg-background px-4">
            <View className="py-6 space-y-3">
                <View className="flex-row items-center bg-card px-4 py-3 rounded-lg border border-border gap-3">
                    <Search size={18} color="#71717a" strokeWidth={1.5} />
                    <TextInput
                        placeholder="Search skins or champions..."
                        className="flex-1 text-foreground text-sm"
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="#71717a"
                    />
                    {search.length > 0 && (
                        <Pressable onPress={() => setSearch('')}>
                            <Text className="text-xs font-medium text-muted-foreground px-2">Clear</Text>
                        </Pressable>
                    )}
                    <Pressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setFilterModalVisible(true);
                        }}
                        className="p-2 rounded-lg bg-muted relative"
                    >
                        <SlidersHorizontal size={16} color={activeFilterCount > 0 ? "#18181b" : "#71717a"} strokeWidth={2} />
                        {activeFilterCount > 0 && (
                            <View className="absolute top-1 right-1 w-2 h-2 bg-foreground rounded-full border border-card" />
                        )}
                    </Pressable>
                </View>

                <View className="flex-row justify-between items-center bg-muted p-3 rounded-lg">
                    <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {skins?.length || 0} Results
                    </Text>
                    <Text className="text-xs font-semibold text-foreground">
                        {rarity === 'All' ? 'All Rarities' : RARITY_LABELS[rarity]}
                    </Text>
                </View>
            </View>

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#18181b" />
                </View>
            ) : (
                <FlashList
                    {...({
                        data: skins,
                        renderItem: renderSkin,
                        keyExtractor: (item: any) => item.id.toString(),
                        numColumns: 2,
                        estimatedItemSize: 200,
                        showsVerticalScrollIndicator: false,
                        contentContainerStyle: { paddingBottom: 20 },
                        ListEmptyComponent: (
                            <View className="flex-1 justify-center items-center py-20">
                                <Text className="text-muted-foreground font-medium">No skins found</Text>
                                <Text className="text-xs text-muted-foreground mt-2 text-center">
                                    Try adjusting your search or filters
                                </Text>
                            </View>
                        )
                    } as any)}
                />
            )}

            <FilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                selectedRarity={rarity}
                onRarityChange={setRarity}
                sortBy={sortBy}
                onSortChange={(sort) => setSortBy(sort as 'name' | 'id' | 'champion')}
                onlyUnowned={onlyUnowned}
                onOnlyUnownedChange={setOnlyUnowned}
                onlyFavorited={onlyFavorited}
                onOnlyFavoritedChange={setOnlyFavorited}
                selectedChampionId={championId}
                onSelectedChampionChange={setChampionId}
            />
        </View>
    );
}
