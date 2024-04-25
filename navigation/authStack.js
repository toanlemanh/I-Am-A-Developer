import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import RegisterScreen from "../screens/RegisterScreen"
import LoginScreen from "../screens/LoginScreen"
import WelcomeScreen from "../screens/WelcomeScreen"

const Stack = createNativeStackNavigator()

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ header: () => null }}
            />

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack