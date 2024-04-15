import { View,StyleSheet,Text,  } from "react-native"

export default function CustomDataLabel({children}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'85%',
        backgroundColor:'#413A3A',
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