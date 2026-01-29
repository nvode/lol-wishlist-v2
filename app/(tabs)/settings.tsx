import { cn } from '@/lib/utils';
import * as Updates from 'expo-updates';
import { Github, Info, RefreshCcw, User } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

export default function SettingsScreen() {
    const onCheckForUpdates = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                Alert.alert(
                    'Update Available',
                    'A new version of the app is available. Would you like to update now?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Update', onPress: () => Updates.fetchUpdateAsync().then(() => Updates.reloadAsync()) }
                    ]
                );
            } else {
                Alert.alert('Up to Date', 'You are running the latest version.');
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to check for updates.');
        }
    };

    const menuItems = [
        {
            label: 'Check for Updates',
            icon: RefreshCcw,
            onPress: onCheckForUpdates,
            description: 'Ensure you have the latest features and data.'
        },
        {
            label: 'About',
            icon: Info,
            onPress: () => Alert.alert('LoL Wishlist', 'A fan-made app for tracking League of Legends skins.'),
        },
    ];

    return (
        <ScrollView className="flex-1 bg-neutral-50">
            <View className="p-4 space-y-6">
                <View className="items-center py-8">
                    <View className="w-20 h-20 bg-black rounded-3xl items-center justify-center mb-4">
                        <User size={40} color="white" strokeWidth={1} />
                    </View>
                    <Text className="text-xl font-bold text-neutral-900">Skin Explorer</Text>
                    <Text className="text-sm text-neutral-500">v1.0.0</Text>
                </View>

                <View className="bg-white rounded-2xl overflow-hidden border border-neutral-200">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Pressable
                                key={item.label}
                                onPress={item.onPress}
                                className={cn(
                                    "flex-row items-center p-4 active:bg-neutral-50",
                                    index !== 0 && "border-t border-neutral-100"
                                )}
                            >
                                <View className="w-10 h-10 bg-neutral-100 rounded-xl items-center justify-center">
                                    <Icon size={20} color="#404040" strokeWidth={1.5} />
                                </View>
                                <View className="ml-4 flex-1">
                                    <Text className="text-sm font-bold text-neutral-900">{item.label}</Text>
                                    {item.description && (
                                        <Text className="text-[10px] text-neutral-500 mt-0.5">{item.description}</Text>
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                <View className="bg-white rounded-2xl p-4 border border-neutral-200">
                    <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Links</Text>
                    <Pressable className="flex-row items-center py-2">
                        <Github size={16} color="#737373" strokeWidth={1.5} />
                        <Text className="ml-3 text-sm text-neutral-600">Give Feedback</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}
