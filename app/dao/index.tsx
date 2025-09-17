import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const mockProposals = [
  {
    id: "1",
    title: "Increase Trust Score Weight",
    description:
      "Proposal to increase the weight of trust scores in content ranking",
    votes: {
      for: 1250,
      against: 450,
    },
    status: "active",
    endDate: "2025-04-15",
    requiredTruthCoins: 100,
  },
  {
    id: "2",
    title: "New Content Category",
    description: 'Add a new "Education" category for content verification',
    votes: {
      for: 890,
      against: 320,
    },
    status: "active",
    endDate: "2025-04-20",
    requiredTruthCoins: 100,
  },
];

export default function DAOScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [proposals, setProposals] = useState(mockProposals);

  const handleVote = (proposalId: string, voteType: "for" | "against") => {
    Alert.alert(
      "Confirm Vote",
      "This action will require 100 TruthCoins. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Vote",
          onPress: () => {
            setProposals((currentProposals) =>
              currentProposals.map((proposal) => {
                if (proposal.id === proposalId) {
                  return {
                    ...proposal,
                    votes: {
                      ...proposal.votes,
                      [voteType]: proposal.votes[voteType] + 1,
                    },
                  };
                }
                return proposal;
              })
            );
            Alert.alert("Success", "Your vote has been recorded");
          },
        },
      ]
    );
  };

  const renderProposal = ({ item }) => {
    const totalVotes = item.votes.for + item.votes.against;
    const forPercentage = (item.votes.for / totalVotes) * 100;
    const againstPercentage = (item.votes.against / totalVotes) * 100;

    return (
      <View
        style={[
          styles.proposalCard,
          { backgroundColor: isDark ? "#1c1c1e" : "#fff" },
        ]}
      >
        <Text
          style={[styles.proposalTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.proposalDescription,
            { color: isDark ? "#999" : "#666" },
          ]}
        >
          {item.description}
        </Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFor, { width: `${forPercentage}%` }]} />
          <View
            style={[styles.progressAgainst, { width: `${againstPercentage}%` }]}
          />
        </View>

        <View style={styles.voteStats}>
          <Text style={styles.voteFor}>For: {item.votes.for}</Text>
          <Text style={styles.voteAgainst}>Against: {item.votes.against}</Text>
        </View>

        <View style={styles.votingButtons}>
          <TouchableOpacity
            style={[styles.voteButton, styles.voteForButton]}
            onPress={() => handleVote(item.id, "for")}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.voteButtonText}>Vote For</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.voteButton, styles.voteAgainstButton]}
            onPress={() => handleVote(item.id, "against")}
          >
            <Ionicons name="close-circle" size={20} color="#fff" />
            <Text style={styles.voteButtonText}>Vote Against</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.endDate}>Ends: {item.endDate}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#f5f5f5" },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>
          DAO Governance
        </Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-circle" size={24} color="#0a7ea4" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={proposals}
        renderItem={renderProposal}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.proposalsList}
      />
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
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    padding: 5,
  },
  createButton: {
    padding: 5,
  },
  proposalsList: {
    padding: 15,
  },
  proposalCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  proposalDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFor: {
    backgroundColor: "#34C759",
  },
  progressAgainst: {
    backgroundColor: "#FF3B30",
  },
  voteStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  voteFor: {
    color: "#34C759",
    fontWeight: "600",
  },
  voteAgainst: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  votingButtons: {
    flexDirection: "row",
    gap: 10,
  },
  voteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 25,
    gap: 5,
  },
  voteForButton: {
    backgroundColor: "#34C759",
  },
  voteAgainstButton: {
    backgroundColor: "#FF3B30",
  },
  voteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  endDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 10,
    textAlign: "right",
  },
});
