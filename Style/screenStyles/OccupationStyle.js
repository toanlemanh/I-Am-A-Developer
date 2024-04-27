import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF1E7',

  },
  buttonOutterContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('33%'),
    height: hp('8%'),
    borderRadius: 12,
    backgroundColor: '#878DD8',
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  jobTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  quitButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  quitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
