import React from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { styles } from '../styles/componentStyles/CardStyle';
import { COLOR } from '../constants/GlobalColor';
import CustomAvatar from './CustomAvatar';
import PercentageBar from './ProgressBar';

/**
 * 
 *This component include the avatar of the card, the name of the card, and two optional prop 
 barHidden is use to hide the percentage bar when value is  true
showDetail will show the text when user set this to true
 */
import Animated, { FadeInLeft } from "react-native-reanimated";
const AnimatedView =
  Animated.createAnimatedComponent(View);
export default function Card({ percentage, onPress, barHidden, showDetail, children, time }) {
  const { width: windowWidth } = useWindowDimensions()
  return (
    <AnimatedView
      entering={FadeInLeft.duration(600).delay(200 * time).springify()}
      style={[styles.container, { width: windowWidth * 0.85 }]}>
      <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
        <View style={styles.inner}>
          <CustomAvatar width={40} height={40} />
          <View style={styles.items}>
            <Text style={styles.dataName}>{children}</Text>
            {!barHidden ? (
              <PercentageBar
                percentage={percentage}
                height={15}
                width={windowWidth * 0.5}
                backgroundColor={COLOR.progessBar}
                completedColor={COLOR.happinessColor}
              />
            ) : null}
            {showDetail ? (
              <Text style={styles.viewDetail}> View detail</Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </AnimatedView>
  );
}


