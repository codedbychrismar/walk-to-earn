import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

function SimpleIcon({ name, color, focused }: any) {
  // No animation, just render the icon (optionally change size when focused)
  return <Ionicons name={name} size={focused ? 26 : 24} color={color} />;
}

function CustomTabButton(props: any) {
  return (
    <Pressable
      {...props}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 15,
          right: 15,
          height: 70,
          borderRadius: 25,
          backgroundColor: '#ffffff',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 10,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
        tabBarButton: (props) => <CustomTabButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Walk',
          tabBarIcon: ({ color, focused }) => (
            <SimpleIcon name="walk" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="shoes"
        options={{
          title: 'Shoes',
          tabBarIcon: ({ color, focused }) => (
            <SimpleIcon name="footsteps" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="ranks"
        options={{
          title: 'Ranks',
          tabBarIcon: ({ color, focused }) => (
            <SimpleIcon name="trophy" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <SimpleIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}