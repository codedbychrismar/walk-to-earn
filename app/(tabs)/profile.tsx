import { Redirect, useRouter } from "expo-router";
import { ArrowDown, ArrowUp, Flame, PersonStanding, Settings } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/features/auth/auth-state";

const colors = {
  n800: "#1F2937",
  n600: "#4B5563",
  n400: "#9CA3AF",
  n100: "#F3F4F6",
  g700: "#047857",
  g600: "#059669",
  g500: "#10B981",
  g200: "#A7F3D0",
  g100: "#D1FAE5",
  g50: "#ECFDF5",
  amber: "#F59E0B",
  red: "#EF4444",
};

export default function Profile() {
  const router = useRouter();
  const { logout, user } = useAuth();

  if (!user) return <Redirect href="/(auth)/Login" />;

  const displayPoints = user.pointsBalance / 1000;
  const displayCelo = displayPoints / 100;
  const totalStepsLabel =
    user.totalSteps >= 1000 ? `${(user.totalSteps / 1000).toFixed(1)}k` : String(user.totalSteps);
  const transactions = [
    {
      id: 1,
      type: "in",
      name: "Walking Reward",
      date: "Latest balance",
      amount: `+${displayPoints.toFixed(3)} pts`,
    },
  ];

  return (
    <SafeAreaView className=" bg-white" style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="min-h-screen pb-4">
          <View className="px-5 pt-12 pb-0 flex-row justify-between items-center">
            <Text className="text-[26px] font-extrabold tracking-tight" style={{ color: colors.n800 }}>
              Profile
            </Text>
            <TouchableOpacity
              onPress={() => {
                logout();
                router.replace("/(auth)/Login");
              }}
              className="w-[38px] h-[38px] rounded-full bg-white border items-center justify-center shadow-sm"
              style={{ borderColor: colors.n100 }}
            >
              <Settings size={16} strokeWidth={2} color={colors.n600} />
            </TouchableOpacity>
          </View>

          <View
            className="mx-4 mt-4 rounded-3xl p-5 flex-row items-center gap-3.5 shadow-2xl"
            style={{ backgroundColor: colors.g500 }}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center border-2"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderColor: "rgba(255,255,255,0.36)",
              }}
            >
              <Text className="text-[22px] font-extrabold text-white">{user.initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[22px] font-extrabold text-white mb-1">{user.displayName}</Text>
              <Text className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.86)" }}>
                {user.email}
              </Text>
              <View
                className="flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full self-start"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Flame size={12} fill="#fbbf24" stroke="none" />
                <Text className="text-[11px] font-extrabold text-white">
                  {user.currentStreakDays} Day Streak
                </Text>
              </View>
            </View>
          </View>

          <View
            className="mx-4 mt-3.5 rounded-3xl p-[18px] border-[1.5px] shadow-xl"
            style={{ backgroundColor: "#ffffff", borderColor: colors.g200 }}
          >
            <View className="flex-row justify-between items-start gap-2.5 mb-4">
              <View>
                <Text className="text-xs font-extrabold uppercase tracking-wide mb-1" style={{ color: colors.n400 }}>
                  Ready to Withdraw
                </Text>
                <Text className="text-[34px] font-extrabold leading-none" style={{ color: colors.g600 }}>
                  {displayPoints.toFixed(3)} pts
                </Text>
                <Text className="text-sm font-bold mt-1.5" style={{ color: colors.n600 }}>
                  ~= {displayCelo.toFixed(2)} CELO
                </Text>
              </View>
              <View className="px-3 py-2 rounded-full flex-row items-center gap-1.5" style={{ backgroundColor: colors.g100 }}>
                <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.g500 }} />
                <Text className="text-xs font-extrabold" style={{ color: colors.g700 }}>MiniPay</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="w-full px-4 py-4 rounded-2xl flex-row items-center justify-center gap-2"
              style={{ backgroundColor: colors.g500 }}
            >
              <ArrowDown size={16} strokeWidth={2} color="white" />
              <Text className="text-[15px] font-extrabold text-white">Withdraw to MiniPay</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-2.5 px-4 pt-3.5 pb-3.5">
            {[
              { value: totalStepsLabel, label: "Steps", color: colors.g500 },
              { value: displayPoints.toFixed(3), label: "Points", color: colors.amber },
              { value: user.currentRankNumber ? `#${user.currentRankNumber}` : "--", label: "Rank", color: colors.n800 },
            ].map((stat) => (
              <View
                key={stat.label}
                className="flex-1 bg-white border rounded-[18px] px-2.5 py-3.5 items-center shadow-sm"
                style={{ borderColor: colors.n100 }}
              >
                <Text
                  className="text-[22px] font-extrabold"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </Text>
                <Text className="text-[10px] font-extrabold uppercase tracking-wide mt-1" style={{ color: colors.n400 }}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          <View className="px-4 mb-2">
            <View className="flex-row justify-between items-center mb-2.5">
              <Text className="text-xs font-extrabold uppercase tracking-wide" style={{ color: colors.n600 }}>
                Recent Activity
              </Text>
              <TouchableOpacity>
                <Text className="text-xs font-extrabold" style={{ color: colors.g500 }}>See all</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-2">
              {transactions.map((tx) => (
                <View
                  key={tx.id}
                  className="bg-white border rounded-2xl px-3.5 py-3 flex-row items-center gap-2.5 shadow-sm"
                  style={{ borderColor: colors.n100 }}
                >
                  <View
                    className="w-[38px] h-[38px] rounded-xl items-center justify-center"
                    style={{ backgroundColor: tx.type === "out" ? "#fef2f2" : colors.g50 }}
                  >
                    {tx.type === "out" ? (
                      <ArrowUp size={16} strokeWidth={2} color={colors.red} />
                    ) : (
                      <PersonStanding size={16} strokeWidth={2} color={colors.g500} />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold" style={{ color: colors.n800 }}>{tx.name}</Text>
                    <Text className="text-[11px] font-semibold mt-0.5" style={{ color: colors.n400 }}>{tx.date}</Text>
                  </View>
                  <Text className="text-sm font-extrabold" style={{ color: tx.type === "out" ? colors.red : colors.g500 }}>
                    {tx.amount}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
