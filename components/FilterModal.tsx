import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { X } from 'lucide-react-native';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    selectedRarity: string;
    onRarityChange: (rarity: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

const RARITIES = ['all', 'kMythic', 'kUltimate', 'kLegendary', 'kEpic', 'kNoRarity'];
const RARITY_LABELS: Record<string, string> = {
    all: 'All Rarities',
    kMythic: 'Mythic',
    kUltimate: 'Ultimate',
    kLegendary: 'Legendary',
    kEpic: 'Epic',
    kNoRarity: 'Standard',
};

const SORT_OPTIONS = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'id', label: 'Release Date' },
];

export default function FilterModal({
    visible,
    onClose,
    selectedRarity,
    onRarityChange,
    sortBy,
    onSortChange,
}: FilterModalProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50">
                <Pressable className="flex-1" onPress={onClose} />
                <View className="bg-background rounded-t-2xl p-6 pb-10">
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6">
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

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Rarity Filter */}
                        <View className="mb-6">
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
                        <View className="mb-6">
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
