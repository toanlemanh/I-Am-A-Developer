import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  userId: "",
  userName: "",
  isAuthenticated: false,
  authenticate: (userId, userName) => {},
  logout: () => {},
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

  function authenticate(userId, userName = "") {
    if (userId) {
      setAuthUserId(userId);
      setUserName(userName);
      AsyncStorage.setItem("userId", userId);
      if (userName) {
        AsyncStorage.setItem(userId, userName);
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
