import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const notifications = [
  {
    id: "1",
    type: "like",
    username: "crypto_guru",
    userAvatar: "https://i.pravatar.cc/150?u=crypto_guru",
    content: "liked your post",
    timestamp: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    username: "nft_lover",
    userAvatar: "https://i.pravatar.cc/150?u=nft_lover",
    content: "commented on your post",
    timestamp: "5m ago",
    read: false,
  },
  {
    id: "3",
    type: "credibility",
    content: "Your credibility score increased by 5 points",
    timestamp: "1h ago",
    read: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const renderNotification = ({ item }) => {
    const getIcon = (type: string) => {
      switch (type) {
        case "like":
          return "heart";
        case "comment":
          return "chatbubble";
        case "credibility":
          return "shield-checkmark";
        default:
          return "notifications";
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !item.read && styles.unreadNotification,
        ]}
      >
        <View style={styles.notificationContent}>
          {item.userAvatar ? (
            <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
          ) : (
            <View style={styles.iconContainer}>
              <Ionicons name={getIcon(item.type)} size={24} color="#0a7ea4" />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.notificationText}>
              {item.username && (
                <Text style={styles.username}>{item.username}</Text>
              )}{" "}
              {item.content}
            </Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  listContainer: {
    padding: 15,
  },
  notificationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  unreadNotification: {
    backgroundColor: "rgba(10, 126, 164, 0.1)",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(10, 126, 164, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
  },
  username: {
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
