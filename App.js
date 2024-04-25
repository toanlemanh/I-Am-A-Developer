import React, { useState, useEffect } from "react"
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContextProvider from './context/auth' // Make sure this path is correct
import UserProvider from './context/user-context' // Make sure this path is correct
import RootNavigation from "./navigation/index" // Make sure this path is correct

export default function App() {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const [storedUserId, setStoredUserId] = useState(null)

  useEffect(() => {
    async function fetchUserId() {
      const userId = await AsyncStorage.getItem('userId')
      setStoredUserId(userId) // We set the storedUserId whether it's null or not
      setIsTryingLogin(false)
    }

    fetchUserId()
  }, [])

  if (isTryingLogin) {
    return <ActivityIndicator animating={true} size="small" color="#00ff00" />
  } else {
    return (
      <AuthContextProvider storedUserId={storedUserId}>
        <UserProvider>
          <RootNavigation />
        </UserProvider>
      </AuthContextProvider>
    )
  }
}