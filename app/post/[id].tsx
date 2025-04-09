import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Linking,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TrustBadge } from "../../components/ui/TrustBadge";

// Add these helper functions before the component
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [showDaoInfo, setShowDaoInfo] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // Simulate fetching post data
    setPost({
      id,
      username: "crypto_guru",
      userAvatar: "https://i.pravatar.cc/150?u=crypto_guru",
      credibility: 85,
      image:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
      title: "Bitcoin ETF Approval: A Historic Milestone for Crypto",
      caption:
        "Bitcoin ETF approval marks historic milestone in crypto adoption! 🚀",
      timestamp: "2024-04-09T10:30:00Z",
      publisher: "CryptoNews International",
      sourceUrl: "https://crypto-news.com/bitcoin-etf-approved",
      verified: true,
      isNFTVerified: true,
      nftId: "TRC-123456",
      credibilityScore: 92,
      fullDescription: `In a landmark decision, the Securities and Exchange Commission (SEC) has approved the first Bitcoin Exchange-Traded Fund (ETF), marking a pivotal moment in cryptocurrency's journey toward mainstream adoption.

Key Developments:
• Multiple Bitcoin ETF applications approved
• Trading to begin on major exchanges
• Institutional investors poised to enter market
• Expected to bring billions in new investments

Market Impact:
- Bitcoin price surged 10% on announcement
- Trading volume reached record highs
- Institutional interest at unprecedented levels

Expert Analysis:
"This approval represents a watershed moment for cryptocurrency adoption," says Sarah Chen, Chief Investment Officer at Digital Asset Capital. "We expect this to dramatically reshape institutional participation in the crypto markets."

Future Implications:
1. Enhanced market accessibility
2. Improved price discovery
3. Greater regulatory clarity
4. Increased institutional adoption`,
      comments: [
        {
          id: "1",
          user: "alice_web3",
          avatar: "https://i.pravatar.cc/150?u=alice",
          text: "Great analysis! The institutional adoption angle is particularly interesting.",
          timestamp: "2024-04-09T11:30:00Z",
          credibility: 78,
        },
        {
          id: "2",
          user: "bob_crypto",
          avatar: "https://i.pravatar.cc/150?u=bob",
          text: "Could you provide links to the SEC official release?",
          timestamp: "2024-04-09T12:15:00Z",
          credibility: 82,
        },
      ],
      daoVotes: {
        trust: 120,
        untrust: 30,
        endTime: Date.now() + 86400000,
        status: "active",
      },
      votingHistory: [
        {
          voter: "alice_web3",
          type: "trust",
          timestamp: "2024-04-09T11:00:00Z",
          credibility: 78,
          comment: null,
        },
        {
          voter: "bob_crypto",
          type: "untrust",
          timestamp: "2024-04-09T12:00:00Z",
          credibility: 82,
          comment: "Need official SEC document links for verification",
        },
      ],
      factChecking: {
        status: "Verified",
        sources: [
          "SEC Official Website",
          "NYSE Announcements",
          "Bloomberg Financial News",
        ],
        lastVerified: "2024-04-09T13:00:00Z",
      },
    });
  }, [id]);

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const trustPercentage =
    (post.daoVotes.trust / (post.daoVotes.trust + post.daoVotes.untrust)) * 100;

  const renderNewsHeader = () => (
    <View style={styles.newsHeader}>
      <Text style={styles.newsTitle}>{post.title}</Text>
      <View style={styles.publisherContainer}>
        <Text style={styles.publisher}>{post.publisher}</Text>
        <Text style={styles.timestamp}>{formatDate(post.timestamp)}</Text>
      </View>
      {post.factChecking && (
        <View style={styles.factCheckBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#34C759" />
          <Text style={styles.factCheckText}>
            Fact Checked • {formatDate(post.factChecking.lastVerified)}
          </Text>
        </View>
      )}
    </View>
  );

  const renderVotingHistory = () => (
    <View style={styles.infoSection}>
      <View style={styles.sectionHeader}>
        <Ionicons name="shield-checkmark" size={20} color="#0a7ea4" />
        <Text style={styles.infoTitle}>DAO Voting History</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total Votes</Text>
          <Text style={styles.statsValue}>
            {post.daoVotes.trust + post.daoVotes.untrust}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Total TRUT Staked</Text>
          <Text style={styles.statsValue}>
            {post.votingHistory.reduce(
              (acc, vote) => acc + parseInt(vote.stake || 0),
              0
            )}{" "}
            TRUT
          </Text>
        </View>
      </View>

      <View style={styles.timeline}>
        {post.votingHistory.map((vote, index) => (
          <View key={index} style={styles.timelineItem}>
            <View
              style={[
                styles.timelineDot,
                {
                  backgroundColor:
                    vote.type === "trust" ? "#34C759" : "#FF3B30",
                },
              ]}
            />
            <View style={styles.timelineContent}>
              <View style={styles.voteHeader}>
                <Text style={styles.voter}>{vote.voter}</Text>
                <Text
                  style={[
                    styles.voteType,
                    { color: vote.type === "trust" ? "#34C759" : "#FF3B30" },
                  ]}
                >
                  {vote.type === "trust" ? "Trusted" : "Untrusted"}
                </Text>
              </View>
              <View style={styles.voteDetails}>
                <Text style={styles.voteStake}>{vote.stake || "N/A"}</Text>
                <Text style={styles.voteTimestamp}>
                  {formatDate(vote.timestamp)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderComments = () => (
    <View style={styles.commentsSection}>
      <View style={styles.commentHeader}>
        <Ionicons name="chatbubble-outline" size={20} color="#0a7ea4" />
        <Text style={styles.commentTitle}>
          Comments ({post.comments.length})
        </Text>
      </View>

      {post.comments.map((comment) => (
        <View key={comment.id} style={styles.commentCard}>
          <View style={styles.commentUserInfo}>
            <Image
              source={{ uri: comment.avatar }}
              style={styles.commentAvatar}
            />
            <View style={styles.commentMeta}>
              <Text style={styles.commentUser}>{comment.user}</Text>
              <Text style={styles.commentTimestamp}>
                {formatDate(comment.timestamp)}
              </Text>
            </View>
            <TrustBadge score={comment.credibility} small />
          </View>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      ))}
    </View>
  );

  const renderDaoHistory = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDaoInfo}
      onRequestClose={() => setShowDaoInfo(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>DAO Voting History</Text>
            <TouchableOpacity
              onPress={() => setShowDaoInfo(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll}>
            <View style={styles.daoStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Votes</Text>
                <Text style={styles.statValue}>
                  {post.daoVotes.trust + post.daoVotes.untrust}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Trust Ratio</Text>
                <Text style={styles.statValue}>
                  {(
                    (post.daoVotes.trust /
                      (post.daoVotes.trust + post.daoVotes.untrust)) *
                    100
                  ).toFixed(1)}
                  %
                </Text>
              </View>
            </View>

            <View style={styles.timelineContainer}>
              {post.votingHistory.map((vote, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.voteDot,
                        {
                          backgroundColor:
                            vote.type === "trust" ? "#34C759" : "#FF3B30",
                        },
                      ]}
                    />
                    {index !== post.votingHistory.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  <View style={styles.voteCard}>
                    <View style={styles.voteCardHeader}>
                      <Text style={styles.voterName}>{vote.voter}</Text>
                      <Text
                        style={[
                          styles.voteType,
                          {
                            color:
                              vote.type === "trust" ? "#34C759" : "#FF3B30",
                          },
                        ]}
                      >
                        {vote.type === "trust" ? "Trusted ✓" : "Untrusted ✗"}
                      </Text>
                    </View>
                    <View style={styles.voteCardBody}>
                      <Text style={styles.voteTime}>
                        {formatDate(vote.timestamp)}
                      </Text>
                    </View>
                    {vote.type === "untrust" && vote.comment && (
                      <Text style={styles.voteComment}>
                        Reason: {vote.comment}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderPostCredentials = () => (
    <View style={styles.credentialsContainer}>
      <View style={styles.credibilityScore}>
        <Ionicons name="shield-checkmark" size={20} color="#0a7ea4" />
        <Text style={styles.credibilityText}>
          Content Credibility Score: {post.credibilityScore}%
        </Text>
      </View>
      {post.isNFTVerified && (
        <View style={styles.nftBadge}>
          <Ionicons name="diamond" size={20} color="#0a7ea4" />
          <Text style={styles.nftText}>NFT Verified #{post.nftId}</Text>
        </View>
      )}
    </View>
  );

  const renderSourceVerification = () => (
    <View style={styles.sourceVerificationContainer}>
      <View style={styles.sourceHeader}>
        <Ionicons name="link" size={20} color="#0a7ea4" />
        <Text style={styles.sourceTitle}>Source Verification</Text>
      </View>

      {post.factChecking.sources.map((source, index) => (
        <TouchableOpacity
          key={index}
          style={styles.sourceItem}
          onPress={() => Linking.openURL(source.url || "#")}
        >
          <View style={styles.sourceItemHeader}>
            <Ionicons name="shield-checkmark" size={16} color="#34C759" />
            <Text style={styles.sourceName}>{source}</Text>
          </View>
          {source.url && (
            <Text style={styles.sourceUrl} numberOfLines={1}>
              {source.url}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBottomBar = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bottomBarContainer}
    >
      <View style={styles.bottomBar}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => handleVote("trust")}
          >
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={post.userVote === "trust" ? "#34C759" : "#666"}
            />
            <Text style={styles.actionCount}>{post.daoVotes.trust}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => handleVote("untrust")}
          >
            <Ionicons
              name="warning"
              size={24}
              color={post.userVote === "untrust" ? "#FF3B30" : "#666"}
            />
            <Text style={styles.actionCount}>{post.daoVotes.untrust}</Text>
          </TouchableOpacity>

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { opacity: commentText.length > 0 ? 1 : 0.5 },
              ]}
              disabled={commentText.length === 0}
              onPress={handleComment}
            >
              <Ionicons name="send" size={24} color="#0a7ea4" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const handleComment = () => {
    if (commentText.trim().length > 0) {
      // Add comment logic here
      setCommentText("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setShowDaoInfo(true)}
              style={styles.actionButton}
            >
              <Ionicons name="shield-outline" size={24} color="#0a7ea4" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <Image source={{ uri: post.image }} style={styles.postImage} />

        <View style={styles.content}>
          {renderNewsHeader()}
          {renderPostCredentials()}
          {renderSourceVerification()}
          <Text style={styles.description}>{post.fullDescription}</Text>

          <View style={styles.stats}>
            <View style={styles.trustStats}>
              <Text style={styles.statsLabel}>
                Trust Score: {trustPercentage.toFixed(1)}%
              </Text>
              <View style={styles.trustScoreBar}>
                <View
                  style={[
                    styles.trustScoreProgress,
                    { width: `${trustPercentage}%` },
                  ]}
                />
              </View>
              <View style={styles.voteCounts}>
                <Text style={styles.trustCount}>
                  Trusted: {post.daoVotes.trust}
                </Text>
                <Text style={styles.untrustCount}>
                  Untrusted: {post.daoVotes.untrust}
                </Text>
              </View>
            </View>
          </View>

          {renderComments()}
        </View>

        {renderDaoHistory()}
      </ScrollView>
      {renderBottomBar()}
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
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    padding: 8,
  },
  actionButton: {
    padding: 8,
  },
  postImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  content: {
    padding: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userMeta: {
    flex: 1,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
  stats: {
    marginTop: 16,
  },
  trustStats: {
    marginBottom: 16,
  },
  statsLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  trustScoreBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  trustScoreProgress: {
    height: "100%",
    backgroundColor: "#34C759",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  voteCounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  trustCount: {
    color: "#34C759",
    fontSize: 14,
    fontWeight: "500",
  },
  untrustCount: {
    color: "#FF3B30",
    fontSize: 14,
    fontWeight: "500",
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  infoSection: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  statsCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  timeline: {
    marginTop: 16,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  voteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  voter: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  voteType: {
    fontSize: 12,
    fontWeight: "600",
  },
  voteStake: {
    fontSize: 14,
    color: "#666",
  },
  voteDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  voteTimestamp: {
    fontSize: 12,
    color: "#999",
  },
  voteComment: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 8,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  commentText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#333",
  },
  commentTimestamp: {
    fontSize: 12,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 8,
  },
  modalScroll: {
    maxHeight: "80%",
  },
  daoStats: {
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  timelineContainer: {
    marginTop: 16,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 12,
  },
  voteDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: "#ccc",
  },
  voteCard: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
  },
  voteCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  voterName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  voteCardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  voteTime: {
    fontSize: 12,
    color: "#999",
  },
  credentialsContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  credibilityScore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  credibilityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a7ea4",
  },
  nftBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  nftText: {
    fontSize: 14,
    color: "#0a7ea4",
    fontWeight: "500",
  },
  newsHeader: {
    marginBottom: 16,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  publisherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  publisher: {
    fontSize: 14,
    color: "#666",
  },
  timestamp: {
    fontSize: 14,
    color: "#999",
  },
  factCheckBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  factCheckText: {
    fontSize: 14,
    color: "#34C759",
  },
  commentsSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  commentCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  commentUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  commentMeta: {
    flex: 1,
  },
  sourceVerificationContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  sourceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sourceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sourceItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  sourceItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  sourceName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  sourceUrl: {
    fontSize: 12,
    color: "#0a7ea4",
    textDecorationLine: "underline",
    marginLeft: 22,
  },
  bottomBarContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  bottomBar: {
    padding: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 8,
  },
  actionIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionCount: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  commentInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 4,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    maxHeight: 80,
    padding: 4,
  },
  sendButton: {
    padding: 8,
  },
});
