import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WalletScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Mock wallet data - replace with actual blockchain data later
  const walletData = {
    balance: 1000.45,
    address: "0x1234...5678",
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#fff" : "#333"}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#333" }]}>
          Wallet
        </Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text
          style={[styles.balanceLabel, { color: isDark ? "#999" : "#666" }]}
        >
          Total Balance
        </Text>
        <Text
          style={[styles.balanceAmount, { color: isDark ? "#fff" : "#333" }]}
        >
          {walletData.balance.toFixed(2)} TC
        </Text>
        <Text
          style={[styles.walletAddress, { color: isDark ? "#999" : "#666" }]}
        >
          {walletData.address}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="send" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-down" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Receive</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionsContainer}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#fff" : "#333" }]}
        >
          Recent Transactions
        </Text>
        <View style={styles.emptyTransactions}>
          <Ionicons
            name="receipt-outline"
            size={48}
            color={isDark ? "#666" : "#ccc"}
          />
          <Text style={[styles.emptyText, { color: isDark ? "#666" : "#999" }]}>
            No transactions yet
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  balanceContainer: {
    alignItems: "center",
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  balanceLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 10,
  },
  walletAddress: {
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  actionButton: {
    backgroundColor: "#0a7ea4",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: 100,
  },
  actionButtonText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  transactionsContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  emptyTransactions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
  },
});
