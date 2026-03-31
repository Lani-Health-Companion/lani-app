import React from 'react';
import { TabBarIcon } from '@components/TabBarIcon';
import { EmergencyButton } from '@components/EmergencyButton';
import { Tabs } from 'expo-router';
import { THEME } from '@constants/theme';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarInactiveTintColor: THEME.colors.lightText,
        headerStyle: {
          backgroundColor: THEME.colors.primary,
        },
        headerTintColor: THEME.colors.warmWhite,
        headerTitleStyle: {
          ...THEME.fonts.heading,
          color: THEME.colors.warmWhite,
        },
        headerRight: () => (
          <View style={styles.headerRight}>
            <EmergencyButton />
          </View>
        ),
        tabBarStyle: {
          backgroundColor: THEME.colors.warmWhite,
          borderTopColor: THEME.colors.lightGray,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...THEME.fonts.small,
          marginTop: 8,
        },
        tabBarItemStyle: {
          minHeight: 80,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lani',
          headerTitle: 'Chat with Lani',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="message-text" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          headerTitle: 'Find Friends',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: 'Family',
          headerTitle: 'Family & Emergency',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: THEME.spacing.lg,
  },
});
