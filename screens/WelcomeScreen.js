import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import FormBtn from "../components/FormBtn";
import { styles, landStyles } from "../Style/screenStyles/WelcomeStyle";
import { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
function WelcomeScreen({ navigation }) {
  const [style, setStyle] = useState(styles);
  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        console.log("Pot");
        setStyle(styles);
      } else {
        setStyle({...styles,...landStyles});
        console.log("land");
      }
    });
  }, []);

  const imageStyle = Platform.select({
    ios: style.image,
    android: {
      ...style.image,
      height: hp(55),
    },
    web: {
      ...style.image,
    },
  });

  return (
    <SafeAreaView style={style.container}>
      <View style={style.innerContainer}>
        <View style={style.imageContainer}>
          <View style={style.textBox}>
            <Animated.Text
              entering={ZoomIn.duration(600).delay(200).springify()}
              exiting={ZoomOut}
              style={styles.text}
            >
              I am a Developer
            </Animated.Text>
          </View>

          <View style={style.btnBox}>
            <FormBtn
              title={"Login"}
              onTap={() => navigation.navigate("LoginScreen")}
            />
            <FormBtn
              title={"Register"}
              onTap={() => navigation.navigate("RegisterScreen")}
            />
          </View>
        </View>
        <Image
          source={require("../assets/images/bg-welcome.jpg")}
          resizeMode="cover"
          style={imageStyle}
        />
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
