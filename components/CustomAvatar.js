import { View,Text,StyleSheet } from "react-native";

export default function CustomAvatar({width,height}){
    return(
        <View>
            <View style={{
            width:width+10,
            height:height+10,
            borderRadius:(width+10)/2,
            backgroundColor:'#D9D9D9',
            alignItems:'center',
            justifyContent:'center',
            marginTop: 25
        }}>
            <View style={{
                 width:width,
                 height:height,
                 borderRadius:width/2,
                 backgroundColor:'black',
            }}>

            </View>                
        </View>
        </View>
    )
}


