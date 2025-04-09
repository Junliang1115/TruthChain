// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof MaterialIcons>["name"]
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

interface IconSymbolProps {
  name: string;
  size: number;
  color: string;
}

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export const IconSymbol: React.FC<IconSymbolProps> = ({
  name,
  size,
  color,
}) => {
  // Map SF Symbols names to Ionicons names
  const getIoniconName = (sfSymbolName: string) => {
    const iconMap: { [key: string]: string } = {
      "house.fill": "home",
      "plus.square.fill": "add-square-outline", // More square-like appearance
      "add-square": "add-square-outline",
      "paperplane.fill": "paper-plane",
      "person.fill": "person",
      person: "person",
    };
    return iconMap[sfSymbolName] || sfSymbolName;
  };

  return <Ionicons name={getIoniconName(name)} size={size} color={color} />;
};
