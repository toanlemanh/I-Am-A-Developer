import { View, Text, StyleSheet, Image } from "react-native";

export default function CustomAvatar({ width, height }) {
  return (
    <View>
      <View
        style={{
          width: width + 10,
          height: height + 10,
          borderRadius: (width + 10) / 2,
          backgroundColor: "#D9D9D9",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Image
          style={{
            width: width,
            height: height,
            borderRadius: width / 2,
          }}
          source={require("../assets/avatar.png")}
        />
      </View>
    </View>
  );
}
