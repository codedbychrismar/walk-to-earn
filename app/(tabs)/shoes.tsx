import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

function AnimatedButton({ children }: any) {
    const scale = useSharedValue(1);

    scale.value = withRepeat(
        withSequence(
            withTiming(1.05, { duration: 800 }),
            withTiming(1, { duration: 800 })
        ),
        -1,
        true
    );

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return <Animated.View style={style}>{children}</Animated.View>;
}

export default function Shoes() {
    const [balance, setBalance] = useState(2.4);
    const [owned, setOwned] = useState([1]);
    const [active, setActive] = useState(1);

    const shoes = [
        {
            id: 1,
            emoji: "👟",
            name: "Street Basic",
            multiplier: 1.0,
            price: 0,
        },
        {
            id: 2,
            emoji: "🏃",
            name: "City Trainer",
            multiplier: 1.5,
            price: 1.0,
        },
        {
            id: 3,
            emoji: "⚡",
            name: "Volt Runner",
            multiplier: 2.0,
            price: 2.5,
        },
    ];

    function buyShoe(shoe: any) {
        if (balance < shoe.price) return;

        setBalance((b) => b - shoe.price);
        setOwned((prev) => [...prev, shoe.id]);
    }

    function equipShoe(id: number) {
        setActive(id);
    }

    return (
        <ScrollView className="flex-1 bg-white">

            {/* Header */}
            <View className="px-5 pt-14 pb-4 flex-row justify-between items-center">
                <Text className="text-2xl font-extrabold text-gray-900">
                    Shoe Shop
                </Text>

                <View className="bg-green-100 px-3 py-2 rounded-full flex-row items-center gap-2">
                    <View className="w-2 h-2 bg-green-500 rounded-full" />
                    <Text className="text-green-700 font-bold text-xs">
                        {balance.toFixed(2)} CELO
                    </Text>
                </View>
            </View>

            {/* Shoes */}
            <View className="px-4 gap-3">
                {shoes.map((shoe) => {
                    const isOwned = owned.includes(shoe.id);
                    const isActive = active === shoe.id;

                    return (
                        <View
                            key={shoe.id}
                            className={`p-4 rounded-2xl border ${isActive
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 bg-white'
                                }`}
                        >
                            <Text className="text-4xl">{shoe.emoji}</Text>

                            <Text className="text-lg font-extrabold text-gray-900 mt-2">
                                {shoe.name}
                            </Text>

                            <Text className="text-green-600 font-extrabold text-xl">
                                ×{shoe.multiplier}
                            </Text>

                            {/* Actions */}
                            <View className="flex-row justify-between items-center mt-4">

                                {isOwned ? (
                                    <>
                                        <Text className="text-gray-400 font-bold">
                                            Owned
                                        </Text>

                                        {isActive ? (
                                            <View className="bg-green-100 px-4 py-2 rounded-full">
                                                <Text className="text-green-700 text-xs font-bold">
                                                    ✓ Equipped
                                                </Text>
                                            </View>
                                        ) : (
                                            <Pressable
                                                onPress={() => equipShoe(shoe.id)}
                                                className="bg-green-600 px-4 py-2 rounded-full"
                                            >
                                                <Text className="text-white text-xs font-bold">
                                                    Equip
                                                </Text>
                                            </Pressable>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Text className="text-green-600 font-bold">
                                            {shoe.price} CELO
                                        </Text>

                                        <AnimatedButton>
                                            <Pressable
                                                onPress={() => buyShoe(shoe)}
                                                className="bg-green-600 px-5 py-2 rounded-full"
                                            >
                                                <Text className="text-white font-bold text-xs">
                                                    Buy
                                                </Text>
                                            </Pressable>
                                        </AnimatedButton>
                                    </>
                                )}

                            </View>
                        </View>
                    );
                })}
            </View>

        </ScrollView>
    );
}