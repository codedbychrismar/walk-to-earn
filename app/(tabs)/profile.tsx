import { LinearGradient } from 'expo-linear-gradient';
import { ArrowDown, ArrowUp, Flame, PersonStanding, Settings } from 'lucide-react-native';
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
    red: '#EF4444',
    white: '#FFFFFF',
};

export default function Profile() {
    const transactions = [
        {
            id: 1,
            type: 'out',
            name: 'Withdrew to MiniPay',
            date: 'Apr 15, 2025',
            amount: '-50 pts',
        },
        {
            id: 2,
            type: 'in',
            name: 'Walking Reward',
            date: 'Apr 17, 2025',
            amount: '+12 pts',
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                <View className="min-h-screen pb-4">
                    {/* Header */}
                    <View className="px-5 pt-12 pb-0 flex-row justify-between items-center">
                        <Text className="text-[26px] font-extrabold tracking-tight" style={{ color: colors.n800 }}>
                            Profile
                        </Text>
                        <TouchableOpacity
                            className="w-[38px] h-[38px] rounded-full bg-white border items-center justify-center shadow-sm"
                            style={{ borderColor: colors.n100 }}
                            onPress={() => console.log('Settings pressed')}
                        >
                            <Settings size={16} strokeWidth={2} color={colors.n600} />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Hero */}
                    <LinearGradient
                        colors={[colors.g500, colors.g600]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        className="mx-4 mt-4 rounded-3xl p-5 flex-row items-center gap-3.5 shadow-2xl"
                    >
                        <View
                            className="w-16 h-16 rounded-full items-center justify-center border-2"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderColor: 'rgba(255, 255, 255, 0.36)',
                            }}
                        >
                            <Text className="text-[22px] font-extrabold text-white">JD</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-[22px] font-extrabold text-white mb-1">John Dela Cruz</Text>
                            <Text className="text-xs font-bold mb-2" style={{ color: 'rgba(255, 255, 255, 0.86)' }}>
                                MiniPay Connected
                            </Text>
                            <View
                                className="flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full self-start"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                            >
                                <Flame size={12} fill="#fbbf24" stroke="none" />
                                <Text className="text-[11px] font-extrabold text-white">7 Day Streak</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Wallet Card */}
                    <LinearGradient
                        colors={['#ffffff', '#f6fcf8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        className="mx-4 mt-3.5 rounded-3xl p-[18px] border-[1.5px] shadow-xl"
                        style={{ borderColor: colors.g200 }}
                    >
                        <View className="flex-row justify-between items-start gap-2.5 mb-4">
                            <View>
                                <Text className="text-xs font-extrabold uppercase tracking-wide mb-1" style={{ color: colors.n400 }}>
                                    Ready to Withdraw
                                </Text>
                                <Text className="text-[34px] font-extrabold leading-none" style={{ color: colors.g600 }}>
                                    142 pts
                                </Text>
                                <Text className="text-sm font-bold mt-1.5" style={{ color: colors.n600 }}>
                                    ≈ 1.42 CELO
                                </Text>
                            </View>
                            <View
                                className="px-3 py-2 rounded-full flex-row items-center gap-1.5"
                                style={{ backgroundColor: colors.g100 }}
                            >
                                <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.g500 }} />
                                <Text className="text-xs font-extrabold" style={{ color: colors.g700 }}>
                                    MiniPay
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-full px-4 py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-2xl"
                            onPress={() => console.log('Withdraw pressed')}
                        >
                            <LinearGradient
                                colors={[colors.g500, colors.g600]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                className="absolute inset-0 rounded-2xl"
                            />
                            <ArrowDown size={16} strokeWidth={2} color="white" />
                            <Text className="text-[15px] font-extrabold text-white">Withdraw to MiniPay</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Profile Stats */}
                    <View className="flex-row gap-2.5 px-4 pt-3.5 pb-3.5">
                        <View
                            className="flex-1 bg-white border rounded-[18px] px-2.5 py-3.5 items-center shadow-sm"
                            style={{ borderColor: colors.n100 }}
                        >
                            <Text className="text-[22px] font-extrabold" style={{ color: colors.g500 }}>
                                24.1k
                            </Text>
                            <Text className="text-[10px] font-extrabold uppercase tracking-wide mt-1" style={{ color: colors.n400 }}>
                                Steps
                            </Text>
                        </View>
                        <View
                            className="flex-1 bg-white border rounded-[18px] px-2.5 py-3.5 items-center shadow-sm"
                            style={{ borderColor: colors.n100 }}
                        >
                            <Text className="text-[22px] font-extrabold" style={{ color: colors.amber }}>
                                142
                            </Text>
                            <Text className="text-[10px] font-extrabold uppercase tracking-wide mt-1" style={{ color: colors.n400 }}>
                                Points
                            </Text>
                        </View>
                        <View
                            className="flex-1 bg-white border rounded-[18px] px-2.5 py-3.5 items-center shadow-sm"
                            style={{ borderColor: colors.n100 }}
                        >
                            <Text className="text-[22px] font-extrabold" style={{ color: colors.n800 }}>
                                #1
                            </Text>
                            <Text className="text-[10px] font-extrabold uppercase tracking-wide mt-1" style={{ color: colors.n400 }}>
                                Rank
                            </Text>
                        </View>
                    </View>

                    {/* Recent Activity */}
                    <View className="px-4 mb-2">
                        <View className="flex-row justify-between items-center mb-2.5">
                            <Text className="text-xs font-extrabold uppercase tracking-wide" style={{ color: colors.n600 }}>
                                Recent Activity
                            </Text>
                            <TouchableOpacity onPress={() => console.log('See all pressed')}>
                                <Text className="text-xs font-extrabold" style={{ color: colors.g500 }}>
                                    See all
                                </Text>
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
                                        style={{ backgroundColor: tx.type === 'out' ? '#fef2f2' : colors.g50 }}
                                    >
                                        {tx.type === 'out' ? (
                                            <ArrowUp size={16} strokeWidth={2} color={colors.red} />
                                        ) : (
                                            <PersonStanding size={16} strokeWidth={2} color={colors.g500} />
                                        )}
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-sm font-bold" style={{ color: colors.n800 }}>
                                            {tx.name}
                                        </Text>
                                        <Text className="text-[11px] font-semibold mt-0.5" style={{ color: colors.n400 }}>
                                            {tx.date}
                                        </Text>
                                    </View>
                                    <Text
                                        className="text-sm font-extrabold"
                                        style={{ color: tx.type === 'out' ? colors.red : colors.g500 }}
                                    >
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
