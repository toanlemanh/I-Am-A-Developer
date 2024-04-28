import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";
 
export  const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLOR.hom,
    },
    horizontalContainer: {
        flexDirection: 'row'
    },
    list: {
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
    },
    effect: {
        fontStyle: 'italic',
        color: '#EB6F4A'
    },
    labelContainer:{
        flexGrow: 1, 
        flexWrap: 'wrap', 
        alignItems: 'flex-end' 
    },
    valueContainer:{
        flexGrow: 1, 
        flexWrap: 'wrap', 
        alignItems: "flex-start" 
    }
}) 