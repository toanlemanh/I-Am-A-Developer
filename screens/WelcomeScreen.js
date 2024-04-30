import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  View,
  useWindowDimensions
} from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import FormBtn from "../components/FormBtn";
import { landStyles, styles } from "../styles/screenStyles/WelcomeStyle";
function WelcomeScreen({ navigation }) {
  const [style, setStyle] = useState(styles);
  const { width: windowWidth } = useWindowDimensions()
  const { height: windowHeight } = useWindowDimensions()
  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        console.log("Pot");
        setStyle(styles);
      } else {
        setStyle({ ...styles, ...landStyles });
        console.log("land");
      }
    });
  }, []);

  const imageStyle = Platform.select({
    ios: {
      ...style.image,
      minHeight: windowHeight * 0.55,
    },
    android: {
      ...style.image,
      minHeight: windowHeight * 0.55,
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
