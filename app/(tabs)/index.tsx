import { Play, Star } from "lucide-react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/features/auth/auth-state";
import { WalkMap } from "@/src/features/walk-session/components";
import {
  classifySpeed,
  haversineKm,
  type MovementValidity,
} from "@/src/features/walk-session/constants/movement";
import {
  useDeviceLocation,
  type DevicePosition,
} from "@/src/features/walk-session/hooks";
import { colors } from "@/src/shared/constants/colors";

const STEPS_PER_KM = 1312;

function validityColor(validity: MovementValidity): string {
  switch (validity) {
    case "valid":
      return "#4ade80";
    case "invalid_fast":
      return colors.red500;
    case "still":
    default:
      return colors.n400;
  }
}

function validityLabel(validity: MovementValidity, speedKmh: number): string {
  if (validity === "invalid_fast") return `${speedKmh.toFixed(1)} km/h - too fast`;
  if (validity === "still") return `${speedKmh.toFixed(1)} km/h - still`;
  return `${speedKmh.toFixed(1)} km/h`;
}

export default function Walk() {
  const { permission, position, error, requestPermission, startTracking, stopTracking } =
    useDeviceLocation();
  const { settleWalk, user } = useAuth();

  const [sessionActive, setSessionActive] = useState(false);
  const [path, setPath] = useState<DevicePosition[]>([]);
  const syncedStepsRef = useRef(0);
  const syncingRef = useRef(false);

  useEffect(() => {
    if (permission === "idle") {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    let cancelled = false;

    async function startSession() {
      if (
        sessionActive ||
        permission === "idle" ||
        permission === "requesting" ||
        permission === "denied" ||
        permission === "unsupported"
      ) {
        return;
      }

      if (permission !== "granted") {
        const granted = await requestPermission();
        if (!granted || cancelled) return;
      }

      setPath([]);
      await startTracking();
      if (!cancelled) setSessionActive(true);
    }

    startSession();

    return () => {
      cancelled = true;
    };
  }, [permission, requestPermission, sessionActive, startTracking]);

  useEffect(() => {
    if (!sessionActive || !position) return;
    setPath((prev) => {
      const last = prev[prev.length - 1];
      if (last && Math.abs(last.timestamp - position.timestamp) < 250) return prev;
      return [...prev, position];
    });
  }, [position, sessionActive]);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  const distanceKm = useMemo(() => {
    let km = 0;
    for (let i = 1; i < path.length; i++) km += haversineKm(path[i - 1], path[i]);
    return km;
  }, [path]);

  const speedKmh = position?.speedKmh ?? 0;
  const validity = classifySpeed(speedKmh);
  const estimatedSteps = Math.round(distanceKm * STEPS_PER_KM);
  const shoeMultiplier = user?.equippedShoe?.pointsMultiplier ?? 1;
  const shoeName = user?.equippedShoe?.displayName ?? "Street Basic";
  const backendPointsValue = ((user?.pointsBalance ?? 0) / 1000).toFixed(3);
  const speedBadgeColor = validityColor(validity);

  useEffect(() => {
    syncedStepsRef.current = 0;
  }, [user?.userId]);

  useEffect(() => {
    async function syncSteps() {
      if (!user || validity !== "valid" || syncingRef.current) return;
      const deltaSteps = estimatedSteps - syncedStepsRef.current;
      if (deltaSteps <= 0) return;

      syncingRef.current = true;
      try {
        await settleWalk({
          steps: deltaSteps,
          distanceKm: distanceKm * (deltaSteps / Math.max(estimatedSteps, 1)),
          avgSpeedKmh: speedKmh,
        });
        syncedStepsRef.current = estimatedSteps;
      } finally {
        syncingRef.current = false;
      }
    }

    syncSteps();
  }, [distanceKm, estimatedSteps, settleWalk, speedKmh, user, validity]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 100 }}>
          <View className="px-5 pt-12 pb-4 flex-row justify-between items-center">
            <Text className="text-[26px] font-extrabold tracking-tight" style={{ color: colors.n800 }}>
              Walk
            </Text>
            <View className="px-3.5 py-1.5 rounded-full" style={{ backgroundColor: colors.g100 }}>
              <Text className="text-xs font-extrabold tracking-wide" style={{ color: colors.g700 }}>
                7 Day Streak
              </Text>
            </View>
          </View>

          <View
            className="mx-4 rounded-[28px] h-[540px] overflow-hidden shadow-2xl"
            style={{ backgroundColor: colors.g700 }}
          >
            <WalkMap position={position} path={path} followUser={sessionActive} />

            <View style={{ pointerEvents: "box-none" }} className="absolute inset-0 p-4">
              <View className="flex-row gap-2 flex-wrap">
                <View
                  className="px-3.5 py-2 rounded-full flex-row items-center gap-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.88)",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.6)",
                  }}
                >
                  <View className="w-2 h-2 rounded-full" style={{ backgroundColor: speedBadgeColor }} />
                  <Text className="text-[13px] font-bold" style={{ color: colors.n800 }}>
                    {validityLabel(validity, speedKmh)}
                  </Text>
                </View>

                <View
                  className="px-3.5 py-2 rounded-full flex-row items-center gap-1.5"
                  style={{
                    backgroundColor: "rgba(245,158,11,0.95)",
                    borderWidth: 1,
                    borderColor: "rgba(245,158,11,1)",
                  }}
                >
                  <Star size={12} fill="#fff" stroke="none" />
                  <Text className="text-xs font-extrabold text-white">x{shoeMultiplier} Active</Text>
                </View>
              </View>
            </View>
          </View>

          {(permission === "denied" || permission === "unsupported" || error) && (
            <View
              className="mx-4 mt-3 rounded-2xl p-3.5 border"
              style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}
            >
              <Text className="text-xs font-extrabold mb-0.5" style={{ color: colors.red500 }}>
                Location {permission === "unsupported" ? "unavailable" : "blocked"}
              </Text>
              <Text className="text-xs" style={{ color: colors.n600 }}>
                {error ?? "Enable location permission to track valid walking or jogging movement."}
              </Text>
            </View>
          )}

          <View className="flex-row gap-2.5 px-4 -mt-[74px] z-10">
            {[
              {
                label: "Steps",
                value: estimatedSteps.toLocaleString(),
                color: colors.g600,
              },
              {
                label: "Value",
                value: backendPointsValue,
                color: colors.amber,
              },
              {
                label: "Shoe",
                value: shoeName,
                color: colors.n800,
                small: true,
              },
            ].map((stat) => (
              <View
                key={stat.label}
                className="flex-1 rounded-[20px] px-3 py-3.5 gap-1 border shadow-lg"
                style={{
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderColor: "rgba(255,255,255,0.7)",
                }}
              >
                <Text
                  className="text-[10px] font-extrabold uppercase tracking-wider"
                  style={{ color: colors.n400 }}
                >
                  {stat.label}
                </Text>
                <Text
                  className="font-extrabold leading-none"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ color: stat.color, fontSize: stat.small ? 18 : 22 }}
                >
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>

          <View
            className="mx-4 mt-3.5 mb-4 rounded-[20px] p-4 border"
            style={{ backgroundColor: "white", borderColor: colors.n100 }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="rounded-[18px] p-4 flex-row items-center gap-3 border-[1.5px]"
              style={{ backgroundColor: colors.g50, borderColor: colors.g200 }}
            >
              <View
                className="w-12 h-12 rounded-[14px] items-center justify-center"
                style={{ backgroundColor: colors.g100 }}
              >
                <Play size={20} fill={colors.g500} stroke={colors.g500} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-extrabold mb-0.5" style={{ color: colors.n800 }}>
                  Get Boost
                </Text>
                <Text className="text-xs" style={{ color: colors.n600 }}>
                  Watch and earn x1.5
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                className="px-3.5 py-2 rounded-full"
                style={{ backgroundColor: colors.g600 }}
              >
                <Text className="text-xs font-extrabold text-white">Watch</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
