import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
      },
      image: {
        flex: 1,
        resizeMode: "contain", 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOR.welcomeBackground,
      },
      text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0",
        opacity: 0.8,
        borderRadius: 70,
        padding: 10,
      },
      imageStyle:{
         opacity: 1 
      }
})