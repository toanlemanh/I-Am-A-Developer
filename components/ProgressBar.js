import React, { useState } from "react";

import { View ,Text} from "react-native";
import { styles } from '../styles/componentStyles/ProgressbarStyle';
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
        >
            <Text style={styles.percentage}>{percentage} %</Text>
        </View>
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
