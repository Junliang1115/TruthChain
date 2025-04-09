import React, { createContext, useContext, useState } from "react";

interface Post {
  id: string;
  image: string;
  isNFT?: boolean;
}

interface UserProfile {
  username: string;
  bio: string;
  email: string;
  website: string;
  avatar: string;
  isVerified: boolean;
  trustScore: number;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  posts: Post[];
}

interface UserContextType {
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const defaultUserProfile: UserProfile = {
  username: "crypto_enthusiast",
  bio: "Blockchain developer | NFT collector | Web3 enthusiast",
  email: "user@example.com",
  website: "",
  avatar: "https://i.pravatar.cc/150?u=myprofile",
  isVerified: true,
  trustScore: 85,
  postsCount: 42,
  followersCount: 1234,
  followingCount: 567,
  posts: [
    {
      id: "1",
      image: "https://picsum.photos/seed/post1/400/400",
      isNFT: true,
    },
    // Add more mock posts as needed
  ],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile);

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...newProfile,
    }));
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
