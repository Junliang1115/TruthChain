import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "../../contexts/UserContext";
import { TrustBadge } from "../../components/ui/TrustBadge";

export default function ProfileScreen() {
  const router = useRouter();
  const { userProfile } = useUser();
  const [activeTab, setActiveTab] = useState("grid"); // 'grid' or 'list'

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postThumbnail}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      {item.isNFT && (
        <View style={styles.nftBadge}>
          <Ionicons name="diamond" size={16} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderPostsHeader = () => (
    <View style={styles.postsHeader}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "grid" && styles.activeTab]}
        onPress={() => setActiveTab("grid")}
      >
        <Ionicons
          name="grid"
          size={24}
          color={activeTab === "grid" ? "#0a7ea4" : "#666"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "list" && styles.activeTab]}
        onPress={() => setActiveTab("list")}
      >
        <Ionicons
          name="list"
          size={24}
          color={activeTab === "list" ? "#0a7ea4" : "#666"}
        />
      </TouchableOpacity>
    </View>
  );

  const renderProfileButtons = () => (
    <View style={styles.profileButtons}>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton}>
        <Ionicons name="share-social-outline" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderHighlights = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.highlightsContainer}
    >
      <TouchableOpacity style={styles.highlight}>
        <Image
          source={{ uri: userProfile.avatar }}
          style={styles.highlightImage}
        />
        <Text style={styles.highlightText}>Top Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.highlight}>
        <View style={styles.addHighlight}>
          <Ionicons name="add" size={24} color="#666" />
        </View>
        <Text style={styles.highlightText}>New</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <Text style={styles.topNavTitle}>Profile</Text>
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={styles.settingsButton}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <View style={styles.usernameRow}>
                <Text style={styles.username}>{userProfile.username}</Text>
                {userProfile.isVerified && (
                  <Ionicons name="checkmark-circle" size={20} color="#0a7ea4" />
                )}
              </View>
              <TrustBadge score={userProfile.trustScore} />
            </View>
          </View>
        </View>

        {renderProfileButtons()}
        <Text style={styles.bio}>{userProfile.bio}</Text>
        {renderHighlights()}

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.postsCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {renderPostsHeader()}
        <FlatList
          data={userProfile.posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          numColumns={activeTab === "grid" ? 3 : 1}
          scrollEnabled={false}
          style={styles.postsGrid}
        />
      </ScrollView>
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
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  bio: {
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#666",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
  },
  postsGrid: {
    padding: 1,
  },
  postThumbnail: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 1,
  },
  postImage: {
    flex: 1,
    borderRadius: 4,
  },
  nftBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(10, 126, 164, 0.8)",
    borderRadius: 12,
    padding: 4,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  topNavTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  profileButtons: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 15,
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  editButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  shareButton: {
    backgroundColor: "#f8f9fa",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  highlightsContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  highlight: {
    alignItems: "center",
    marginRight: 15,
  },
  highlightImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#eee",
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 12,
    color: "#666",
  },
  addHighlight: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#eee",
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  postsHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginBottom: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#0a7ea4",
  },
});
