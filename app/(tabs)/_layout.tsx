import { Tabs } from 'expo-router';
import { Compass, Home, Settings } from 'lucide-react-native';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="collection"
      screenOptions={{
        tabBarActiveTintColor: '#18181b',
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#09090b' : '#fafafa',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          color: colorScheme === 'dark' ? '#fafafa' : '#09090b',
        },
      }}>
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ color }) => <Home color={color} size={24} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Compass color={color} size={24} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
