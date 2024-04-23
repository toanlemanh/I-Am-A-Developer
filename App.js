import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContextProvider, { AuthContext } from "./src/context/auth";
import ActivitiesScreen from "./src/screens/ActivitiesScreen";
import AssetScreen from "./src/screens/AssetScreen";
import HomeScreen from "./src/screens/HomeScreen";
import JobMarket from "./src/screens/JobMarket";
import LoginScreen from "./src/screens/LoginScreen";
import ManageRelationship from "./src/screens/ManageRelationship";
import OccupationScreen from "./src/screens/OccupationScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RelationshipScreen from "./src/screens/Relationship";
import SchoolScreen from "./src/screens/SchoolScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import TestData from "./src/utils/TestData";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AuthenticateScreen() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}

function AuthenticatedScreen() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable
            title="logout"
            style={{ backgroundColor: "red" }}
            onPress={() => authContext.logout()}
          />
        ),
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
    >
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

        })}
      />
      <Stack.Screen
        name="ManageRelationship"
        component={ManageRelationship}
        options={({ navigation }) => ({

        })}
      />
      <Stack.Screen
        name="Assets"
        component={AssetScreen}
        options={{
          title: 'ASSETS'
        }}
      />
      <Stack.Screen
        name="Occupation"
        component={OccupationScreen}
        options={{
          title: 'OCCUPATION'
        }}
      />
      <Stack.Screen
        name="SchoolScreen"
        component={SchoolScreen}
        options={({ navigation }) => ({
          title: "EDUCATION",
        })}
      />
      <Stack.Screen
        name="Job Market"
        component={JobMarket}
        options={{
          title: 'JOB MARKET'
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNav() {
  const authContext = useContext(AuthContext);
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
          headerRight: () => (
            <Pressable
              style={{ backgroundColor: 'blue', padding: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}
              title="logout"
              onPress={() => authContext.logout()}
            >
              <View><Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text></View>
            </Pressable>
          ),
        }}
      />
      <Drawer.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          headerStyle: {
            backgroundColor: "#77B29F",
          },
          headerTintColor: "#EED817",
          headerTitleAlign: "center",

        }}
      />
      <Drawer.Screen
        name="TestData"
        component={TestData}
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

function RNContainer() {
  const authContext = useContext(AuthContext);

  return (
    //AuthContextProvider
    <NavigationContainer>
      {authContext.isAuthenticated && <AuthenticatedScreen />}
      {!authContext.isAuthenticated && <AuthenticateScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  const authContext = useContext(AuthContext);
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  React.useEffect(() => {
    async function fetchuserId() {
      //store on the device
      const storeduserId = await AsyncStorage.getItem("userId");
      if (storeduserId) {
        authContext.authenticate(storeduserId);
      }
      setIsTryingLogin(false);
    }

    fetchuserId();
  }, []);

  if (isTryingLogin) return <ActivityIndicator size="large" color="#00ff00" />;
  else
    return (
      <AuthContextProvider>
        <RNContainer />
      </AuthContextProvider>
    );
}
