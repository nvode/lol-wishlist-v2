import { useCollection } from '@/hooks/useCollection';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { CheckCircle2, Heart, Star } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';

type TabType = 'owned' | 'wishlist' | 'favorites';

export default function CollectionScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('owned');
    const { data: items, isLoading } = useCollection(activeTab);

    const tabs: { type: TabType; label: string; icon: any }[] = [
        { type: 'owned', label: 'Owned', icon: CheckCircle2 },
        { type: 'wishlist', label: 'Wishlist', icon: Heart },
        { type: 'favorites', label: 'Champs', icon: Star },
    ];

    const renderItem = ({ item }: { item: any }) => (
        <View className="flex-1 p-2 m-1 bg-white rounded-xl shadow-sm border border-neutral-100">
            <Image
                source={{ uri: getAssetUrl(activeTab === 'favorites' ? item.squarePortraitPath : item.tilePath) || '' }}
                className="w-full aspect-square rounded-lg bg-neutral-100"
                resizeMode="cover"
            />
            <View className="mt-2">
                <Text className="text-xs font-bold text-neutral-900" numberOfLines={1}>
                    {item.name}
                </Text>
                {activeTab !== 'favorites' && (
                    <Text className="text-[10px] text-neutral-500">
                        {item.champion_name}
                    </Text>
                )}
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-neutral-50 px-4">
            <View className="flex-row py-4 space-x-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.type;
                    return (
                        <Pressable
                            key={tab.type}
                            onPress={() => setActiveTab(tab.type)}
                            className={cn(
                                "flex-1 flex-row items-center justify-center py-2.5 rounded-xl border",
                                isActive ? "bg-black border-black" : "bg-white border-neutral-200"
                            )}
                        >
                            <Icon size={14} color={isActive ? "white" : "#737373"} strokeWidth={1.5} />
                            <View className="w-1.5" />
                            <Text className={cn(
                                "text-xs font-bold",
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
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={activeTab === 'favorites' ? 3 : 2}
                    key={activeTab === 'favorites' ? 'fav-grid' : 'skin-grid'}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-neutral-400 font-medium">No items yet</Text>
                            <Text className="text-[10px] text-neutral-400 mt-1 text-center">
                                Explore skins and mark them to see them here!
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}
