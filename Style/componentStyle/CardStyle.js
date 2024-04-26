import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    container: {    
      width: wp('85%'),
      height: hp('12%'),
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      marginVertical: 10,
      justifyContent: 'center',
  
      elevation: 7,
      shadowColor: "#000",
      shadowOffset: {width: 0, height:2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
   
    pressed: {
      opacity: 0.65,
    },
    
    inner: {
      flexDirection: 'row',
      marginLeft: 25,
      marginBottom: 25,
    },
    dataName: {
      color: '#083C4C',
      fontWeight: '600',
      fontSize: 18,
      
    },
    items: {
      marginLeft:10,
      marginTop: 23,
      
    },
    viewDetail:{
      color:'#083C4C',
      fontWeight:'300'
    }
  });