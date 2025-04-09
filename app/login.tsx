import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement wallet connection
      Alert.alert("Coming Soon", "Wallet connection will be available soon!");
    } catch (error) {
      Alert.alert("Error", "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.content}>
          <Image
            source={require("../assets/images/Truth.png")}
            style={styles.logo}
            resizeMode="contain" // This ensures the image maintains its aspect ratio
          />

          <View style={styles.inputContainer}>
            <BlurView intensity={20} style={styles.inputWrapper}>
              <Ionicons name="mail" size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Email or username"
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
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </BlurView>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or</Text>
            <View style={styles.separatorLine} />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.walletButton]}
            onPress={handleWalletConnect}
            disabled={isLoading}
          >
            <Ionicons name="wallet" size={20} color="#fff" />
            <Text style={styles.buttonText}>Connect Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.signupButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // Add max width and center alignment for desktop
    maxWidth: Platform.OS === "web" ? 480 : "100%",
    alignSelf: "center",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    minHeight: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 50 : 20, // Add extra padding for iOS
    gap: 20,
    // Add minimum height for desktop
    minHeight: Platform.OS === "web" ? 600 : "auto",
  },
  logo: {
    width: "80%",
    height: undefined,
    aspectRatio: 3 / 1, // Adjust aspect ratio for a more horizontal logo
    alignSelf: "center",
    marginBottom: 40,
    maxWidth: 240,
  },
  inputContainer: {
    gap: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  loginButton: {
    backgroundColor: "#0a7ea4",
  },
  walletButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  separatorText: {
    color: "#666",
    marginHorizontal: 10,
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#0a7ea4",
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: Platform.OS === "ios" ? 20 : 0, // Add margin bottom for iOS
  },
  signupText: {
    color: "#fff",
    fontSize: 14,
  },
  signupButton: {
    color: "#0a7ea4",
    fontSize: 14,
    marginLeft: 5,
  },
});
