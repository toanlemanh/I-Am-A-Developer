import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
        margin: 20,
        backgroundColor: '#F0E5E5',
        borderRadius: 20,
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
    },

    innerBoderPopup: {
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
        width: 200
    },
    textButtonStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    eventTit: {
        marginBottom: 10,
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold'
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
    insideModal:{
        width: wp('62%')
    }
});    