import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { Pressable, PushNotificationIOS, Text, View } from 'react-native'
import { AuthContext } from '../context/auth'

import ActivitiesScreen from '../screens/ActivitiesScreen'
import HomeScreen from '../screens/HomeScreen'
import GoingOffline from '../store/GoingOffline'
import TestData from '../utils/TestData'
import { UserContext } from '../context/user-context'
import { putUserData } from '../context/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomDrawerContent from '../components/CustomDrawerContent'
const Drawer = createDrawerNavigator()

function DrawerStack() {
    const authContext = useContext(AuthContext)
    const userContext = useContext(UserContext);
    
    return (
        <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
            headerStyle: {
                backgroundColor: "#77B29F",
            },
            headerTintColor: "#EED817",
            headerTitleAlign: "center",
            headerRight: () => (
                <Pressable
                    style={{ backgroundColor: 'blue', padding: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                    title="put"
                    onPress={ async () => {
                        if(authContext.userId){
                            const key = await AsyncStorage.getItem("key");
                            const userState = userContext.userState;
                            putUserData(authContext.userId, key, userState );
                        }
                    }}
                >
                    <View><Text style={{ color: 'white', textAlign: 'center' }}>Put Data</Text></View>
                </Pressable>
            ),
        }}>
            <Drawer.Screen
                name="I am a Developer"
                component={HomeScreen}
               
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
            {/* <Drawer.Screen
                name="GoingOffline"
                component={GoingOffline}
                options={{
                    headerStyle: {
                        backgroundColor: "#77B29F",
                    },
                    headerTintColor: "#EED817",
                    headerTitleAlign: "center",

                }}
            /> */}
        </Drawer.Navigator>
    )
}

export default DrawerStack
