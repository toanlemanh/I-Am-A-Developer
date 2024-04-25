import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({
    userId: '',
    userName: '',
    // check login or sign up mode
    isAuthenticated: false,
    authenticate: (userId, userName) => {},
    logout: () => {},
})

function AuthContextProvider  ({children}) {
      const [authuserId , setAuthuserId] = useState();
      const [userName, setUserName] = useState();

      function authenticate (userId, userName) {
        if (userId && userId.length > 0) {
            setAuthuserId(userId);
            setUserName(userName)
            AsyncStorage.setItem('userId', userId);
            //AsyncStorage.setItem(userId, userName);
        }
      }

      function logout () {
        if (authuserId) {
            setAuthuserId(null);
            AsyncStorage.removeItem('userId');
        } 
      }

      const value = {
        userId: authuserId,
        userName: userName,
        isAuthenticated: !!authuserId,
        authenticate: authenticate,
        logout: logout,
      }


    return <AuthContext.Provider 
       value={value}
    >
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;