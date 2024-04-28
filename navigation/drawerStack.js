import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { AuthContext } from '../context/auth'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { COLOR } from '../constants/GlobalColor'
import { putUserData } from '../context/axios'
import { UserContext } from '../context/user-context'
import ActivitiesScreen from '../screens/ActivitiesScreen'
import HomeScreen from '../screens/HomeScreen'
import TestData from '../utils/TestData'
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

                headerRight: () => (<View>
                    <Pressable
                        style={{ backgroundColor: '#243bec', padding: 7, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                        onPress={() => {
                            const rewardsNotification = userContext.updateUserLogin()
                            if (rewardsNotification) Alert.alert(rewardsNotification);
                        }}
                    >
                        <View><Text style={{ color: 'white', textAlign: 'center' }}>Rewards</Text></View>
                    </Pressable>
                    <Pressable
                        style={{ backgroundColor: '#243bec', padding: 7, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                        title="Savebutton"
                        onPress={async () => {
                            if (authContext.userId) {
                                const key = await AsyncStorage.getItem("key");
                                const userState = userContext.userState;
                                putUserData(authContext.userId, key, userState);

                            }
                        }}
                    >
                        <View><Text style={{ color: 'white', textAlign: 'center' }}>Save</Text></View>
                    </Pressable>
                </View>

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
