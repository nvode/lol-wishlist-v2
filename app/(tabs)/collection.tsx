import { useChampionMutations } from '@/hooks/useChampionMutations';
import { useCollection } from '@/hooks/useCollection';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { CheckCircle2, Heart, Star } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type TabType = 'owned' | 'wishlist' | 'favorites';

export default function CollectionScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('owned');
    const { data, isLoading } = useCollection(activeTab);
    const { toggleFavorite } = useChampionMutations();

    const tabs: { type: TabType; label: string; icon: any }[] = [
        { type: 'owned', label: 'Owned', icon: CheckCircle2 },
        { type: 'wishlist', label: 'Wishlist', icon: Heart },
        { type: 'favorites', label: 'Champs', icon: Star },
    ];

    const stats = data?.stats || { owned: 0, total: 0 };
    const progress = stats.total > 0 ? (stats.owned / stats.total) * 100 : 0;

    const renderItem = ({ item }: { item: any }) => (
        <View className="flex-1 p-2 m-1 bg-white rounded-xl shadow-sm border border-neutral-100">
            <View className="relative">
                <Image
                    source={{ uri: getAssetUrl(activeTab === 'favorites' ? item.squarePortraitPath : item.tilePath) || '' }}
                    className="w-full aspect-square rounded-lg bg-neutral-100"
                    contentFit="cover"
                    transition={200}
                />
                {activeTab === 'favorites' && (
                    <Pressable
                        onPress={() => toggleFavorite.mutate({ id: item.id, favorited: false })}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/50 shadow-sm"
                    >
                        <Star size={10} color="white" fill="white" strokeWidth={1.5} />
                    </Pressable>
                )}
            </View>
            <View className="mt-2">
                <Text className="text-[11px] font-bold text-neutral-900" numberOfLines={1}>
                    {item.name}
                </Text>
                {activeTab !== 'favorites' && (
                    <Text className="text-[9px] text-neutral-500">
                        {item.champion_name}
                    </Text>
                )}
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-neutral-50 px-4">
            {/* Progress Header */}
            <View className="py-4 border-b border-neutral-100">
                <View className="flex-row justify-between items-end mb-2">
                    <View>
                        <Text className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Your Collection</Text>
                        <Text className="text-xl font-black text-neutral-900">{stats.owned} <Text className="text-neutral-300">/ {stats.total}</Text></Text>
                    </View>
                    <Text className="text-xs font-bold text-neutral-500">{progress.toFixed(1)}%</Text>
                </View>
                <View className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <View
                        className="h-full bg-black rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </View>
            </View>

            <View className="flex-row py-4 gap-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.type;
                    return (
                        <Pressable
                            key={tab.type}
                            onPress={() => setActiveTab(tab.type)}
                            className={cn(
                                "flex-1 flex-row items-center justify-center py-2.5 rounded-xl border",
                                isActive ? "bg-black border-black shadow-sm" : "bg-white border-neutral-200"
                            )}
                        >
                            <Icon size={14} color={isActive ? "white" : "#737373"} strokeWidth={1.5} />
                            <View className="w-1.5" />
                            <Text className={cn(
                                "text-[11px] font-bold",
                                isActive ? "text-white" : "text-neutral-500"
                            )}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#000" />
                </View>
            ) : (
                <FlashList
                    {...({
                        data: data?.data,
                        renderItem: renderItem,
                        keyExtractor: (item: any) => item.id.toString(),
                        numColumns: activeTab === 'favorites' ? 3 : 2,
                        key: activeTab === 'favorites' ? 'fav-grid' : 'skin-grid',
                        estimatedItemSize: 200,
                        showsVerticalScrollIndicator: false,
                        contentContainerStyle: { paddingBottom: 20 },
                        ListEmptyComponent: (
                            <View className="flex-1 justify-center items-center py-20">
                                <Text className="text-neutral-400 font-medium">No items yet</Text>
                                <Text className="text-[10px] text-neutral-400 mt-1 text-center">
                                    Explore skins and mark them to see them here!
                                </Text>
                            </View>
                        )
                    } as any)}
                />
            )}
        </View>
    );
}
