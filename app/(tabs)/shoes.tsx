import { useShoes } from "@/src/features/shoes/shoe-state";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Platform, Pressable, ScrollView, Text, View } from "react-native";

function AnimatedButton({ children }: { children: React.ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (Platform.OS === "web") return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 800, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [scale]);

  return (
    <Animated.View style={Platform.OS !== "web" ? { transform: [{ scale }] } : undefined}>
      {children}
    </Animated.View>
  );
}

export default function Shoes() {
  const { activeShoe, balance, buyShoe, equipShoe, owned, shoes } = useShoes();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-5 pt-14 pb-4 flex-row justify-between items-center">
        <Text className="text-2xl font-extrabold text-gray-900">Shoe Shop</Text>
        <View className="bg-green-100 px-3 py-2 rounded-full flex-row items-center gap-2">
          <View className="w-2 h-2 bg-green-500 rounded-full" />
          <Text className="text-green-700 font-bold text-xs">{balance.toFixed(2)} CELO</Text>
        </View>
      </View>

      <View className="px-4 gap-3 pb-28">
        {shoes.map((shoe) => {
          const isOwned = owned.includes(shoe.id);
          const isActive = activeShoe.id === shoe.id;

          return (
            <View
              key={shoe.id}
              className={`p-4 rounded-2xl border ${isActive ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"}`}
            >
              <Image source={shoe.image} resizeMode="contain" style={{ width: 58, height: 58 }} />
              <Text className="text-lg font-extrabold text-gray-900 mt-2">{shoe.name}</Text>
              <Text className="text-green-600 font-extrabold text-xl">x{shoe.multiplier}</Text>

              <View className="flex-row justify-between items-center mt-4">
                {isOwned ? (
                  <>
                    <Text className="text-gray-400 font-bold">Owned</Text>
                    {isActive ? (
                      <View className="bg-green-100 px-4 py-2 rounded-full">
                        <Text className="text-green-700 text-xs font-bold">Equipped</Text>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() => equipShoe(shoe.id)}
                        className="bg-green-600 px-4 py-2 rounded-full"
                      >
                        <Text className="text-white text-xs font-bold">Equip</Text>
                      </Pressable>
                    )}
                  </>
                ) : (
                  <>
                    <Text className="text-green-600 font-bold">{shoe.price} CELO</Text>
                    <AnimatedButton>
                      <Pressable
                        onPress={() => buyShoe(shoe)}
                        className="bg-green-600 px-5 py-2 rounded-full"
                      >
                        <Text className="text-white font-bold text-xs">Buy</Text>
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
