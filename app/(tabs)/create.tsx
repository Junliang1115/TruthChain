import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: "tech", label: "Technology" },
  { id: "finance", label: "Finance" },
  { id: "news", label: "News" },
  { id: "crypto", label: "Crypto" },
  { id: "nft", label: "NFT" },
];

export default function CreateScreen() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mintAsNFT, setMintAsNFT] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [sources, setSources] = useState([{ url: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addSource = () => {
    setSources([...sources, { url: "" }]);
  };

  const updateSource = (text: string, index: number) => {
    const newSources = [...sources];
    newSources[index].url = text;
    setSources(newSources);
  };

  const removeSource = (indexToRemove: number) => {
    setSources(sources.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (
      !image ||
      !caption ||
      !selectedCategory ||
      sources.some((source) => !source.url)
    ) {
      Alert.alert(
        "Missing Fields",
        "Please fill all required fields including sources"
      );
      return;
    }

    setIsSubmitting(true);

    Alert.alert(
      "⏳ Post Submission",
      "Your post will be pending for review and blockchain verification. This process typically takes 2-4 hours.\n\nYou'll receive a notification once your post is live.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setIsSubmitting(false),
        },
        {
          text: "Submit",
          onPress: () => {
            Alert.alert(
              "Post Submitted",
              "Your post is now pending verification. You can check its status in your profile.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    // Reset form and navigate back
                    setImage(null);
                    setCaption("");
                    setSelectedCategory(null);
                    setMintAsNFT(false);
                    setSources([{ url: "" }]);
                    setIsPreviewMode(false);
                    setIsSubmitting(false);
                    // TODO: Navigate back to feed or profile
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  if (isPreviewMode) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setIsPreviewMode(false)}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preview Post</Text>
        </View>

        <View style={styles.postPreview}>
          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} />
          )}
          <Text style={styles.previewCategory}>
            {categories.find((c) => c.id === selectedCategory)?.label}
          </Text>
          <Text style={styles.previewCaption}>{caption}</Text>
          <View style={styles.sourceContainer}>
            <Ionicons name="link-outline" size={16} color="#666" />
            {sources.map((source, index) => (
              <Text key={index} style={styles.previewSource} numberOfLines={1}>
                {source.url}
              </Text>
            ))}
          </View>
          {mintAsNFT && (
            <View style={styles.nftBadge}>
              <Ionicons name="diamond" size={16} color="#0a7ea4" />
              <Text style={styles.nftText}>NFT</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Submitting..." : "Submit to Blockchain"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Post</Text>
      </View>

      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Ionicons name="image" size={40} color="#666" />
            <Text style={styles.uploadText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption..."
        placeholderTextColor="rgba(51, 51, 51, 0.5)"
        value={caption}
        onChangeText={setCaption}
        multiline
        maxLength={500}
      />

      <View style={styles.sourcesContainer}>
        <Text style={styles.sectionTitle}>Sources</Text>
        {sources.map((source, index) => (
          <View key={index} style={styles.sourceInputContainer}>
            <Ionicons
              name="link-outline"
              size={20}
              color="#666"
              style={styles.sourceIcon}
            />
            <TextInput
              style={styles.sourceInput}
              placeholder="Add source URL or reference..."
              placeholderTextColor="rgba(51, 51, 51, 0.5)"
              value={source.url}
              onChangeText={(text) => updateSource(text, index)}
              autoCapitalize="none"
              keyboardType="url"
            />
            <View style={styles.sourceActions}>
              {sources.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeSource(index)}
                  style={styles.removeSourceButton}
                >
                  <Ionicons name="close-circle" size={24} color="#ff3b30" />
                </TouchableOpacity>
              )}
              {index === sources.length - 1 && (
                <TouchableOpacity
                  onPress={addSource}
                  style={styles.addSourceButton}
                >
                  <Ionicons name="add-circle" size={24} color="#0a7ea4" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === category.id &&
                    styles.selectedCategoryLabel,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.nftOption}
        onPress={() => setMintAsNFT(!mintAsNFT)}
      >
        <View style={styles.nftOptionLeft}>
          <Ionicons
            name={mintAsNFT ? "checkbox" : "square-outline"}
            size={24}
            color="#0a7ea4"
          />
          <Text style={styles.nftOptionText}>Mint as NFT</Text>
        </View>
        <Ionicons name="information-circle" size={24} color="#666" />
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.previewButton}
          onPress={() => setIsPreviewMode(true)}
        >
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  imageUpload: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    borderRadius: 12,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
  },
  uploadText: {
    marginTop: 10,
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
  },
  captionInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sourcesContainer: {
    marginBottom: 20,
  },
  sourceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sourceIcon: {
    paddingLeft: 15,
  },
  sourceInput: {
    flex: 1,
    fontSize: 16,
    height: 50,
    padding: 15,
    paddingLeft: 10,
    color: "#333",
  },
  sourceActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeSourceButton: {
    padding: 10,
    marginRight: 5,
  },
  addSourceButton: {
    padding: 10,
    marginRight: 5,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  categoriesScroll: {
    flexDirection: "row",
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#0a7ea4",
  },
  categoryLabel: {
    color: "#666",
  },
  selectedCategoryLabel: {
    color: "#fff",
  },
  nftOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 20,
  },
  nftOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nftOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  previewButton: {
    backgroundColor: "#0a7ea4",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  previewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#34C759",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingTop: Platform.OS === "ios" ? 40 : 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    padding: 5,
  },
  postPreview: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewImage: {
    width: "100%",
    height: 300,
  },
  previewCategory: {
    fontSize: 14,
    color: "#0a7ea4",
    padding: 15,
  },
  previewCaption: {
    fontSize: 16,
    padding: 15,
    paddingTop: 0,
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 5,
  },
  previewSource: {
    color: "#666",
    fontSize: 14,
    flex: 1,
  },
  nftBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 5,
  },
  nftText: {
    color: "#0a7ea4",
    fontWeight: "600",
  },
  submitButtonDisabled: {
    backgroundColor: "#a8e5b5",
    opacity: 0.8,
  },
});
