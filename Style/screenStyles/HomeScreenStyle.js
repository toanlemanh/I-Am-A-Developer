import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF1E7'
    },
    userInfo: {
        marginTop: 17
    },
    topContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: "100%",
        height: 55,
        backgroundColor: '#FFFFFF',
        marginTop: -11

    },
    underhalf: {
        backgroundColor: 'white',
        flex: 1

    },
    userInfo: {
        flexDirection: 'row',
        paddingLeft: 40

    },
    level: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        marginRight: -15,
        marginBottom: -15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 20,
        fontWeight: '700',
        color: '#083C4C',
    },
    money: {
        fontSize: 20,
        marginRight: 20,
        textAlign: 'center',
        fontWeight: '500',
        color: '#083C4C',
    },
    balance: {
        fontWeight: '300'
    },
    ageText: {
        color: 'darkblue',
        fontWeight: 'bold',
        fontSize: 16,
    },
    eventText: {
        fontSize: 12,
        fontWeight: '300',
    },
    eventContainer: {
        marginVertical: 20,
    },
    eventsContainer: {
        height: hp('55%'),
        paddingLeft: 15,
        // flex: 1,

    },
    allStatusContainer: {
        width: '100%',
        height: 205,
        justifyContent: 'center',

    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    statusTextContainer: {
        
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        
    },
    statusBarContainer: {
        
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop:5,
        marginHorizontal:7
       
    },
    statusText: {
        fontWeight: '300',
        color: 'darkblue'
    },
    stageStyle: {
        color: '#083C4C',
        fontSize: 13,
        fontWeight: '300'
    },
    utility: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#EB9F4A',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#2B9939',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    pressed: {
        opacity: 0.65
    },
    outterContainer: {
        width: 76,
        height: 76, borderRadius: 38, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
        elevation: 7,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    incrementAge: {
        fontWeight: '500',
        color: 'white',
        fontSize: 24
    },
    navigateText: {
        fontSize: 10,
    },
    iconNavigateStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    characterNameContainer: {
        marginTop: 17
    },

})