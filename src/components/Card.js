import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import PercentageBar from './ProgressBar';
import CustomAvatar from './CustomAvatar';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';
/**
 * 
 *This component include the avatar of the card, the name of the card, and two optional prop 
 barHidden is use to hide the percentage bar when value is  true
showDetail will show the text when user set this to true
 */
export default function Card({ percentage,onPress,barHidden,showDetail,children }) {
  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
          <View style={styles.inner}>
            <CustomAvatar width={40} height={40} />
            <View style={styles.items}>
              <Text style={styles.dataName}>{children}</Text>
              {!barHidden ? (
                <PercentageBar
                  percentage={percentage}
                  height={15}
                  width={210}
                  backgroundColor={'#E0E9F2'}
                  completedColor={'#009A34'}
                />
              ) : null}
              {showDetail ? (
                <Text style={{color:'#083C4C',fontWeight:'300'}}> View detail</Text>  
              ): null}
            </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {    width: '85%',
    height: hp('12%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 7,

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
    marginTop: 15,
    
  },
});
