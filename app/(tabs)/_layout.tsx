import {Tabs} from "expo-router";
import React, {useEffect} from "react";
import {Platform} from "react-native";
import {useRouter, Redirect} from "expo-router";

import {HapticTab} from "@/components/HapticTab";
import {IconSymbol} from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useAuth} from "@/src/context/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {user, isLoading} = useAuth();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  // Show loading or redirect while checking auth state
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            elevation: 0,
            height: 85,
            borderTopWidth: 0,
          },
          default: {
            height: 65,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: Colors[colorScheme ?? "light"].tint,
            shadowOffset: {width: 0, height: -3},
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: Platform.OS === "ios" ? 0 : 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color}) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({color}) => (
            <IconSymbol size={26} name="text.bubble.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({color}) => (
            <IconSymbol size={26} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
