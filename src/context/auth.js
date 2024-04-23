import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({
    userId: '',
    // check login or sign up mode
    isAuthenticated: false,
    authenticate: (userId) => {},
    logout: () => {},
})

function AuthContextProvider  ({children}) {
      const [authuserId , setAuthuserId] = useState();

      function authenticate (userId) {
        if (userId && userId.length > 0) {
            setAuthuserId(userId);
            AsyncStorage.setItem('userId', userId);
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