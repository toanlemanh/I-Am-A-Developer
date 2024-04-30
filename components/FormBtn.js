import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import { styles } from "../styles/componentStyles/FormBtnStyle";
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

function FormBtn({ title, onTap }) {
  return (
    <AnimatedTouchableOpacity
      entering={BounceIn.duration(500).delay(100).springify()}
      onPress={onTap}
      style={styles.button}
    >
      <Text style={styles.text}>{title}</Text>
    </AnimatedTouchableOpacity>
  );
}

export default FormBtn;


