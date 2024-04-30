import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";

export const styles = StyleSheet.create({
    button: {
      width: "100%",
      backgroundColor: COLOR.authButton,
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