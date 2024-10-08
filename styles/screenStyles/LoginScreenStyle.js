import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
    },

    // Icon Box
    iconContainer: {
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 70,
        marginBottom: 20,
        backgroundColor: 'white',
    },

    icon: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        borderRadius: 10,
    },

    title: {
        color: COLOR.headerBackground,
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 10,
    },

    boxInput: {
        width: '100%',
        marginVertical: 20,
    },

    socialBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    registerContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    registerLink: {
        fontWeight: 'bold',
        color: COLOR.authButton,
        fontSize: 16,
    },
    optionText:{
        fontSize: 16
    }
})
export const landStyles = StyleSheet.create({
    container: {
       paddingHorizontal: wp(20),
    },
})