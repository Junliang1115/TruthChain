import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual signup logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      // TODO: Implement wallet connection
      Alert.alert("Coming Soon", "Wallet connection will be available soon!");
    } catch (error) {
      Alert.alert("Error", "Failed to connect wallet");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
            Create Account
          </Text>
        </View>

        <View style={styles.form}>
          <BlurView intensity={20} style={styles.inputWrapper}>
            <Ionicons name="person" size={20} color="#666" />
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
              placeholder="Username"
              placeholderTextColor="#666"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </BlurView>

          <BlurView intensity={20} style={styles.inputWrapper}>
            <Ionicons name="mail" size={20} color="#666" />
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
              placeholder="Email (optional)"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </BlurView>

          <BlurView intensity={20} style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#666" />
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </BlurView>

          <BlurView intensity={20} style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#666" />
            <TextInput
              style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
              placeholder="Confirm Password"
              placeholderTextColor="#666"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </BlurView>

          <TouchableOpacity style={styles.walletButton} onPress={connectWallet}>
            <Ionicons name="wallet" size={20} color="#fff" />
            <Text style={styles.walletButtonText}>Connect Wallet</Text>
          </TouchableOpacity>

          {walletAddress && (
            <Text style={styles.walletAddress}>
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.signUpButton, isLoading && styles.disabledButton]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={styles.signUpButtonText}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login")}
            style={styles.loginLink}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  form: {
    gap: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(150,150,150,0.1)",
    borderRadius: 12,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },
  walletButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 25,
    gap: 10,
  },
  walletButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  walletAddress: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#0a7ea4",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginLink: {
    alignItems: "center",
    marginTop: 20,
  },
  loginLinkText: {
    color: "#0a7ea4",
    fontSize: 14,
  },
});
