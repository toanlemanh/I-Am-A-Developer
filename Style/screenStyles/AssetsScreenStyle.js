import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLOR.homeBackgound,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  innerScrollView: {
    alignItems: "center",
  },
  empty: {
    resizeMode: "contain",
    width: "100%",
    height: "50%",
    marginTop: "50%",
  },
  emptyContainer: { borderRadius: 100, height: 500, overflow: "hidden" },
});
