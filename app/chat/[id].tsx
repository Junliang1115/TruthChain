import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ScrollView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useGlobalSearchParams } from "expo-router";

const mockMessages = {
  "1": [
    {
      id: "1",
      text: "Hey there!",
      sent: true,
      timestamp: "10:00 AM",
      avatar: "https://i.pravatar.cc/150?u=user1",
    },
    {
      id: "2",
      text: "What do you think about the new blockchain update?",
      sent: false,
      timestamp: "10:01 AM",
      avatar: "https://i.pravatar.cc/150?u=crypto_guru",
    },
    {
      id: "3",
      text: "I think it looks promising",
      sent: true,
      timestamp: "10:02 AM",
    },
  ],
  "2": [
    {
      id: "1",
      text: "Check out this new NFT collection! 🎨",
      sent: false,
      timestamp: "1:00 PM",
    },
    { id: "2", text: "Looks interesting!", sent: true, timestamp: "1:05 PM" },
  ],
};

export default function ChatDetailScreen() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages[id as string] || []);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [isContractModalVisible, setIsContractModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customContract, setCustomContract] = useState({
    name: "",
    price: "",
    details: "",
    trackingNumber: "",
  });
  const [contractStatuses, setContractStatuses] = useState({});

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sent: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "https://i.pravatar.cc/150?u=user1",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setIsTyping(false);

      // Auto-scroll to the latest message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleCustomContract = () => {
    if (
      !customContract.name ||
      !customContract.price ||
      !customContract.details ||
      !customContract.trackingNumber
    ) {
      Alert.alert("Error", "Please fill all contract details");
      return;
    }

    const contractId = Date.now().toString();
    const contractMessage = {
      id: contractId,
      text: `🤝 Smart Contract Proposal:\n\nItem: ${
        customContract.name
      }\nPrice: ${customContract.price} TRUT\nTracking #: ${
        customContract.trackingNumber
      }${customContract.details ? `\n\nTerms: ${customContract.details}` : ""}`,
      sent: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "contract",
      contractId,
      status: "pending",
    };

    setMessages([...messages, contractMessage]);
    setContractStatuses((prev) => ({
      ...prev,
      [contractId]: "pending",
    }));
    setIsContractModalVisible(false);
    setCustomContract({
      name: "",
      price: "",
      details: "",
      trackingNumber: "",
    });
  };

  const handleContractResponse = (contractId, response) => {
    setContractStatuses((prev) => ({
      ...prev,
      [contractId]: response,
    }));

    const responseMessage = {
      id: Date.now().toString(),
      text: `Contract ${
        response === "accepted" ? "Accepted ✅" : "Rejected ❌"
      }`,
      sent: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "contractResponse",
      contractId,
    };

    setMessages([...messages, responseMessage]);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageRow,
        item.sent ? styles.sentRow : styles.receivedRow,
      ]}
    >
      {/* Left-side avatar for received messages */}
      {!item.sent && (
        <Image
          source={{
            uri: item.avatar || "https://i.pravatar.cc/150?u=default_other",
          }} // Default avatar for the other person
          style={styles.messageAvatar}
        />
      )}

      <View
        style={[
          styles.messageContainer,
          item.sent ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sent ? styles.sentMessageText : styles.receivedMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>

      {/* Right-side avatar for sent messages */}
      {item.sent && (
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?u=user1", // Fixed avatar for the current user
          }}
          style={styles.messageAvatar}
        />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chat</Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
          />

          {isTyping && <Text style={styles.typingIndicator}>Typing...</Text>}

          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => setIsContractModalVisible(true)}
              style={styles.attachButton}
            >
              <Ionicons name="add-circle-outline" size={24} color="#0a7ea4" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                setIsTyping(text.length > 0);
              }}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name="send" size={24} color="#0a7ea4" />
            </TouchableOpacity>
          </View>

          <Modal
            visible={isContractModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsContractModalVisible(false)}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContainer}
              keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Create Smart Contract</Text>
                  <TouchableOpacity
                    onPress={() => setIsContractModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={styles.itemsList}
                  keyboardShouldPersistTaps="handled"
                >
                  <View style={styles.customContractForm}>
                    <TextInput
                      style={styles.contractInput}
                      placeholder="Contract Name"
                      placeholderTextColor="#999"
                      value={customContract.name}
                      onChangeText={(text) =>
                        setCustomContract((prev) => ({ ...prev, name: text }))
                      }
                    />
                    <TextInput
                      style={styles.contractInput}
                      placeholder="Price in TRUT"
                      placeholderTextColor="#999"
                      value={customContract.price}
                      onChangeText={(text) =>
                        setCustomContract((prev) => ({ ...prev, price: text }))
                      }
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={styles.contractInput}
                      placeholder="Tracking Number"
                      placeholderTextColor="#999"
                      value={customContract.trackingNumber}
                      onChangeText={(text) =>
                        setCustomContract((prev) => ({
                          ...prev,
                          trackingNumber: text,
                        }))
                      }
                    />
                    <TextInput
                      style={[
                        styles.contractInput,
                        styles.contractDetailsInput,
                      ]}
                      placeholder="Contract Details/Terms"
                      placeholderTextColor="#999"
                      value={customContract.details}
                      onChangeText={(text) =>
                        setCustomContract((prev) => ({
                          ...prev,
                          details: text,
                        }))
                      }
                      multiline
                      numberOfLines={4}
                    />
                    <TouchableOpacity
                      style={styles.createContractButton}
                      onPress={handleCustomContract}
                    >
                      <Text style={styles.createContractButtonText}>
                        Create Contract
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  messagesList: {
    padding: 16,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
    width: "100%",
  },
  sentRow: {
    justifyContent: "flex-end",
  },
  receivedRow: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginHorizontal: 4,
  },
  messageContainer: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 20,
  },
  sentMessage: {
    backgroundColor: "#0a7ea4",
    borderBottomRightRadius: 4,
    marginRight: 4,
  },
  receivedMessage: {
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 4,
    marginLeft: 4,
  },
  contractMessage: {
    backgroundColor: "#f8f4ff",
    borderColor: "#0a7ea4",
    borderWidth: 1,
  },
  contractResponseMessage: {
    backgroundColor: "#e6f7ff",
    borderColor: "#0a7ea4",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: "#fff",
  },
  receivedMessageText: {
    color: "#333",
  },
  contractMessageText: {
    color: "#0a7ea4",
  },
  timestamp: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "70%",
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
  },
  closeButton: {
    padding: 4,
  },
  itemsList: {
    maxHeight: "100%",
  },
  customContractForm: {
    marginBottom: 16,
  },
  contractInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 16,
  },
  contractDetailsInput: {
    height: 80,
    textAlignVertical: "top",
  },
  createContractButton: {
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  createContractButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contractActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  contractActionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: "#0a7ea4",
  },
  rejectButton: {
    backgroundColor: "#ff4d4d",
  },
  contractActionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  contractStatus: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  statusAccepted: {
    color: "#0a7ea4",
  },
  statusRejected: {
    color: "#ff4d4d",
  },
  typingIndicator: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginVertical: 4,
  },
});
