import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({
    token: '',
    // check login or sign up mode
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {},
})

function AuthContextProvider  ({children}) {
      const [authToken , setAuthToken] = useState();

      function authenticate (token) {
        if (token && token.length > 0) {
            setAuthToken(token);
            AsyncStorage.setItem('token', token);
        }
      }

      function logout () {
        if (authToken) {
            setAuthToken(null);
            AsyncStorage.removeItem('token');
        } 
      }

      const value = {
        token: authToken,
        isAuthenticated: !!authToken,
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