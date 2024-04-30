import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLOR.welcomeBackground,
  },
  textBox: {
    marginVertical: 40,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
  },
  imageContainer:{
    paddingTop: hp(5),
  },
  text: {
    fontSize: 40,
    color: COLOR.headerBackground,
    fontWeight: "700",
  },
  btnBox: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: "60%",
  },
});
export const landStyles = StyleSheet.create({
  innerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingTop: hp(5),
  },
  image: {
    width: "50%",
    height: "100%",
  },
});
