import React, { useContext, useState } from "react";
import { StyleSheet, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RelationshipScreen from "./src/screens/Relationship";
import AssetScreen from "./src/screens/AssetScreen";
import ManageRelationship from "./src/screens/ManageRelationship";
import OccupationScreen from "./src/screens/OccupationScreen";
import AuthContextProvider, { AuthContext } from "./src/context/auth";

export default function App() {
  const authContext = useContext(AuthContext);
  const [token, setToken] = useState();
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const AuthenticateStack = createNativeStackNavigator();

  function AuthenticateScreen() {
    const authContext = useContext(AuthContext);
    return (
      <AuthenticateStack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ header: () => null }}
        />
      </AuthenticateStack.Navigator>
    );
  }
  function AuthenticatedScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={DrawerNav}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Relationship"
          component={RelationshipScreen}
          options={({ navigation }) => ({
            title: "RELATIONSHIP",
            headerStyle: {
              backgroundColor: "#EB9F4A",
            },
            headerTintColor: "#FFFFFF",
            headerLeft: () => (
              <AntDesign
                name="caretleft"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="ManageRelationship"
          component={ManageRelationship}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#EB9F4A",
            },
            headerTintColor: "#FFFFFF",
            headerLeft: () => (
              <AntDesign
                name="caretleft"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="Assets"
          component={AssetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Occupation" component={OccupationScreen} />
      </Stack.Navigator>
    );
  }
  function DrawerNav() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="I am a Developer"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#77B29F",
            },
            headerTintColor: "#EED817",
            headerTitleAlign: "center",
          }}
        />
      </Drawer.Navigator>
    );
  }

  React.useEffect(() => {
    async function fetchToken() {
      //store on the device
      const storedToken = await AsyncStorage.getItem("token");
      console.log("stored", storedToken);

      if (storedToken) {
        authContext.authenticate(storedToken);
      }
    }

    fetchToken();
  }, []);
  return (
    <AuthContextProvider>
      <NavigationContainer>
        {!authContext.isAuthenticated && <AuthenticateScreen />}
        {authContext.isAuthenticated && <AuthenticatedScreen />}
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
