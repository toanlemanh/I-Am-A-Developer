import React, { useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signUp } from "../utils/firebase";
import { useState } from "react";
import SocialBtn from "../components/SocialBtn";
import FormBtn from "../components/FormBtn";
import FormInput from "../components/FormInput";
import DividerLine from "../components/DividerLine";
import { AuthContext } from "../context/auth";
import { Alert } from "react-native";

function RegisterScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [passsword, setPassword] = useState();
  const [username, setUsername] = useState();
  const [confirm, setConfirm] = useState();
  const [match, setMatch] = useState(true);

  function onEmailChangeHandler(email) {
    console.log(email);
    setEmail(email);
  }
  function onUsernameChangeHandler(username) {
    setUsername(username);
  }
  function onPasswordChangeHandler(password) {
    console.log(password);
    setPassword(password);
  }
  function onConfirmChangeHandler(confirm) {
    setConfirm(confirm);
  }


  //  confirm password whenever password changed
  useEffect(() => {
    if (passsword !== '' && confirm !== '') {
      setMatch(passsword === confirm);
    }
  }, [passsword, confirm, match]);

  //  function to register a new user account
  async function onRegisterHandler() {
    //  check all input whether empty or not 
    if (username.trim() === ''|| email.trim() === '' || passsword.trim() === '' || confirm.trim() === '') {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!match) {
      Alert.alert('Error', 'Password and confirm password do not match.');
      return;
    }

    // Perform registration (e.g., send data to backend API)
    //  logging the data here
    console.log('Registration successful!');
    console.log('email:', email);
    console.log('Password:', passsword);

    // Clear the input fields after registration
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirm('');

// redirect to home 
    const token = await signUp(email, passsword);
    if (token) authContext.authenticate(token)
  
    console.log("new token :", token);
  }
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Ionicons
          name={Platform.OS === "ios" ? "chevron-back" : "chevron-back"}
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Hello! Register to get started</Text>

      <View style={styles.boxInput}>
        <FormInput
          placeholder={"User"}
          secureTextEntry={false}
          value={username}
          onCredentialChangeHandler={onUsernameChangeHandler}
        />
        <FormInput
          placeholder={"Email"}
          secureTextEntry={false}
          value={email}
          onCredentialChangeHandler={onEmailChangeHandler}
        />
        <FormInput
          placeholder={"Password"}
          secureTextEntry={true}
          value={passsword}
          onCredentialChangeHandler={onPasswordChangeHandler}
        />
        <FormInput
          placeholder={"Confirm password"}
          secureTextEntry={true}
          value={confirm}
          onCredentialChangeHandler={onConfirmChangeHandler}
        />
      </View>

      <FormBtn title={"Register"} onTap={onRegisterHandler}></FormBtn>

      <DividerLine children={"Or Login with"} />

      <View style={styles.socialBox}>
        <SocialBtn name={"logo-facebook"} size={30} color={"#4092FF"} />
        <SocialBtn name={"logo-google"} size={30} color={"#F14336"}></SocialBtn>
        <SocialBtn name={"logo-apple"} size={30} color={"black"}></SocialBtn>
      </View>

      <View style={styles.registerContainer}>
        <Text style={{ fontSize: 16 }}>Already have an account? </Text>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.registerLink}>Login Now</Text>
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
    flexDirection: "row",
    justifyContent: "center",
  },

  registerContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  registerLink: {
    fontWeight: "bold",
    color: "#EB9F4A",
    fontSize: 16,
  },
});
