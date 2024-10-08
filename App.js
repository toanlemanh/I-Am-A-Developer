import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import RootNavigation from "./navigation/index";
import AuthContextProvider from "./store/auth";
import UserProvider from "./store/user-context";

export default function App() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [storedUserId, setStoredUserId] = useState(null);

  useEffect(() => {
    async function fetchUserId() {
      const userId = await AsyncStorage.getItem("userId");
      setStoredUserId(userId);
      setIsTryingLogin(false);
    }

    fetchUserId();
  }, []);

  if (isTryingLogin) {
    return <ActivityIndicator animating={true} size="small" color="#00ff00" />;
  } else {
    return (
      <AuthContextProvider storedUserId={storedUserId}>
        <UserProvider>
          <RootNavigation />
        </UserProvider>
      </AuthContextProvider>
    );
  }
}
