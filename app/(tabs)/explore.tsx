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
        <View className="flex-1 p-2 m-1 bg-white rounded-xl shadow-sm border border-neutral-100">
            <View className="relative">
                <Image
                    source={{ uri: getAssetUrl(item.tilePath) || '' }}
                    className="w-full aspect-[1/1] rounded-lg bg-neutral-100"
                    contentFit="cover"
                    transition={200}
                />
                {RARITY_COLORS[item.rarity] && (
                    <View
                        className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded shadow-sm"
                        style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
                    >
                        <Text className="text-[7px] text-white font-black uppercase">
                            {RARITY_LABELS[item.rarity]}
                        </Text>
                    </View>
                )}
                <View className="absolute top-1.5 right-1.5 flex-row gap-1.5">
                    <Pressable
                        onPress={() => handleToggleOwned(item.id, item.is_owned !== 1)}
                        className={cn(
                            "p-1.5 rounded-full shadow-sm",
                            item.is_owned === 1 ? "bg-green-500" : "bg-white/90"
                        )}
                    >
                        <CheckCircle2 size={12} color={item.is_owned === 1 ? "white" : "#404040"} strokeWidth={2} />
                    </Pressable>
                    <Pressable
                        onPress={() => handleToggleWishlist(item.id, item.is_wishlisted !== 1)}
                        className={cn(
                            "p-1.5 rounded-full shadow-sm",
                            item.is_wishlisted === 1 ? "bg-blue-500" : "bg-white/90"
                        )}
                    >
                        <Heart size={12} color={item.is_wishlisted === 1 ? "white" : "#404040"} strokeWidth={2} fill={item.is_wishlisted === 1 ? "white" : "transparent"} />
                    </Pressable>
                </View>
            </View>
            <View className="mt-2">
                <Text className="text-[11px] font-bold text-neutral-900" numberOfLines={1}>
                    {item.name}
                </Text>
                <Text className="text-[9px] text-neutral-500">
                    {item.champion_name}
                </Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-neutral-50 px-4">
            <View className="py-4 space-y-3">
                <View className="flex-row items-center bg-white px-3 py-2 rounded-full border border-neutral-200">
                    <Search size={18} color="#737373" strokeWidth={1.5} />
                    <TextInput
                        placeholder="Search skins or champions..."
                        className="flex-1 ml-2 text-neutral-900 text-sm"
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="#A3A3A3"
                    />
                    {search.length > 0 && (
                        <Pressable onPress={() => setSearch('')}>
                            <Text className="text-xs text-neutral-400 px-2">Clear</Text>
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
                                    "px-4 py-1.5 rounded-full mr-2 border",
                                    rarity === r ? "bg-black border-black" : "bg-white border-neutral-200"
                                )}
                            >
                                <Text className={cn(
                                    "text-[10px] font-bold",
                                    rarity === r ? "text-white" : "text-neutral-500"
                                )}>
                                    {RARITY_LABELS[r]}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                <View className="flex-row justify-between items-center bg-neutral-100/50 p-2 rounded-xl">
                    <Text className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest ml-1">
                        {skins?.length || 0} Results
                    </Text>
                    <Pressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setSortBy(s => s === 'name' ? 'id' : 'name');
                        }}
                        className="flex-row items-center bg-white border border-neutral-200 px-3 py-1.5 rounded-lg"
                    >
                        <ArrowUpDown size={12} color="#525252" strokeWidth={1.5} />
                        <Text className="ml-1.5 text-[10px] font-bold text-neutral-700 uppercase">
                            {sortBy === 'name' ? 'A-Z' : 'Newest'}
                        </Text>
                    </Pressable>
                </View>
            </View>

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#000" />
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
                                <Text className="text-neutral-400">No skins found</Text>
                            </View>
                        )
                    } as any)}
                />
            )}
        </View>
    );
}
