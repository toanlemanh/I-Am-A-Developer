import React, { useState } from 'react';

import { View, } from 'react-native';

const PercentageBar = ({
  navigation,
  percentage,
  height,
  backgroundColor,
  completedColor,
  width
}) => {


  // const [getPercentage, setPercentage] = useState(percentage);
  const [getheight, setHeight] = useState(height);
  const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [getCompletedColor, setCompletedColor] = useState(completedColor);



  return (
    <View>
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{

            width: width,
            height: getheight,
            marginVertical: 0,
            borderRadius: 5,
            borderColor: getBackgroundColor,

            backgroundColor: '#E0E9F2'
          }}
        />
        <View
          style={{
            width: `${percentage}%`,
            height: getheight,
            marginVertical: 0,
            borderRadius: 5,
            backgroundColor: getCompletedColor,
            position: 'absolute',
            bottom: height
          }}
        />
        <View
          style={{
            width: `${percentage}%`,
            height: getheight,
            bottom: 10
          }}>

        </View>
      </View>
    </View>
  );
};
export default PercentageBar;