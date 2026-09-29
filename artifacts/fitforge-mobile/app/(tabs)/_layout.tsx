import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useColors } from '@/hooks/useColors';

export default function TabLayout() {
  const colors = useColors();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginBottom: Platform.OS === 'web' ? 4 : 0 },
        tabBarStyle: { position: 'absolute', height: Platform.OS === 'web' ? 84 : 76, paddingTop: 9, paddingBottom: Platform.OS === 'web' ? 27 : 10, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background },
        tabBarBackground: () => <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, React.ComponentProps<typeof Feather>['name']> = { home: 'home', workouts: 'grid', progress: 'trending-up', nutrition: 'pie-chart', profile: 'user' };
          return <Feather name={icons[route.name] ?? 'circle'} color={color} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="workouts" options={{ title: 'Workouts' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
