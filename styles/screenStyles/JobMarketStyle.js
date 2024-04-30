import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";

export const styles= StyleSheet.create({
    container:{
        flexGrow:1,
        backgroundColor: COLOR.homeBackgound,
    },
    list:{
        alignItems:'center'
    },
    label: {
        fontWeight: 'bold',
    },
    JDContainer:{
      flexGrow:1,
      flexWrap:'wrap'
    }
     
})