import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#FFF1E7',
      
    },
    buttonOutterContainer:{
      alignItems:'center',
    },
    buttonContainer:{
      marginVertical:12,
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
      width: wp('33%'),
      height: hp('8%'),
      borderRadius:12,
      backgroundColor:'#878DD8',
      elevation:7,
      shadowColor: "#000",
      shadowOffset: {width: 0, height:2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    label: {
      fontWeight: 'bold',
      fontSize:16
    },
    innerContainer:{
        alignItems:'center',

    },
    findjob:{
        color:'white'
    }
   
    
   
  });
  