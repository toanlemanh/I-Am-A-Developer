import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";

import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    
  container: {
        flex: 1,
        backgroundColor: COLOR.welcomeBackground,
        alignItems:'center'
        
      },
      image: {
        flex: 1,
        resizeMode: "contain", 
        width: wp('35%'), // Adjust width to 30%
        height: hp('35%'), // Adjust height to 30%  
      },
      text: {
        color: "black",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        marginTop:hp('13%')
      },
      imageStyle:{
         opacity: 1 
      },
      options: {
        marginBottom: hp('15%'), // Add margin to move the options up    
    },
      optionsInLandscape:{
          width: wp('28%'),
          height: hp('28%')
      }
})