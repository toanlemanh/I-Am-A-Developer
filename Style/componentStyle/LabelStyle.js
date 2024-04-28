import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";

export const  styles = StyleSheet.create({
    container:{
        width:'85%',
       backgroundColor:COLOR.titleBackground,
        borderRadius: 7,
        justifyContent:'center',
        alignItems:'center',
        height:30,
        marginVertical:10
    },
    label:{
        color:'white',
        fontWeight:'900'
    }
})