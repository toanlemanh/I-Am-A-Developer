import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserContext } from "../context/user-context";
export default function GoingOffline() {
    const userContext = useContext(UserContext)
    const user = userContext.userState
    userContext.saveUserDataToStorage()
    return (
        <View>
            <Text>
                Health Point: {user.status.health}
            </Text>
            <Button title="change data" onPress={() => {
                userContext.updateStatus({
                    health: -10
                })
                console.log(user.status.health)
            }}></Button>
            <Button title="save data" onPress={() => {
                userContext.saveUserDataToStorage('123123')
            }}></Button>
            <Button title="load data" onPress={() => {
                userContext.loadUserDataFromStorage('123123')
            }}></Button>
        </View>
    )
}