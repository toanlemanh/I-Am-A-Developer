import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/GlobalColor";

export const styles = StyleSheet.create({

  container: {
    padding: 10,
    backgroundColor: COLOR.homeBackgound,
    flex: 1,
    alignContent: 'center',
  },
  learningContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  subjectsContainer: {
    flexDirection: "column",
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
  tuluyenText: {
    fontWeight: "bold",
    fontSize: 16
  },
  yearText: {
    fontWeight: "bold",
    fontSize: 16
  }

});

