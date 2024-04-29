import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { AuthContext } from '../context/auth'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { styles } from '../Style/globalStyles'
import { putUserData } from '../api/axios'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { COLOR } from '../constants/GlobalColor'
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
            return `You have received $${userState.userDailyLogin.rewards} from daily login rewards!`
        }
        else {
            userState.userDailyLogin.lastLoginDate = userContext.formatDate()
            return 'You have already received the daily login rewards!'
        }
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
                        style={styles.button}
                        onPress={() => {
                            const rewardsNoti = loginRewardsHandler()
                            if (rewardsNoti) Alert.alert(rewardsNoti);
                        }}
                    >
                        <View><Text style={styles.buttonText}>Rewards</Text></View>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        title="Savebutton"
                        onPress={async () => {
                            if (authContext.userId) {
                                const key = await AsyncStorage.getItem("key");
                                const userState = userContext.userState;
                                putUserData(authContext.userId, key, userState);
                                Alert.alert("Data saved")
                            }
                        }}
                    >
                        <View><Text style={styles.buttonText}>Save</Text></View>
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
