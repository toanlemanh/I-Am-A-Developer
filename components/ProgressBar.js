import React, { useState } from 'react';

import { View, } from 'react-native';

const PercentageBar = ({
  percentage,
  height,
  backgroundColor,
  completedColor,
  width
}) => {


  return (
    <View>
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{

            width: width,
            height: height,
            marginVertical: 0,
            borderRadius: 5,
            borderColor: backgroundColor,

            backgroundColor: '#E0E9F2'
          }}
        />
        <View
          style={{
            width: `${percentage}%`,
            height: height,
            marginVertical: 0,
            borderRadius: 5,
            backgroundColor: completedColor,
            position: 'absolute',
            bottom: height
          }}
        />
        <View
          style={{
            width: `${percentage}%`,
            height: height,
            bottom: 10
          }}>

        </View>
      </View>
    </View>
  );
};
export default PercentageBar;