import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { AuthContext } from '../store/auth'
import AuthStack from './authStack'
import UserStack from './userStack'

function RootNavigation() {
    const authContext = useContext(AuthContext)

    return (
        <NavigationContainer>
            {authContext.isAuthenticated ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default RootNavigation
