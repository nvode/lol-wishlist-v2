import { db } from '@/lib/db';
import { useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import * as Updates from 'expo-updates';
import { Database, Github, Heart, Info, RefreshCcw, ShieldCheck } from 'lucide-react-native';
import { Alert, Linking, Pressable, ScrollView, Text, View } from 'react-native';

export default function SettingsScreen() {
    const queryClient = useQueryClient();
    const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

    const onCheckForUpdates = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                Alert.alert(
                    'Update Available',
                    'A new version is ready. Download and restart?',
                    [
                        { text: 'Not Now', style: 'cancel' },
                        {
                            text: 'Update',
                            onPress: async () => {
                                await Updates.fetchUpdateAsync();
                                await Updates.reloadAsync();
                            }
                        }
                    ]
                );
            } else {
                Alert.alert('Up to Date', 'You are running the latest version.');
            }
        } catch (e) {
            Alert.alert('Check Failed', 'Could not reach update server.');
        }
    };

    const resetDatabase = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        Alert.alert(
            'Reset Data',
            'This will clear all owned and wishlisted skins. This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset Everything',
                    style: 'destructive',
                    onPress: async () => {
                        await db.runAsync('UPDATE skins SET is_owned = 0, is_wishlisted = 0');
                        await db.runAsync('UPDATE champions SET is_favorited = 0');
                        queryClient.invalidateQueries();
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        Alert.alert('Reset Complete', 'Your collection has been cleared.');
                    }
                }
            ]
        );
    };

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <View className="mb-6">
            <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{title}</Text>
            <View className="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
                {children}
            </View>
        </View>
    );

    const Row = ({ label, icon: Icon, onPress, value, color = "#71717a", description }: any) => (
        <Pressable
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onPress?.();
            }}
            className="flex-row items-center p-4 active:bg-muted border-b border-border last:border-b-0"
        >
            <View className="w-10 h-10 rounded-lg items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon size={18} color={color} strokeWidth={1.5} />
            </View>
            <View className="ml-4 flex-1">
                <Text className="text-sm font-semibold text-foreground">{label}</Text>
                {description && <Text className="text-xs text-muted-foreground mt-0.5">{description}</Text>}
            </View>
            {value && <Text className="text-sm font-medium text-muted-foreground">{value}</Text>}
        </Pressable>
    );

    return (
        <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 16 }}>
            <View className="py-6">
                <Text className="text-2xl font-bold text-foreground">Settings</Text>
                <Text className="text-sm text-muted-foreground mt-1">Manage your application and data</Text>
            </View>

            <Section title="App Information">
                <Row
                    label="Check for Updates"
                    icon={RefreshCcw}
                    onPress={onCheckForUpdates}
                    description={isUpdateAvailable ? "New update ready" : "App is up to date"}
                    color="#0ea5e9"
                />
                <Row
                    label="Version"
                    icon={ShieldCheck}
                    value="1.0.0"
                    color="#10b981"
                />
            </Section>

            <Section title="Data Management">
                <Row
                    label="Reset App Data"
                    icon={Database}
                    onPress={resetDatabase}
                    color="#ef4444"
                    description="Clear collection & wishlist"
                />
            </Section>

            <Section title="About">
                <Row
                    label="CommunityDragon"
                    icon={Info}
                    onPress={() => Linking.openURL('https://communitydragon.org')}
                    description="Assets and data source"
                    color="#8b5cf6"
                />
                <Row
                    label="Give Feedback"
                    icon={Github}
                    onPress={() => Linking.openURL('https://github.com')}
                    color="#18181b"
                />
            </Section>

            <View className="items-center py-10 opacity-30">
                <Heart size={20} color="#18181b" fill="#18181b" />
                <Text className="text-xs font-semibold uppercase tracking-wide mt-2">Made for League Fans</Text>
            </View>
        </ScrollView>
    );
}
