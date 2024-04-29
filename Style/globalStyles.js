import { StyleSheet } from "react-native";
import { COLOR } from '../constants/GlobalColor';
export const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 4,
        backgroundColor: COLOR.welcomeBackground,
        borderColor: COLOR.homeBackgound
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 10
    }

})