import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { landStyle, style } from "../styles/screenStyles/RegisterStyles";
import { postUserId } from "../api/axios";
import DividerLine from "../components/DividerLine";
import FormBtn from "../components/FormBtn";
import FormInput from "../components/FormInput";
import SocialBtn from "../components/SocialBtn";
import { signUp } from "../config/firebase";
import { UserContext } from "../store/user-context";
function RegisterScreen({ navigation }) {
  let USER_ID;
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState();
  const [passsword, setPassword] = useState();
  const [username, setUsername] = useState();
  const [confirm, setConfirm] = useState();
  const [match, setMatch] = useState(true);
  const [userId, setUserId] = useState();
  const [styles, setStyle] = useState(style);
  const [initialState, setInitialState] = useState(userContext.userState);

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        console.log("Pot");
        setStyle(style);
      } else {
        setStyle({ ...style, ...landStyle });
        console.log("land");
      }
    });
  }, []);
  function onEmailChangeHandler(email) {
    email = email.trim();
    setEmail(email);
  }
  function onUsernameChangeHandler(username) {
    setUsername(username);
  }
  function onPasswordChangeHandler(password) {
    setPassword(password);
  }
  function onConfirmChangeHandler(confirm) {
    setConfirm(confirm);
  }

  //  confirm password whenever password changed
  useEffect(() => {
    if (passsword !== "" && confirm !== "") {
      setMatch(passsword === confirm);
    }
  }, [passsword, confirm, match]);

  function updateInitialState(data) {
    console.log("data", data);
    setInitialState((prev) => ({
      ...prev,
      ...data,
    }));
  }
  useEffect(() => {
    function registerUserName() {
      if (userId) {
        console.log("init", userId, initialState);
        //  authContext.authenticate(userId, username);
        //const data = { userName: username };
        try {
          postUserId(userId, initialState);
          navigation.navigate("LoginScreen");
        } catch (err) {
          Alert.alert("Error", "Wrong Credential!");
        } finally {
          //thieu async
          AsyncStorage.setItem("username" + userId, username);
        }
      }
    }
    registerUserName();
  }, [initialState]);

  //  function to register a new user account
  async function onRegisterHandler() {
    //  check all input whether empty or not
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      passsword.trim() === "" ||
      confirm.trim() === ""
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (passsword.length <= 3) {
      Alert.alert("Error", "Password is too short!");
      return;
    }
    if (!match) {
      Alert.alert("Error", "Password and confirm password do not match.");
      return;
    }

    // Clear the input fields after registration, do not clear username
    setEmail("");
    setPassword("");
    setConfirm("");

    // redirect to home
    USER_ID = await signUp(email, passsword);
    setUserId(USER_ID);
    updateInitialState({ userName: username });
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
        <Text style={styles.optionsText}>Already have an account? </Text>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.registerLink}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
