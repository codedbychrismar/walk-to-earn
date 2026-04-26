import React, { createContext, useContext, useMemo, useState } from "react";
import type { ImageSourcePropType } from "react-native";

export type Shoe = {
  id: number;
  image: ImageSourcePropType;
  name: string;
  multiplier: number;
  price: number;
};

export const SHOES: Shoe[] = [
  {
    id: 1,
    image: require("@/assets/shoe1blue.png"),
    name: "Street Basic",
    multiplier: 1,
    price: 0,
  },
  {
    id: 2,
    image: require("@/assets/shoe2violet.png"),
    name: "City Trainer",
    multiplier: 1.5,
    price: 1,
  },
  {
    id: 3,
    image: require("@/assets/shoe3gold.png"),
    name: "Volt Runner",
    multiplier: 2,
    price: 2.5,
  },
  {
    id: 4,
    image: require("@/assets/shoe4red.png"),
    name: "Blaze Runner",
    multiplier: 3,
    price: 5,
  },
];

type ShoeState = {
  activeShoe: Shoe;
  balance: number;
  buyShoe: (shoe: Shoe) => boolean;
  equipShoe: (id: number) => void;
  owned: number[];
  shoes: Shoe[];
};

const ShoeContext = createContext<ShoeState | null>(null);

export function ShoeProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(2.4);
  const [owned, setOwned] = useState([1]);
  const [activeShoeId, setActiveShoeId] = useState(1);

  const activeShoe = useMemo(
    () => SHOES.find((shoe) => shoe.id === activeShoeId) ?? SHOES[0],
    [activeShoeId],
  );

  function buyShoe(shoe: Shoe) {
    if (owned.includes(shoe.id)) {
      setActiveShoeId(shoe.id);
      return true;
    }
    if (balance < shoe.price) return false;

    setBalance((current) => Number((current - shoe.price).toFixed(2)));
    setOwned((current) => [...current, shoe.id]);
    setActiveShoeId(shoe.id);
    return true;
  }

  function equipShoe(id: number) {
    if (!owned.includes(id)) return;
    setActiveShoeId(id);
  }

  return (
    <ShoeContext.Provider value={{ activeShoe, balance, buyShoe, equipShoe, owned, shoes: SHOES }}>
      {children}
    </ShoeContext.Provider>
  );
}

export function useShoes() {
  const context = useContext(ShoeContext);
  if (!context) throw new Error("useShoes must be used inside ShoeProvider");
  return context;
}
