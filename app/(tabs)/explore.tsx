import { useSkinMutations } from '@/hooks/useSkinMutations';
import { useSkins } from '@/hooks/useSkins';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { CheckCircle2, Filter, Heart, Search } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';

export default function ExploreScreen() {
    const [search, setSearch] = useState('');
    const { data: skins, isLoading } = useSkins(search);
    const { toggleOwned, toggleWishlist } = useSkinMutations();

    const renderSkin = ({ item }: { item: any }) => (
        <View className="flex-1 p-2 m-1 bg-white rounded-xl shadow-sm border border-neutral-100">
            <View className="relative">
                <Image
                    source={{ uri: getAssetUrl(item.tilePath) || '' }}
                    className="w-full aspect-[1/1] rounded-lg bg-neutral-100"
                    resizeMode="cover"
                />
                <View className="absolute top-1.5 right-1.5 flex-row gap-1.5">
                    <Pressable
                        onPress={() => toggleOwned.mutate({ id: item.id, owned: item.is_owned !== 1 })}
                        className={cn(
                            "p-1.5 rounded-full shadow-sm",
                            item.is_owned === 1 ? "bg-green-500" : "bg-white/90"
                        )}
                    >
                        <CheckCircle2 size={12} color={item.is_owned === 1 ? "white" : "#404040"} strokeWidth={2} />
                    </Pressable>
                    <Pressable
                        onPress={() => toggleWishlist.mutate({ id: item.id, wishlisted: item.is_wishlisted !== 1 })}
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
            <View className="py-4 space-y-4">
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

                <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-medium text-neutral-500">
                        {skins?.length || 0} skins found
                    </Text>
                    <Pressable className="flex-row items-center bg-neutral-100 px-3 py-1.5 rounded-lg">
                        <Filter size={14} color="#525252" strokeWidth={1.5} />
                        <Text className="ml-1.5 text-xs font-medium text-neutral-700">Filter</Text>
                    </Pressable>
                </View>
            </View>

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#000" />
                </View>
            ) : (
                <FlatList
                    data={skins}
                    renderItem={renderSkin}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-neutral-400">No skins found</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}
