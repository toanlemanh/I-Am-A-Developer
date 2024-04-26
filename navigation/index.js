import React, { useContext } from 'react'
import AuthStack from './authStack'
import UserStack from './userStack'
import { AuthContext } from '../context/auth'
import { NavigationContainer } from '@react-navigation/native'

function RootNavigation() {
    const authContext = useContext(AuthContext)

    return (
        <NavigationContainer>
            {authContext.isAuthenticated ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default RootNavigation
