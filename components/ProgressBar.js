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
 



  return (
    <View>
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{

            width: width,
            height: height,
            marginVertical: 0,
           
            borderColor: backgroundColor,

            backgroundColor: '#E0E9F2'
          }}
        />
        <View
          style={{
            width: `${percentage}%`,
            height: height,
            marginVertical: 0,
            
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