import { Redirect } from "expo-router";
import { View } from "react-native";

import { useAuth } from "@/src/features/auth/auth-state";

export default function Index() {
  const { isHydrating, user } = useAuth();

  if (isHydrating) {
    return <View style={{ flex: 1, backgroundColor: "#ffffff" }} />;
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/Login" />;
}
