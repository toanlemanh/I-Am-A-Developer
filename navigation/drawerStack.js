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
import { COLOR } from '../constants/GlobalColor'
import MyAssetScreen from '../screens/MyAssetsScreen'
const Drawer = createDrawerNavigator()

function DrawerStack() {
    const authContext = useContext(AuthContext)
    const userContext = useContext(UserContext);
    
    return (
        <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
            headerStyle: {
                backgroundColor: COLOR.headerBackground,
            },
            headerTintColor: COLOR.headerTinColor,
            headerTitleAlign: "center",
            headerRight: () => (
                <Pressable
                    style={{ backgroundColor: '#243bec', padding: 7, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                    title="Savebutton"
                    onPress={ async () => {
                        if(authContext.userId){
                            const key = await AsyncStorage.getItem("key");
                            const userState = userContext.userState;
                            putUserData(authContext.userId, key, userState );
                        }
                    }}
                >
                    <View><Text style={{ color: 'white', textAlign: 'center' }}>Save</Text></View>
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
               
            />
            <Drawer.Screen
                name="TestData"
                component={TestData}
               
            />
            <Drawer.Screen
                name="My Assets"
                component={MyAssetScreen}
               
            />
            {/* <Drawer.Screen
                name="GoingOffline"
                component={GoingOffline}
                options={{
                    headerStyle: {
                        backgroundColor: COLOR.headerBackground,
                    },
                    headerTintColor: "#EED817",
                    headerTitleAlign: "center",

                }}
            /> */}
        </Drawer.Navigator>
    )
}

export default DrawerStack
