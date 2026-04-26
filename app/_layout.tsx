import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider } from "@/src/features/auth/auth-state";
import { ShoeProvider } from "@/src/features/shoes/shoe-state";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <ShoeProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ShoeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
