import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { AuthContext } from '../context/auth'

import ActivitiesScreen from '../screens/ActivitiesScreen'
import HomeScreen from '../screens/HomeScreen'
import GoingOffline from '../store/GoingOffline'
import TestData from '../utils/TestData'
const Drawer = createDrawerNavigator()

function DrawerStack() {
    const authContext = useContext(AuthContext)

    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="I am a Developer"
                component={HomeScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#77B29F",
                    },
                    headerTintColor: "#EED817",
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <Pressable
                            style={{ backgroundColor: 'blue', padding: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                            title="logout"
                            onPress={() => authContext.logout()}
                        >
                            <View><Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text></View>
                        </Pressable>
                    ),
                }}
            />
            <Drawer.Screen
                name="Activities"
                component={ActivitiesScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#77B29F",
                    },
                    headerTintColor: "#EED817",
                    headerTitleAlign: "center",

                }}
            />
            <Drawer.Screen
                name="TestData"
                component={TestData}
                options={{
                    headerStyle: {
                        backgroundColor: "#77B29F",
                    },
                    headerTintColor: "#EED817",
                    headerTitleAlign: "center",

                }}
            />
            <Drawer.Screen
                name="GoingOffline"
                component={GoingOffline}
                options={{
                    headerStyle: {
                        backgroundColor: "#77B29F",
                    },
                    headerTintColor: "#EED817",
                    headerTitleAlign: "center",

                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack
