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
import MyAssetScreen from '../screens/MyAssetsScreen'
const Drawer = createDrawerNavigator()

function DrawerStack() {
    const authContext = useContext(AuthContext)
    const userContext = useContext(UserContext);
    const userState = userContext.userState
    function loginRewardsHandler() {
        userState.userDailyLogin.currentLoginDate = userContext.formatDate()
        if (userState.userDailyLogin.lastLoginDate !== userState.userDailyLogin.currentLoginDate || userState.userDailyLogin.lastLoginDate === "") {
            userState.character.money += userState.userDailyLogin.rewards
            userState.userDailyLogin.lastLoginDate = userContext.formatDate()
            return `You have received $${userState.userDailyLogin.rewards} from daily login rewards`
        }
        userState.userDailyLogin.lastLoginDate = userContext.formatDate()
    }


    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLOR.headerBackground,
                },
                headerTintColor: COLOR.headerTinColor,
                headerTitleAlign: "center",

                headerRight: () => (<View style={{ flexDirection: 'row' }}>
                    <Pressable
                        style={{ backgroundColor: COLOR.titleBackground, padding: 5, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                        onPress={() => {
                            const rewardsNoti = loginRewardsHandler()
                            if (rewardsNoti) Alert.alert(rewardsNoti);
                        }}
                    >
                        <View><Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }}>Rewards</Text></View>
                    </Pressable>
                    <Pressable
                        style={{ backgroundColor: COLOR.titleBackground, padding: 5, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
                        title="Savebutton"
                        onPress={async () => {
                            if (authContext.userId) {
                                const key = await AsyncStorage.getItem("key");
                                const userState = userContext.userState;
                                putUserData(authContext.userId, key, userState);

                            }
                        }}
                    >
                        <View><Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }}>Save</Text></View>
                    </Pressable>
                </View>

                ),
            }}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}

            />
            <Drawer.Screen
                name="Activities"
                component={ActivitiesScreen}

            />
            <Drawer.Screen
                name="My Assets"
                component={MyAssetScreen}
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack
