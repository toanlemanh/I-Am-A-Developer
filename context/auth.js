import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  userId: "",
  userName: "",
  isAuthenticated: false,
  authenticate: (userId, userName) => { },
  logout: () => { },
});

function AuthContextProvider({ children, storedUserId }) {
  const [authUserId, setAuthUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // If storedUserId is available, authenticate the user right away
    async function autoLogin(storedUserId) {
      if (storedUserId) {
        authenticate(storedUserId, await AsyncStorage.getItem(storedUserId));
      }
      autoLogin(storedUserId);
    }
  }, [storedUserId]);

  function authenticate(userId, username) {
    if (userId) {
      setAuthUserId(userId);
      AsyncStorage.setItem("userId", userId);
      if (username) {
        setUserName(username);
      }
    }
  }

  function logout() {
    setAuthUserId(null);
    setUserName("");
    AsyncStorage.removeItem("userId");
    //AsyncStorage.removeItem('userName')
  }

  const value = {
    userId: authUserId,
    userName: userName,
    isAuthenticated: !!authUserId,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
