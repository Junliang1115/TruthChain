import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useColorScheme,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

export default function EditProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const [username, setUsername] = useState("crypto_enthusiast");
  const [bio, setBio] = useState(
    "Blockchain developer | NFT collector | Web3 enthusiast"
  );
  const [email, setEmail] = useState("user@example.com");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement profile update logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Success", "Profile updated successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
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
          <Ionicons name="close" size={24} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#333" }]}>
          Edit Profile
        </Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          style={[styles.saveButton, isLoading && styles.disabledButton]}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.avatarSection}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=myprofile" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? "#fff" : "#333" }]}>
            Username
          </Text>
          <BlurView intensity={20} style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#333" }]}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#666"
            />
          </BlurView>

          <Text style={[styles.label, { color: isDark ? "#fff" : "#333" }]}>
            Bio
          </Text>
          <BlurView
            intensity={20}
            style={[styles.inputWrapper, styles.bioInput]}
          >
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#333" }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Add a bio"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
            />
          </BlurView>

          <Text style={[styles.label, { color: isDark ? "#fff" : "#333" }]}>
            Email
          </Text>
          <BlurView intensity={20} style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#333" }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </BlurView>

          <Text style={[styles.label, { color: isDark ? "#fff" : "#333" }]}>
            Website
          </Text>
          <BlurView intensity={20} style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#333" }]}
              value={website}
              onChangeText={setWebsite}
              placeholder="Website"
              placeholderTextColor="#666"
              keyboardType="url"
              autoCapitalize="none"
            />
          </BlurView>
        </View>
      </ScrollView>
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
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#0a7ea4",
    borderRadius: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.7,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
  },
  changeAvatarButton: {
    padding: 5,
  },
  changeAvatarText: {
    color: "#0a7ea4",
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
  },
  inputWrapper: {
    backgroundColor: "rgba(150,150,150,0.1)",
    borderRadius: 12,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  bioInput: {
    minHeight: 100,
    paddingVertical: 10,
  },
});
