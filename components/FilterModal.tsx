import { useChampions } from '@/hooks/useChampions';
import { getAssetUrl } from '@/lib/assets';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { Check, ChevronRight, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    selectedRarity: string;
    onRarityChange: (rarity: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    onlyUnowned: boolean;
    onOnlyUnownedChange: (val: boolean) => void;
    onlyFavorited: boolean;
    onOnlyFavoritedChange: (val: boolean) => void;
    selectedChampionId: number | null;
    onSelectedChampionChange: (id: number | null) => void;
}

const RARITIES = ['All', 'kMythic', 'kUltimate', 'kLegendary', 'kEpic', 'kNoRarity'];
const RARITY_LABELS: Record<string, string> = {
    All: 'All Rarities',
    kMythic: 'Mythic',
    kUltimate: 'Ultimate',
    kLegendary: 'Legendary',
    kEpic: 'Epic',
    kNoRarity: 'Standard',
};

const SORT_OPTIONS = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'champion', label: 'Champion' },
    { value: 'id', label: 'Release Date' },
];

export default function FilterModal({
    visible,
    onClose,
    selectedRarity,
    onRarityChange,
    sortBy,
    onSortChange,
    onlyUnowned,
    onOnlyUnownedChange,
    onlyFavorited,
    onOnlyFavoritedChange,
    selectedChampionId,
    onSelectedChampionChange,
}: FilterModalProps) {
    const { data: champions } = useChampions();
    const [showChampionList, setShowChampionList] = useState(false);
    const [championSearch, setChampionSearch] = useState('');

    const filteredChampions = champions?.filter(c =>
        c.name.toLowerCase().includes(championSearch.toLowerCase())
    );

    const selectedChampion = champions?.find(c => c.id === selectedChampionId);

    const renderChampionItem = ({ item }: { item: any }) => (
        <Pressable
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onSelectedChampionChange(item.id);
                setShowChampionList(false);
            }}
            className={cn(
                "flex-row items-center p-3 border-b border-border",
                selectedChampionId === item.id ? "bg-muted" : "bg-card"
            )}
        >
            <Image
                source={{ uri: getAssetUrl(item.squarePortraitPath) || '' }}
                className="w-10 h-10 rounded-full bg-muted"
            />
            <Text className="ml-3 font-semibold text-foreground flex-1">{item.name}</Text>
            {selectedChampionId === item.id && <Check size={20} color="#18181b" />}
        </Pressable>
    );

    if (showChampionList) {
        return (
            <Modal visible={visible} animationType="slide" transparent>
                <View className="flex-1 bg-background pt-12">
                    <View className="flex-row items-center px-4 pb-4 border-b border-border">
                        <Pressable
                            onPress={() => setShowChampionList(false)}
                            className="p-2 -ml-2"
                        >
                            <X size={24} color="#18181b" />
                        </Pressable>
                        <Text className="text-xl font-bold ml-2 flex-1">Select Champion</Text>
                    </View>

                    <View className="p-4 border-b border-border">
                        <View className="flex-row items-center bg-muted px-3 py-2 rounded-lg">
                            <Search size={18} color="#71717a" />
                            <TextInput
                                placeholder="Search..."
                                value={championSearch}
                                onChangeText={setChampionSearch}
                                className="flex-1 ml-2 text-foreground"
                                placeholderTextColor="#71717a"
                            />
                        </View>
                    </View>

                    <Pressable
                        onPress={() => {
                            onSelectedChampionChange(null);
                            setShowChampionList(false);
                        }}
                        className="p-4 border-b border-border flex-row items-center justify-between"
                    >
                        <Text className="font-semibold text-muted-foreground">All Champions</Text>
                        {!selectedChampionId && <Check size={20} color="#18181b" />}
                    </Pressable>

                    <FlatList
                        data={filteredChampions}
                        renderItem={renderChampionItem}
                        keyExtractor={item => item.id.toString()}
                        className="flex-1"
                    />
                </View>
            </Modal>
        );
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50">
                <Pressable className="flex-1" onPress={onClose} />
                <View className="bg-background rounded-t-2xl max-h-[90%]">
                    {/* Header */}
                    <View className="flex-row items-center justify-between p-6 border-b border-border">
                        <Text className="text-xl font-bold text-foreground">Filters</Text>
                        <Pressable
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                onClose();
                            }}
                            className="w-8 h-8 items-center justify-center rounded-lg bg-muted"
                        >
                            <X size={18} color="#71717a" strokeWidth={2} />
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
                        {/* Champion Filter */}
                        <View className="mb-8">
                            <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                                Champion
                            </Text>
                            <Pressable
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    setShowChampionList(true);
                                }}
                                className="flex-row items-center justify-between bg-card p-4 rounded-lg border border-border"
                            >
                                <View className="flex-row items-center">
                                    {selectedChampion ? (
                                        <>
                                            <Image
                                                source={{ uri: getAssetUrl(selectedChampion.squarePortraitPath) || '' }}
                                                className="w-8 h-8 rounded-full bg-muted mr-3"
                                            />
                                            <Text className="font-semibold text-foreground">{selectedChampion.name}</Text>
                                        </>
                                    ) : (
                                        <Text className="text-muted-foreground font-medium">All Champions</Text>
                                    )}
                                </View>
                                <ChevronRight size={20} color="#71717a" />
                            </Pressable>
                        </View>

                        {/* Toggles */}
                        <View className="mb-8 gap-4">
                            <View className="flex-row items-center justify-between bg-card p-4 rounded-lg border border-border">
                                <Text className="font-semibold text-foreground">Show Unowned Only</Text>
                                <Switch
                                    value={onlyUnowned}
                                    onValueChange={onOnlyUnownedChange}
                                    trackColor={{ false: '#e4e4e7', true: '#18181b' }}
                                />
                            </View>
                            <View className="flex-row items-center justify-between bg-card p-4 rounded-lg border border-border">
                                <Text className="font-semibold text-foreground">Favorited Champions Only</Text>
                                <Switch
                                    value={onlyFavorited}
                                    onValueChange={onOnlyFavoritedChange}
                                    trackColor={{ false: '#e4e4e7', true: '#18181b' }}
                                />
                            </View>
                        </View>

                        {/* Rarity Filter */}
                        <View className="mb-8">
                            <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                                Rarity
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {RARITIES.map((rarity) => (
                                    <Pressable
                                        key={rarity}
                                        onPress={() => {
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                            onRarityChange(rarity);
                                        }}
                                        className={cn(
                                            'px-4 py-3 rounded-lg border',
                                            selectedRarity === rarity
                                                ? 'bg-foreground border-foreground'
                                                : 'bg-card border-border'
                                        )}
                                    >
                                        <Text
                                            className={cn(
                                                'text-sm font-semibold',
                                                selectedRarity === rarity ? 'text-background' : 'text-foreground'
                                            )}
                                        >
                                            {RARITY_LABELS[rarity]}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Sort Options */}
                        <View className="mb-8">
                            <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                                Sort By
                            </Text>
                            <View className="gap-2">
                                {SORT_OPTIONS.map((option) => (
                                    <Pressable
                                        key={option.value}
                                        onPress={() => {
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                            onSortChange(option.value);
                                        }}
                                        className={cn(
                                            'p-4 rounded-lg border',
                                            sortBy === option.value
                                                ? 'bg-foreground border-foreground'
                                                : 'bg-card border-border'
                                        )}
                                    >
                                        <Text
                                            className={cn(
                                                'text-sm font-semibold',
                                                sortBy === option.value ? 'text-background' : 'text-foreground'
                                            )}
                                        >
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Apply Button */}
                        <Pressable
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                onClose();
                            }}
                            className="bg-foreground p-4 rounded-lg items-center"
                        >
                            <Text className="text-base font-bold text-background">Apply Filters</Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
