import React from "react";
import { Pressable, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
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

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#EB9F4A",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  text: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
