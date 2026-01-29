import ChampionPickerModal from '@/components/ChampionPickerModal';
import { useChampionMutations } from '@/hooks/useChampionMutations';
import { useCollection } from '@/hooks/useCollection';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { CheckCircle2, Heart, Plus, Star } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

type TabType = 'owned' | 'wishlist' | 'favorites';

export default function CollectionScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('owned');
    const [pickerVisible, setPickerVisible] = useState(false);
    const { data, isLoading } = useCollection(activeTab);
    const { toggleFavorite } = useChampionMutations();

    const handleTabChange = (type: TabType) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setActiveTab(type);
    };

    const handleToggleFavorite = (id: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleFavorite.mutate({ id, favorited: false });
    };

    const tabs: { type: TabType; label: string; icon: any }[] = [
        { type: 'owned', label: 'Owned', icon: CheckCircle2 },
        { type: 'wishlist', label: 'Wishlist', icon: Heart },
        { type: 'favorites', label: 'Champs', icon: Star },
    ];

    const stats = data?.stats || { owned: 0, total: 0 };
    const progress = stats.total > 0 ? (stats.owned / stats.total) * 100 : 0;

    const renderItem = ({ item }: { item: any }) => (
        <View className="flex-1 p-2 m-1 bg-card rounded-lg border border-border">
            <View className="relative">
                <Image
                    source={{ uri: getAssetUrl(activeTab === 'favorites' ? item.squarePortraitPath : item.tilePath) || '' }}
                    className="w-full aspect-square rounded-lg bg-muted"
                    resizeMode="cover"
                />
                {activeTab === 'favorites' && (
                    <Pressable
                        onPress={() => handleToggleFavorite(item.id)}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-foreground/50 shadow-sm"
                    >
                        <Star size={10} color="white" fill="white" strokeWidth={1.5} />
                    </Pressable>
                )}
            </View>
            <View className="mt-2">
                <Text className="text-xs font-semibold text-foreground" numberOfLines={1}>
                    {item.name}
                </Text>
                {activeTab !== 'favorites' && (
                    <Text className="text-xs text-muted-foreground">
                        {item.champion_name}
                    </Text>
                )}
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-background px-4">
            {/* Progress Header */}
            <View className="py-6 border-b border-border">
                <View className="flex-row justify-between items-end mb-3">
                    <View>
                        <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your Collection</Text>
                        <Text className="text-2xl font-bold text-foreground">{stats.owned} <Text className="text-muted-foreground">/ {stats.total}</Text></Text>
                    </View>
                    <Text className="text-sm font-semibold text-muted-foreground">{progress.toFixed(1)}%</Text>
                </View>
                <View className="w-full h-2 bg-muted rounded-lg overflow-hidden">
                    <View
                        className="h-full bg-foreground rounded-lg"
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
                            onPress={() => handleTabChange(tab.type)}
                            className={cn(
                                "flex-1 flex-row items-center justify-center py-3 rounded-lg border",
                                isActive ? "bg-foreground border-foreground shadow-sm" : "bg-muted border-border"
                            )}
                        >
                            <Icon size={14} color={isActive ? "#fafafa" : "#71717a"} strokeWidth={1.5} />
                            <View className="w-2" />
                            <Text className={cn(
                                "text-xs font-semibold",
                                isActive ? "text-background" : "text-muted-foreground"
                            )}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            {activeTab === 'favorites' && (
                <Pressable
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setPickerVisible(true);
                    }}
                    className="flex-row items-center justify-center bg-card border border-dashed border-border p-3 rounded-lg mb-4 active:bg-muted"
                >
                    <Plus size={18} color="#71717a" />
                    <Text className="ml-2 font-semibold text-muted-foreground">Manage Favorite Champions</Text>
                </Pressable>
            )}

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#18181b" />
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
                                <Text className="text-muted-foreground font-medium">No items yet</Text>
                                <Text className="text-xs text-muted-foreground mt-2 text-center">
                                    Explore and add items to see them here!
                                </Text>
                            </View>
                        )
                    } as any)}
                />
            )}

            <ChampionPickerModal
                visible={pickerVisible}
                onClose={() => setPickerVisible(false)}
            />
        </View>
    );
}
