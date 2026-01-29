import { useSkinMutations } from '@/hooks/useSkinMutations';
import { useSkins } from '@/hooks/useSkins';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { ArrowUpDown, CheckCircle2, Heart, Search } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

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
    const [sortBy, setSortBy] = useState<'name' | 'id'>('name');

    const { data: skins, isLoading } = useSkins(search, rarity, sortBy);
    const { toggleOwned, toggleWishlist } = useSkinMutations();

    const handleToggleOwned = (id: number, owned: boolean) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleOwned.mutate({ id, owned });
    };

    const handleToggleWishlist = (id: number, wishlisted: boolean) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleWishlist.mutate({ id, wishlisted });
    };

    const renderSkin = ({ item }: { item: any }) => (
        <View className="flex-1 p-2 m-1 bg-card rounded-lg border border-border">
            <View className="relative">
                <Image
                    source={{ uri: getAssetUrl(item.tilePath) || '' }}
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
                        onPress={() => handleToggleOwned(item.id, item.is_owned !== 1)}
                        className={cn(
                            "p-1.5 rounded-full shadow-sm",
                            item.is_owned === 1 ? "bg-success" : "bg-card/90"
                        )}
                    >
                        <CheckCircle2 size={12} color={item.is_owned === 1 ? "white" : "#71717a"} strokeWidth={2} />
                    </Pressable>
                    <Pressable
                        onPress={() => handleToggleWishlist(item.id, item.is_wishlisted !== 1)}
                        className={cn(
                            "p-1.5 rounded-full shadow-sm",
                            item.is_wishlisted === 1 ? "bg-info" : "bg-card/90"
                        )}
                    >
                        <Heart size={12} color={item.is_wishlisted === 1 ? "white" : "#71717a"} strokeWidth={2} fill={item.is_wishlisted === 1 ? "white" : "transparent"} />
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

    return (
        <View className="flex-1 bg-background px-4">
            <View className="py-6 space-y-3">
                <View className="flex-row items-center bg-card px-4 py-3 rounded-lg border border-border">
                    <Search size={18} color="#71717a" strokeWidth={1.5} />
                    <TextInput
                        placeholder="Search skins or champions..."
                        className="flex-1 ml-3 text-foreground text-sm"
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="#71717a"
                    />
                    {search.length > 0 && (
                        <Pressable onPress={() => setSearch('')}>
                            <Text className="text-xs font-medium text-muted-foreground px-2">Clear</Text>
                        </Pressable>
                    )}
                </View>

                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {RARITIES.map((r) => (
                            <Pressable
                                key={r}
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    setRarity(r);
                                }}
                                className={cn(
                                    "px-4 py-2 rounded-lg mr-2 border",
                                    rarity === r ? "bg-foreground border-foreground" : "bg-muted border-border"
                                )}
                            >
                                <Text className={cn(
                                    "text-xs font-semibold",
                                    rarity === r ? "text-background" : "text-muted-foreground"
                                )}>
                                    {RARITY_LABELS[r]}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                <View className="flex-row justify-between items-center bg-muted p-3 rounded-lg">
                    <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {skins?.length || 0} Results
                    </Text>
                    <Pressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setSortBy(s => s === 'name' ? 'id' : 'name');
                        }}
                        className="flex-row items-center bg-card border border-border px-3 py-2 rounded-lg"
                    >
                        <ArrowUpDown size={12} color="#71717a" strokeWidth={1.5} />
                        <Text className="ml-2 text-xs font-semibold text-foreground uppercase">
                            {sortBy === 'name' ? 'A-Z' : 'Newest'}
                        </Text>
                    </Pressable>
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
        </View>
    );
}
