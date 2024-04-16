import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SocialBtn from '../components/SocialBtn';
import FormBtn from '../components/FormBtn';
import FormInput from '../components/FormInput';
import DividerLine from '../components/DividerLine';

function RegisterScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('LoginScreen')}>
        <Ionicons
          name={Platform.OS === "ios" ? "chevron-back" : "chevron-back"}
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Hello! Register to get started</Text>

      <View style={styles.boxInput}>
        <FormInput placeholder={"User"} secureTextEntry={false} />
        <FormInput placeholder={"Email"} secureTextEntry={false} />
        <FormInput placeholder={"Password"} secureTextEntry={true} />
        <FormInput placeholder={"Confirm password"} secureTextEntry={true} />
      </View>

      <FormBtn title={"Register"} onPress={() => navigation.navigate('MainScreen')}></FormBtn>

      <DividerLine children={"Or Login with"} />

      <View style={styles.socialBox}>
        <SocialBtn
          name={"logo-facebook"}
          size={30}
          color={"#4092FF"}
        />
        <SocialBtn name={"logo-google"} size={30} color={"#F14336"}></SocialBtn>
        <SocialBtn name={"logo-apple"} size={30} color={"black"}></SocialBtn>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Already have an account?{" "}
        </Text>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.registerLink}>
            Login Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },

  iconContainer: {
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 70,
    marginBottom: 20,
    backgroundColor: "white",
  },

  icon: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8ECF4",
    borderRadius: 10,
  },

  title: {
    color: "#77B29F",
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 10,
  },

  boxInput: {
    width: "100%",
    marginVertical: 10,
  },

  socialBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  registerContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  registerLink: {
    fontWeight: "bold",
    color: "#EB9F4A",
  },
});