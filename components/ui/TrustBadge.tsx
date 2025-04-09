import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TrustBadgeProps {
  score: number;
  small?: boolean; // Add small prop
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  score,
  small = false,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#34C759";
    if (score >= 50) return "#FF9500";
    return "#FF3B30";
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getScoreColor(score) },
        small && styles.badgeSmall,
      ]}
    >
      <Ionicons
        name="shield-checkmark"
        size={small ? 6 : 8}
        color="white"
        style={styles.icon}
      />
      <Text
        style={[styles.score, small && styles.scoreSmall]}
        numberOfLines={1}
      >
        {score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  badgeSmall: {
    height: 14,
    paddingHorizontal: 3,
    borderRadius: 3,
  },
  icon: {
    marginRight: 2,
  },
  score: {
    color: "white",
    fontSize: 11,
    fontWeight: "500",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  scoreSmall: {
    fontSize: 9,
  },
});
