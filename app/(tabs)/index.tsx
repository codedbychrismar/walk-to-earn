import { Clock, PersonStanding, Play, Star } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

function MapMockup() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1e4d2b', overflow: 'hidden' }}>
      <View style={{ position: 'absolute', top: '46%', left: 0, right: 0, height: 14, backgroundColor: '#2e7d32', opacity: 0.9 }} />
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: '29%', width: 11, backgroundColor: '#2e7d32', opacity: 0.9 }} />
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: '72%', width: 9, backgroundColor: '#2e7d32', opacity: 0.8 }} />
      <View style={{ position: 'absolute', top: 38, left: 18, width: 92, height: 84, borderRadius: 8, backgroundColor: '#0f3d1e' }} />
      <View style={{ position: 'absolute', top: 20, left: 136, width: 110, height: 92, borderRadius: 8, backgroundColor: '#0a2e15' }} />
      <View style={{ position: 'absolute', top: 48, right: 18, width: 92, height: 82, borderRadius: 8, backgroundColor: '#0f3d1e' }} />
      <View style={{ position: 'absolute', bottom: 46, left: 28, width: 84, height: 100, borderRadius: 8, backgroundColor: '#0a2e15' }} />
      <View style={{ position: 'absolute', bottom: 34, left: '39%', width: 132, height: 120, borderRadius: 8, backgroundColor: '#0f3d1e' }} />
      <View style={{ position: 'absolute', bottom: 40, right: 18, width: 60, height: 90, borderRadius: 8, backgroundColor: '#0a2e15' }} />
      <View style={{
        position: 'absolute', top: '44%', left: '48%',
        width: 68, height: 68, borderRadius: 34,
        backgroundColor: 'rgba(76,175,110,0.14)',
        borderWidth: 1, borderColor: 'rgba(76,175,110,0.34)',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <View style={{
          width: 34, height: 34, borderRadius: 17,
          backgroundColor: 'rgba(76,175,110,0.22)',
          borderWidth: 2, borderColor: 'rgba(76,175,110,0.58)',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#4caf6e', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default function Walk() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Removed min-h-screen — causes unnecessary layout work on web */}
        <View style={{ paddingBottom: 100 }}>
          {/* Header */}
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

          {/* Map Area */}
          <View className="mx-4 rounded-[28px] h-[470px] overflow-hidden shadow-2xl" style={{ backgroundColor: colors.g700 }}>
            <MapMockup />

            <View className="absolute inset-0 justify-between p-4">
              <View className="flex-row gap-2 flex-wrap">
                <View
                  className="px-3.5 py-2 rounded-full flex-row items-center gap-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.16)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.26)' }}
                >
                  <View className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ade80' }} />
                  <Text className="text-[13px] font-bold text-white">3.2 km/h</Text>
                </View>

                <View
                  className="px-3.5 py-2 rounded-full flex-row items-center gap-1.5"
                  style={{ backgroundColor: 'rgba(245,158,11,0.24)', borderWidth: 1, borderColor: 'rgba(245,158,11,0.36)' }}
                >
                  <Star size={12} fill="#fbbf24" stroke="none" />
                  <Text className="text-xs font-extrabold" style={{ color: '#fbbf24' }}>Boost 4:21</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-end gap-3">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 min-w-[190px] rounded-full shadow-2xl px-5 py-4 flex-row items-center justify-center gap-2"
                  style={{ backgroundColor: colors.g500 }}
                >
                  <PersonStanding size={18} color="white" strokeWidth={2} />
                  <Text className="text-[17px] font-extrabold text-white tracking-wide">Start Walk</Text>
                </TouchableOpacity>

                <View
                  className="px-3 py-2 rounded-2xl flex-row items-center gap-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' }}
                >
                  <Clock size={14} color="white" strokeWidth={2} />
                  <Text className="text-xs font-extrabold text-white">12:34</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row gap-2.5 px-4 -mt-[74px] z-10">
            {[
              { label: 'Steps', value: '3,041', color: colors.g600 },
              { label: 'Earned', value: '12.4', color: colors.amber },
              { label: 'Shoe', value: 'Runner', color: colors.n800, small: true },
            ].map((stat) => (
              <View
                key={stat.label}
                className="flex-1 rounded-[20px] px-3 py-3.5 gap-1 border shadow-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.96)', borderColor: 'rgba(255,255,255,0.7)' }}
              >
                <Text className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: colors.n400 }}>
                  {stat.label}
                </Text>
                <Text
                  className="font-extrabold leading-none"
                  style={{ color: stat.color, fontSize: stat.small ? 18 : 22 }}
                >
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Boost Card */}
          <View className="mx-4 mt-3.5 mb-4 rounded-[20px] p-4 border" style={{ backgroundColor: 'white', borderColor: colors.n100 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              className="rounded-[18px] p-4 flex-row items-center gap-3 border-[1.5px]"
              style={{ backgroundColor: colors.g50, borderColor: colors.g200 }}
            >
              <View className="w-12 h-12 rounded-[14px] items-center justify-center" style={{ backgroundColor: colors.g100 }}>
                <Play size={20} fill={colors.g500} stroke={colors.g500} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-extrabold mb-0.5" style={{ color: colors.n800 }}>Get Boost</Text>
                <Text className="text-xs" style={{ color: colors.n600 }}>Watch and earn ×1.5</Text>
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