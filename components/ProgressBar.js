import React, { useState } from "react";

import { View } from "react-native";
import { styles } from "../Style/componentStyle/ProgressbarStyle";
const PercentageBar = ({
  percentage,
  height,
  backgroundColor,
  completedColor,
  width,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View
          style={{
            width: width,
            height: height,
            marginVertical: 0,
            borderColor: backgroundColor,
            backgroundColor: backgroundColor,
          }}
        />
        <View
          style={{
            width: `${percentage}%`,
            height: height,
            marginVertical: 0,

            backgroundColor: completedColor,
            position: "absolute",
            bottom: height,
          }}
        />
        <View
          style={{
            width: `${percentage}%`,
            height: height,
            bottom: 10,
          }}
        ></View>
      </View>
    </View>
  );
};
export default PercentageBar;
