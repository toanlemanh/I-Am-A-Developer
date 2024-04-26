import { StyleSheet } from "react-native";
 
export  const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFF1E7',
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