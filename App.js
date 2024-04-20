import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  View,
} from "react-native";

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
import SchoolScreen from "./src/screens/SchoolScreen";
import JobMarket from "./src/screens/JobMarket";

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
          title:'ASSETS'
        }}
      />
      <Stack.Screen 
        name="Occupation" 
        component={OccupationScreen} 
        options={{
          title:'OCCUPATION'
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
          title:'JOB MARKET'
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
            style={{backgroundColor: 'blue', padding: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10}}
              title="logout"
              onPress={() => authContext.logout()}
            >
              <View><Text style={{color: 'white', textAlign: 'center'}}>Logout</Text></View>
            </Pressable>
          ),
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
    async function fetchToken() {
      //store on the device
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authContext.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) return <ActivityIndicator size="large" color="#00ff00" />;
  else
    return (
      <AuthContextProvider>
        <RNContainer />
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
