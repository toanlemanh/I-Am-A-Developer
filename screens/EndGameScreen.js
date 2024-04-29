import { useContext } from "react";
import { Alert, View } from "react-native";
import { styles } from '../Style/screenStyles/GameOverScreenStyle';
import Card from '../components/Card';
import { AuthContext } from "../context/auth";
import { UserContext } from "../context/user-context";
export default function EndGameScreen({ navigation }) {
    const auth = useContext(AuthContext)
    const userContext = useContext(UserContext)
    return (
        <View style={styles.container}>
            <Card
                barHidden={true}
                onPress={() => {
                    userContext.refresh()
                    Alert.alert("You have started a new life!")
                    navigation.navigate('MainScreen')
                }}
            >Start a new Life</Card>
            <Card
                barHidden={true}
                onPress={() => {
                    auth.logout()
                }}
            >Log Out</Card>
        </View>
    )
}