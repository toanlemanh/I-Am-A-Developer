import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    //modal frame
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    outerBoderPopup: {
        // flex: 1,
        margin: 20,
        backgroundColor: '#F0E5E5',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 2,
        // width: 230,
    },

    innerBoderPopup: {
        // flex: 1,
        margin: 5,
        backgroundColor: '#F0E5E5',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // elevation: 5,
        borderWidth: 1,
        width: 230,
    },
    gradient: {
        borderRadius: 20,
        width: 200,
        overflow: 'hidden',
        elevation: 2,

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        // backgroundColor: '#3a97de',
        width: 200
    },
    textButtonStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eventTitle: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'

    },
    eventText: {
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500'
    },
    eventContainer:{
        width: 200 
    },
    buttonContainer:{
        padding: 8 
    }
});