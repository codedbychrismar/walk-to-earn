// components/Walk.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, PersonStanding, Play, Star } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const colors = {
  n800: '#1F2937',
  n600: '#4B5563',
  n400: '#9CA3AF',
  n100: '#F3F4F6',
  g700: '#047857',
  g600: '#059669',
  g500: '#10B981',
  g200: '#A7F3D0',
  g100: '#D1FAE5',
  g50: '#ECFDF5',
  amber: '#F59E0B',
  white: '#FFFFFF',
};

export default function Walk() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="min-h-screen">
          {/* Header */}
          <View className="px-5 pt-12 pb-4 flex-row justify-between items-center">
            <Text className="text-[26px] font-extrabold tracking-tight" style={{ color: colors.n800 }}>
              Walk
            </Text>
            <View
              className="px-3.5 py-1.5 rounded-full"
              style={{ backgroundColor: colors.g100 }}
            >
              <Text className="text-xs font-extrabold tracking-wide" style={{ color: colors.g700 }}>
                7 Day Streak
              </Text>
            </View>
          </View>

          {/* Map Area */}
          <View className="mx-4 rounded-[28px] h-[470px] overflow-hidden shadow-2xl" style={{ backgroundColor: colors.g700 }}>
            <Svg width="100%" height="100%" viewBox="0 0 388 470">
              <Rect width="388" height="470" fill="#1e4d2b" />
              <Rect x="0" y="0" width="388" height="470" fill="#155c2e" opacity="0.48" />
              <Rect x="18" y="38" width="92" height="84" rx="8" fill="#0f3d1e" opacity="0.76" />
              <Rect x="136" y="20" width="110" height="92" rx="8" fill="#0a2e15" opacity="0.62" />
              <Rect x="276" y="48" width="92" height="82" rx="8" fill="#0f3d1e" opacity="0.75" />
              <Rect x="28" y="324" width="84" height="100" rx="8" fill="#0a2e15" />
              <Rect x="154" y="286" width="132" height="120" rx="8" fill="#0f3d1e" opacity="0.82" />
              <Rect x="304" y="332" width="60" height="90" rx="8" fill="#0a2e15" opacity="0.72" />
              <Path d="M0 218 Q96 196 194 216 Q292 236 388 210" stroke="#2e7d32" strokeWidth="14" fill="none" />
              <Path d="M112 0 Q120 144 116 470" stroke="#2e7d32" strokeWidth="11" fill="none" />
              <Path d="M282 0 Q270 182 292 470" stroke="#2e7d32" strokeWidth="9" fill="none" opacity="0.8" />
              <Path d="M0 218 Q96 196 194 216 Q292 236 388 210" stroke="#4caf6e" strokeWidth="3" fill="none" strokeDasharray="9,7" opacity="0.56" />
              <Path d="M112 0 Q120 144 116 470" stroke="#4caf6e" strokeWidth="2" fill="none" strokeDasharray="8,6" opacity="0.44" />
              <Path d="M282 0 Q270 182 292 470" stroke="#4caf6e" strokeWidth="2" fill="none" strokeDasharray="8,6" opacity="0.34" />
              <Circle cx="194" cy="228" r="34" fill="rgba(76,175,110,0.14)" stroke="rgba(76,175,110,0.34)" strokeWidth="1" />
              <Circle cx="194" cy="228" r="17" fill="rgba(76,175,110,0.22)" stroke="rgba(76,175,110,0.58)" strokeWidth="2" />
              <Circle cx="194" cy="228" r="8" fill="#4caf6e" />
              <Circle cx="194" cy="228" r="4" fill="#fff" />
            </Svg>

            <View className="absolute inset-0 justify-between p-4">
              <View className="flex-row gap-2 flex-wrap">
                <View
                  className="px-3.5 py-2 rounded-full flex-row items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.16)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.26)',
                  }}
                >
                  <View className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ade80' }} />
                  <Text className="text-[13px] font-bold text-white">3.2 km/h</Text>
                </View>

                <View
                  className="px-3.5 py-2 rounded-full flex-row items-center gap-1.5"
                  style={{
                    backgroundColor: 'rgba(245,158,11,0.24)',
                    borderWidth: 1,
                    borderColor: 'rgba(245,158,11,0.36)',
                  }}
                >
                  <Star size={12} fill="#fbbf24" stroke="none" />
                  <Text className="text-xs font-extrabold" style={{ color: '#fbbf24' }}>
                    Boost 4:21
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-end gap-3">
                <TouchableOpacity activeOpacity={0.8} className="flex-1 min-w-[190px] rounded-full shadow-2xl">
                  <LinearGradient
                    colors={[colors.g500, colors.g600]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="px-5 py-4 rounded-full flex-row items-center justify-center gap-2"
                  >
                    <PersonStanding size={18} color="white" strokeWidth={2} />
                    <Text className="text-[17px] font-extrabold text-white tracking-wide">Start Walk</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View
                  className="px-3 py-2 rounded-2xl flex-row items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.14)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.16)',
                  }}
                >
                  <Clock size={14} color="white" strokeWidth={2} />
                  <Text className="text-xs font-extrabold text-white">12:34</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row gap-2.5 px-4 -mt-[74px] z-10">
            <View
              className="flex-1 rounded-[20px] px-3 py-3.5 gap-1 border shadow-lg"
              style={{
                backgroundColor: 'rgba(255,255,255,0.96)',
                borderColor: 'rgba(255,255,255,0.7)',
              }}
            >
              <Text className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: colors.n400 }}>
                Steps
              </Text>
              <Text className="text-[22px] font-extrabold leading-none" style={{ color: colors.g600 }}>
                3,041
              </Text>
            </View>

            <View
              className="flex-1 rounded-[20px] px-3 py-3.5 gap-1 border shadow-lg"
              style={{
                backgroundColor: 'rgba(255,255,255,0.96)',
                borderColor: 'rgba(255,255,255,0.7)',
              }}
            >
              <Text className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: colors.n400 }}>
                Earned
              </Text>
              <Text className="text-[22px] font-extrabold leading-none" style={{ color: colors.amber }}>
                12.4
              </Text>
            </View>

            <View
              className="flex-1 rounded-[20px] px-3 py-3.5 gap-1 border shadow-lg"
              style={{
                backgroundColor: 'rgba(255,255,255,0.96)',
                borderColor: 'rgba(255,255,255,0.7)',
              }}
            >
              <Text className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: colors.n400 }}>
                Shoe
              </Text>
              <Text className="text-[18px] font-extrabold leading-none" style={{ color: colors.n800 }}>
                Runner
              </Text>
            </View>
          </View>

          {/* Boost Card */}
          <View className="mx-4 mt-3.5 mb-4 rounded-[20px] p-4 border" style={{ backgroundColor: 'white', borderColor: colors.n100 }}>
            <TouchableOpacity activeOpacity={0.7} className="rounded-[18px] p-4 flex-row items-center gap-3 border-[1.5px]" style={{ backgroundColor: colors.g50, borderColor: colors.g200 }}>
              <View className="w-12 h-12 rounded-[14px] items-center justify-center" style={{ backgroundColor: colors.g100 }}>
                <Play size={20} fill={colors.g500} stroke={colors.g500} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-extrabold mb-0.5" style={{ color: colors.n800 }}>
                  Get Boost
                </Text>
                <Text className="text-xs" style={{ color: colors.n600 }}>
                  Watch and earn ×1.5
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