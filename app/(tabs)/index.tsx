import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Alert,
  Animated,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { TrustBadge } from "../../components/ui/TrustBadge";
import { useRouter } from "expo-router";

const TopNavBar = () => {
  const router = useRouter();

  return (
    <View style={styles.navBar}>
      <Text style={styles.logo}>Truth Chain</Text>
      <View style={styles.navActions}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          activeOpacity={0.7}
          style={styles.profileButton}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=myprofile" }}
            style={styles.profileAvatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Update the posts array with relevant news images
const posts = [
  {
    id: "1",
    username: "crypto_guru",
    userAvatar: "https://i.pravatar.cc/150?u=crypto_guru",
    credibility: 85,
    contentCredibility: 92,
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", // Bitcoin/crypto image
    caption:
      "Bitcoin ETF approval marks historic milestone in crypto adoption! 🚀\n\nAnalyzing the impact on institutional investment...",
    timestamp: "2h ago",
    comments: 24,
    verified: true,
    isNFTVerified: true,
    nftId: "TRC-89721",
    daoVotes: {
      trust: 120,
      untrust: 30,
      endTime: Date.now() + 86400000,
      status: "active",
    },
    userVote: null,
  },
  {
    id: "2",
    username: "tech_skeptic",
    userAvatar: "https://i.pravatar.cc/150?u=tech_skeptic",
    credibility: 45,
    contentCredibility: 38,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", // AI/Robot image
    caption:
      "BREAKING: AI poses immediate threat to humanity! Must be stopped immediately! 🤖❌\n\nUnverified sources claim catastrophic risks...",
    timestamp: "1h ago",
    comments: 56,
    verified: false,
    isNFTVerified: false,
    daoVotes: {
      trust: 30,
      untrust: 85,
      endTime: Date.now() + 86400000,
      status: "active",
    },
    userVote: null,
  },
  {
    id: "3",
    username: "climate_watch",
    userAvatar: "https://i.pravatar.cc/150?u=climate_watch",
    credibility: 88,
    contentCredibility: 95,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800", // Solar panels
    caption:
      "New Study: Global renewable energy adoption exceeds predictions 🌍\n\nDetailed analysis of sustainability trends and impact...",
    timestamp: "4h ago",
    comments: 42,
    verified: true,
    isNFTVerified: true,
    nftId: "TRC-92145",
    daoVotes: {
      trust: 95,
      untrust: 15,
      endTime: Date.now() + 86400000,
      status: "active",
    },
    userVote: null,
  },
  {
    id: "4",
    username: "health_facts",
    userAvatar: "https://i.pravatar.cc/150?u=health_facts",
    credibility: 92,
    contentCredibility: 89,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800", // Medical research
    caption:
      "Breakthrough in cancer research: New early detection method shows promising results 🔬\n\nPeer-reviewed study reveals...",
    timestamp: "3h ago",
    comments: 38,
    verified: true,
    isNFTVerified: false,
    daoVotes: {
      trust: 150,
      untrust: 20,
      endTime: Date.now() + 86400000,
      status: "active",
    },
    userVote: null,
  },
  {
    id: "5",
    username: "science_daily",
    userAvatar: "https://i.pravatar.cc/150?u=science_daily",
    credibility: 94,
    contentCredibility: 97,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800", // Space/telescope
    caption:
      "NASA's Webb telescope discovers potential signs of life on distant exoplanet 🌟\n\nGroundbreaking astronomical findings...",
    timestamp: "5h ago",
    comments: 67,
    verified: true,
    isNFTVerified: true,
    nftId: "TRC-95478",
    daoVotes: {
      trust: 180,
      untrust: 12,
      endTime: Date.now() + 86400000,
      status: "active",
    },
    userVote: null,
  },
];

const HomeScreen = () => {
  const router = useRouter(); // Move router to component level
  const [refreshing, setRefreshing] = useState(false);
  const [localPosts, setLocalPosts] = useState(posts);
  const [numColumns, setNumColumns] = useState(2); // Fixed to 2 columns
  const fadeAnims = React.useRef(
    posts.map(() => new Animated.Value(0))
  ).current;

  const getKey = () => {
    return `${numColumns}-column-list`;
  };

  const handleVote = (id: string, type: "up" | "down") => {
    setLocalPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            upvotes: type === "up" ? post.upvotes + 1 : post.upvotes,
            downvotes: type === "down" ? post.downvotes + 1 : post.downvotes,
          };
        }
        return post;
      })
    );
  };

  const handleReport = (postId: string) => {
    Alert.alert("Report Post", "Why are you reporting this post?", [
      {
        text: "Scam",
        onPress: () => console.log("Report scam", postId),
      },
      {
        text: "Misinformation",
        onPress: () => console.log("Report misinformation", postId),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleDaoVote = (postId: string, voteType: "trust" | "untrust") => {
    // Get current post
    const post = localPosts.find((p) => p.id === postId);

    // If already voted with this type, handle unvote
    if (post?.userVote === voteType) {
      updateVoteCount(postId, voteType, true);
      updateUserVote(postId, null);
      return;
    }

    // If already voted other type, prevent new vote
    if (post?.userVote && post.userVote !== voteType) {
      Alert.alert(
        "Vote Already Cast",
        "Please remove your existing vote before casting a new one"
      );
      return;
    }

    // Handle new trust vote
    if (voteType === "trust") {
      Alert.alert(
        "Verify Content",
        "I verify this content is true and accurate",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Verify",
            onPress: () => {
              updateVoteCount(postId, voteType);
              updateUserVote(postId, voteType);
            },
          },
        ]
      );
    } else {
      // Handle new untrust vote
      Alert.alert(
        "Flag Content",
        "Please select a reason for flagging this content:",
        [
          {
            text: "Misleading Information",
            onPress: () => {
              updateVoteCount(postId, voteType);
              updateUserVote(postId, voteType);
            },
          },
          {
            text: "Scam/Fraud",
            onPress: () => {
              updateVoteCount(postId, voteType);
              updateUserVote(postId, voteType);
            },
          },
          {
            text: "Manipulated Media",
            onPress: () => {
              updateVoteCount(postId, voteType);
              updateUserVote(postId, voteType);
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  const updateVoteCount = (
    postId: string,
    voteType: "trust" | "untrust",
    isUnvote: boolean = false
  ) => {
    setLocalPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            daoVotes: {
              ...post.daoVotes,
              [voteType]: post.daoVotes[voteType] + (isUnvote ? -1 : 1),
            },
          };
        }
        return post;
      })
    );
  };

  const updateUserVote = (
    postId: string,
    voteType: "trust" | "untrust" | null
  ) => {
    setLocalPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            userVote: voteType,
          };
        }
        return post;
      })
    );
  };

  React.useEffect(() => {
    Animated.stagger(
      100,
      fadeAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (Platform.OS === "web") {
        if (window.innerWidth <= 768) {
          setNumColumns(1);
        } else {
          setNumColumns(2);
        }
      }
    };

    if (Platform.OS === "web") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      if (Platform.OS === "web") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const getPostWidth = () => {
    if (Platform.OS === "web") {
      switch (numColumns) {
        case 2:
          return "calc(50% - 12px)";
        default:
          return "100%";
      }
    }
    // For iOS/Android - standardize to 2 columns
    return "48%";
  };

  // Update the renderPost function to include content credibility
  const renderPost = ({ item, index }) => {
    const totalVotes = item.daoVotes.trust + item.daoVotes.untrust;
    const trustPercentage = (item.daoVotes.trust / totalVotes) * 100 || 0;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`/post/${item.id}`)}
      >
        <Animated.View
          style={[
            styles.postContainer,
            styles.gridPost,
            {
              opacity: fadeAnims[index],
              width: Platform.OS === "web" ? getPostWidth() : undefined,
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.userInfo}
              onPress={() => router.push(`/profile/${item.username}`)}
            >
              <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
              <View style={styles.userMetaContainer}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username} numberOfLines={1}>
                    {item.username}
                  </Text>
                  {item.verified && (
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color="#0a7ea4"
                    />
                  )}
                  {item.isNFTVerified && (
                    <Ionicons name="diamond" size={14} color="#0a7ea4" />
                  )}
                </View>
                <TrustBadge score={item.credibility} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: item.image }}
            style={styles.postImage}
            resizeMode="cover"
          />

          <View style={styles.contentContainer}>
            <View style={styles.contentCredibility}>
              <Ionicons name="shield-checkmark" size={14} color="#0a7ea4" />
              <Text style={styles.credibilityText}>
                Content Trust: {item.contentCredibility}%
              </Text>
            </View>
            <View style={styles.captionContainer}>
              <Text style={styles.caption} numberOfLines={2}>
                {item.caption}
              </Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionsContainer}>
              <View style={styles.leftActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.trustButton]}
                  onPress={() => handleDaoVote(item.id, "trust")}
                >
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color={item.userVote === "trust" ? "#34C759" : "#666"}
                  />
                  <Text
                    style={[
                      styles.actionCount,
                      item.userVote === "trust" && styles.activeVoteCount,
                    ]}
                  >
                    {item.daoVotes.trust}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.untrustButton]}
                  onPress={() => handleDaoVote(item.id, "untrust")}
                >
                  <Ionicons
                    name="warning-outline"
                    size={20}
                    color={item.userVote === "untrust" ? "#FF3B30" : "#666"}
                  />
                  <Text
                    style={[
                      styles.actionCount,
                      item.userVote === "untrust" && styles.activeUntrustCount,
                    ]}
                  >
                    {item.daoVotes.untrust}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={20} color="#666" />
                  <Text style={styles.actionCount}>{item.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar />
      <View style={styles.mainContent}>
        <FlatList
          key={getKey()}
          data={localPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          numColumns={2} // Fixed to 2 columns
          contentContainerStyle={[
            styles.feedContainer,
            Platform.OS === "web" && styles.webFeedContainer,
          ]}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fadeAnims.forEach((anim) => anim.setValue(0));
                setTimeout(() => {
                  Animated.stagger(
                    100,
                    fadeAnims.map((anim) =>
                      Animated.timing(anim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                      })
                    )
                  ).start();
                  setRefreshing(false);
                }, 2000);
              }}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    maxWidth: Platform.OS === "web" ? 1200 : "100%",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#fafafa",
    ...Platform.select({
      ios: {
        paddingTop: 0, // Remove extra padding since we have fixed nav height
      },
      web: {
        paddingHorizontal: 24,
      },
      default: {
        paddingHorizontal: 8,
      },
    }),
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    width: "48%", // Fixed width for all platforms
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      web: {
        borderWidth: 1,
        borderColor: "#dbdbdb",
        minWidth: 380,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  gridPost: {
    flex: undefined, // Remove flex to use fixed width
    marginBottom: 16,
  },
  header: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userMetaContainer: {
    flex: 1,
    marginLeft: 8,
  },
  avatar: {
    width: 28, // Reduced from 32
    height: 28, // Reduced from 32
    borderRadius: 14,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  username: {
    fontSize: 13, // Reduced from 14
    fontWeight: "600",
  },
  moreButton: {
    padding: 4,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    padding: Platform.OS === "ios" ? 12 : 14,
  },
  contentCredibility: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
    backgroundColor: "#f8f9fa",
    padding: 8,
    borderRadius: 8,
  },
  credibilityText: {
    fontSize: 12,
    color: "#0a7ea4",
    fontWeight: "500",
  },
  captionContainer: {
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
    color: "#262626", // Instagram's text color
  },
  timestamp: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },
  actionsContainer: {
    marginTop: 4,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    padding: 8,
    marginHorizontal: -8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  trustButton: {
    opacity: 0.9,
  },
  untrustButton: {
    opacity: 0.9,
  },
  actionCount: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  activeVoteCount: {
    color: "#34C759",
    fontWeight: "bold",
  },
  activeUntrustCount: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
  navBar: {
    ...Platform.select({
      ios: {
        paddingTop: 10, // Reduced from 50 for better iOS positioning
        paddingBottom: 8,
        height: 60, // Fixed height for iOS
      },
      android: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 56, // Fixed height for Android
      },
      web: {
        paddingVertical: 10,
        height: 60, // Fixed height for web
      },
    }),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
    maxWidth: Platform.OS === "web" ? 1200 : undefined,
    alignSelf: "center",
    width: "100%",
    position: Platform.OS === "web" ? "sticky" : "relative",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  feedContainer: {
    padding: 8,
  },
  webFeedContainer: {
    padding: 24,
    maxWidth: 1200,
    alignSelf: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  profileButton: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 16,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  navButton: {
    padding: 5,
  },
  voteActionContainer: {
    flexDirection: "row",
    gap: 8,
  },
  voteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trustScoreBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 8,
  },
  trustScoreProgress: {
    height: "100%",
    backgroundColor: "#34C759",
  },
});

export default HomeScreen;
