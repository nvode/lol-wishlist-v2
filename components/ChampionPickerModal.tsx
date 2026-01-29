import { useChampionMutations } from '@/hooks/useChampionMutations';
import { useChampions } from '@/hooks/useChampions';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { Check, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Pressable, Text, TextInput, View } from 'react-native';

interface ChampionPickerModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function ChampionPickerModal({ visible, onClose }: ChampionPickerModalProps) {
    const { data: champions, isLoading } = useChampions();
    const { toggleFavorite } = useChampionMutations();
    const [search, setSearch] = useState('');

    const filteredChampions = champions?.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleToggle = (id: number, isFavorited: boolean) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleFavorite.mutate({ id, favorited: isFavorited });
    };

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = item.is_favorited === 1;
        return (
            <Pressable
                onPress={() => handleToggle(item.id, !isSelected)}
                className={cn(
                    "flex-row items-center p-3 border-b border-border",
                    isSelected ? "bg-muted/50" : "bg-card"
                )}
            >
                <Image
                    source={{ uri: getAssetUrl(item.squarePortraitPath) || '' }}
                    className="w-10 h-10 rounded-full bg-muted"
                />
                <Text className="ml-3 font-semibold text-foreground flex-1">{item.name}</Text>
                {isSelected && (
                    <View className="bg-foreground rounded-full p-1">
                        <Check size={12} color="#fafafa" strokeWidth={3} />
                    </View>
                )}
            </Pressable>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-background">
                <View className="flex-row items-center justify-between p-4 border-b border-border">
                    <Text className="text-xl font-bold text-foreground">Manage Favorites</Text>
                    <Pressable
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            onClose();
                        }}
                        className="p-2 rounded-lg bg-muted"
                    >
                        <X size={18} color="#71717a" />
                    </Pressable>
                </View>

                <View className="p-4 border-b border-border">
                    <View className="flex-row items-center bg-muted px-3 py-2.5 rounded-lg">
                        <Search size={18} color="#71717a" />
                        <TextInput
                            placeholder="Search champions..."
                            value={search}
                            onChangeText={setSearch}
                            className="flex-1 ml-2 text-foreground font-medium"
                            placeholderTextColor="#71717a"
                        />
                        {search.length > 0 && (
                            <Pressable onPress={() => setSearch('')} className="bg-white/20 rounded-full p-1">
                                <Text className="text-[10px] text-muted-foreground font-bold">✕</Text>
                            </Pressable>
                        )}
                    </View>
                </View>

                {isLoading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator color="#18181b" />
                    </View>
                ) : (
                    <FlatList
                        data={filteredChampions}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        className="flex-1"
                        contentContainerStyle={{ paddingBottom: 40 }}
                    />
                )}
            </View>
        </Modal>
    );
}
