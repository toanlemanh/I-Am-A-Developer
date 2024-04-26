import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import PercentageBar from './ProgressBar';
import CustomAvatar from './CustomAvatar';
import { styles } from '../Style/componentStyle/CardStyle';
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
                <Text style={styles.viewDetail}> View detail</Text>  
              ): null}
            </View>
        </View>
      </Pressable>
    </View>
  );
}


