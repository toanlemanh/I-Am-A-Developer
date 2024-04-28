import React, { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../context/auth";

// Screen
import RelationshipScreen from "../screens/Relationship";
import ManageRelationship from "../screens/ManageRelationship";
import AssetScreen from "../screens/AssetScreen";
import OccupationScreen from "../screens/OccupationScreen";
import SchoolScreen from "../screens/SchoolScreen";
import JobMarket from "../screens/JobMarket";
import DrawerStack from "./drawerStack";
import { COLOR } from "../constants/GlobalColor";

const Stack = createNativeStackNavigator();

function UserStack() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: COLOR.authButton,
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
        component={DrawerStack}
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
        options={({ navigation }) => ({})}
      />
      <Stack.Screen
        name="Assets"
        component={AssetScreen}
        options={{
          title: "ASSETS",
        }}
      />
      <Stack.Screen
        name="Occupation"
        component={OccupationScreen}
        options={{
          title: "OCCUPATION",
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
          title: "JOB MARKET",
        }}
      />
    </Stack.Navigator>
  );
}

export default UserStack;
