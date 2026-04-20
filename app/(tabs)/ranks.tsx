import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
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
    g400: '#34D399',
    g300: '#6EE7B7',
    g200: '#A7F3D0',
    g100: '#D1FAE5',
    g50: '#ECFDF5',
    amber: '#F59E0B',
    white: '#FFFFFF',
};

export default function Ranks() {
    const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly');

    const podium = [
        {
            rank: 2,
            initials: 'MK',
            name: 'Maria K.',
            steps: '18,422',
            gradient: ['#64748b', '#94a3b8'] as const,
            avatarSize: 54,
            blockHeight: 44,
            blockWidth: 80,
            fontSize: 14,
        },
        {
            rank: 1,
            initials: 'JD',
            name: 'You · John D.',
            steps: '24,100',
            gradient: [colors.g500, colors.g600] as const,
            avatarSize: 70,
            blockHeight: 60,
            blockWidth: 100,
            fontSize: 20,
            isYou: true,
            crown: true,
        },
        {
            rank: 3,
            initials: 'AC',
            name: 'Alex C.',
            steps: '15,880',
            gradient: ['#c8864a', '#d4955a'] as const,
            avatarSize: 48,
            blockHeight: 34,
            blockWidth: 72,
            fontSize: 13,
        },
    ];

    const leaderboard = [
        {
            rank: 4,
            initials: 'SR',
            name: 'Sofia R.',
            badge: 'Volt Runner',
            steps: '12,540',
            detail: '12,540 steps · 4.2 km',
            gradient: ['#6366f1', '#8b5cf6'] as const,
        },
        {
            rank: 5,
            initials: 'TW',
            name: 'Tom W.',
            steps: '11,200',
            detail: '11,200 steps · 3.8 km',
            gradient: ['#f59e0b', '#ef4444'] as const,
        },
        {
            rank: 6,
            initials: 'LN',
            name: 'Lena N.',
            badge: 'Pro Elite',
            steps: '9,870',
            detail: '9,870 steps · 3.3 km',
            gradient: ['#14b8a6', '#06b6d4'] as const,
        },
        {
            rank: 7,
            initials: 'PL',
            name: 'Pat L.',
            steps: '8,300',
            detail: '8,300 steps · 2.8 km',
            gradient: ['#ec4899', '#f43f5e'] as const,
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="min-h-screen pb-4">
                    {/* Header */}
                    <View className="px-5 pt-12 pb-4 flex-row justify-between items-center">
                        <Text className="text-[26px] font-extrabold tracking-tight" style={{ color: colors.n800 }}>
                            Leaderboard
                        </Text>
                        <View
                            className="px-3.5 py-1.5 rounded-full"
                            style={{ backgroundColor: colors.g100 }}
                        >
                            <Text className="text-xs font-extrabold tracking-wide" style={{ color: colors.g700 }}>
                                This Week
                            </Text>
                        </View>
                    </View>

                    {/* Week Toggle */}
                    <View className="mx-4 mb-3 p-0.5 rounded-lg flex-row gap-0.5" style={{ backgroundColor: colors.n100 }}>
                        <TouchableOpacity
                            onPress={() => setActiveTab('weekly')}
                            className="flex-1 py-1.5 rounded-lg"
                            style={{
                                backgroundColor: activeTab === 'weekly' ? colors.white : 'transparent',
                            }}
                        >
                            <Text
                                className="text-xs font-bold text-center"
                                style={{
                                    color: activeTab === 'weekly' ? colors.g600 : colors.n600,
                                }}
                            >
                                Weekly
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('monthly')}
                            className="flex-1 py-1.5 rounded-lg"
                            style={{
                                backgroundColor: activeTab === 'monthly' ? colors.white : 'transparent',
                            }}
                        >
                            <Text
                                className="text-xs font-bold text-center"
                                style={{
                                    color: activeTab === 'monthly' ? colors.g600 : colors.n600,
                                }}
                            >
                                Monthly
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('all')}
                            className="flex-1 py-1.5 rounded-lg"
                            style={{
                                backgroundColor: activeTab === 'all' ? colors.white : 'transparent',
                            }}
                        >
                            <Text
                                className="text-xs font-bold text-center"
                                style={{
                                    color: activeTab === 'all' ? colors.g600 : colors.n600,
                                }}
                            >
                                All Time
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Podium */}
                    <View className="px-4 flex-row items-end justify-center gap-2 mb-3">
                        {podium.map((person) => (
                            <View
                                key={person.rank}
                                className="flex-col items-center"
                                style={{ flex: person.rank === 1 ? 1.2 : 1 }}
                            >
                                {/* Avatar */}
                                <View className="relative mb-1">
                                    {person.crown && (
                                        <View className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                                            <Text className="text-xl">👑</Text>
                                        </View>
                                    )}
                                    <LinearGradient
                                        colors={person.gradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            width: person.avatarSize,
                                            height: person.avatarSize,
                                            borderRadius: person.avatarSize / 2,
                                            borderWidth: 3,
                                            borderColor:
                                                person.rank === 1
                                                    ? colors.amber
                                                    : person.rank === 2
                                                        ? '#b0b8c0'
                                                        : '#c8864a',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text
                                            className="font-extrabold text-white"
                                            style={{ fontSize: person.fontSize }}
                                        >
                                            {person.initials}
                                        </Text>
                                    </LinearGradient>
                                </View>

                                {/* Name */}
                                <Text
                                    className={`text-center mb-0.5 ${person.isYou ? 'text-[13px] font-extrabold' : 'text-[11px] font-bold'}`}
                                    style={{ color: colors.n800 }}
                                >
                                    {person.name}
                                </Text>

                                {/* Steps */}
                                <Text
                                    className="text-[10px] text-center mb-1"
                                    style={{
                                        color: person.isYou ? colors.amber : colors.n400,
                                        fontWeight: person.isYou ? '700' : '400',
                                    }}
                                >
                                    {person.steps} steps
                                </Text>

                                {/* Block */}
                                <LinearGradient
                                    colors={
                                        person.rank === 1
                                            ? (['#fef3c7', '#fde68a'] as const)
                                            : person.rank === 2
                                                ? (['#f1f5f9', '#e2e8f0'] as const)
                                                : (['#fef3e2', '#fde8c0'] as const)
                                    }
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={{
                                        width: person.blockWidth,
                                        height: person.blockHeight,
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        className="font-extrabold"
                                        style={{
                                            fontSize: person.rank === 1 ? 22 : 18,
                                            color: person.rank === 1 ? colors.amber : colors.n600,
                                        }}
                                    >
                                        {person.rank}
                                    </Text>
                                </LinearGradient>
                            </View>
                        ))}
                    </View>

                    {/* Leaderboard List */}
                    <View className="px-4 gap-1.5">
                        {leaderboard.map((person) => (
                            <View
                                key={person.rank}
                                className="bg-white border rounded-[14px] px-3.5 py-2.5 flex-row items-center gap-2.5"
                                style={{ borderColor: colors.n100 }}
                            >
                                <Text className="w-6 text-center text-[13px] font-extrabold" style={{ color: colors.n400 }}>
                                    {person.rank}
                                </Text>
                                <LinearGradient
                                    colors={person.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 17,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text className="text-xs font-extrabold text-white">{person.initials}</Text>
                                </LinearGradient>
                                <View className="flex-1">
                                    <View className="flex-row items-center flex-wrap">
                                        <Text className="text-[13px] font-bold" style={{ color: colors.n800 }}>
                                            {person.name}
                                        </Text>
                                        {person.badge && (
                                            <View
                                                className="ml-1.5 px-1.5 py-0.5 rounded-full"
                                                style={{ backgroundColor: colors.g100 }}
                                            >
                                                <Text className="text-[9px] font-bold" style={{ color: colors.g600 }}>
                                                    {person.badge}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text className="text-[11px] font-semibold mt-0.5" style={{ color: colors.n400 }}>
                                        {person.detail}
                                    </Text>
                                </View>
                                <Text className="text-[13px] font-extrabold whitespace-nowrap" style={{ color: colors.g500 }}>
                                    {person.steps}
                                </Text>
                            </View>
                        ))}

                        {/* Your Position */}
                        <View
                            className="border rounded-[14px] px-3.5 py-2.5 flex-row items-center gap-2.5"
                            style={{ borderColor: colors.g300, backgroundColor: colors.g50 }}
                        >
                            <Text className="w-6 text-center text-[13px] font-extrabold" style={{ color: colors.g500 }}>
                                1
                            </Text>
                            <LinearGradient
                                colors={[colors.g400, colors.g600]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderRadius: 17,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text className="text-xs font-extrabold text-white">JD</Text>
                            </LinearGradient>
                            <View className="flex-1">
                                <View className="flex-row items-center">
                                    <Text className="text-[13px] font-bold" style={{ color: colors.g600 }}>
                                        You · John D.
                                    </Text>
                                    <View
                                        className="ml-1.5 px-1.5 py-0.5 rounded-full"
                                        style={{ backgroundColor: colors.g500 }}
                                    >
                                        <Text className="text-[9px] font-bold text-white">YOU</Text>
                                    </View>
                                </View>
                                <Text className="text-[11px] font-semibold mt-0.5" style={{ color: colors.n400 }}>
                                    24,100 steps · 8.0 km
                                </Text>
                            </View>
                            <Text className="text-[13px] font-extrabold whitespace-nowrap" style={{ color: colors.g500 }}>
                                24,100
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
