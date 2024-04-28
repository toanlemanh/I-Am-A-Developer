import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLOR.welcomeBackground,
    },
    textBox: {
        marginVertical: 40,
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        color: COLOR.headerBackground,
        fontWeight: '700',
    },
    btnBox: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    image: {
        width: "100%",
        height: '60%',
    }
})
