import React, { useContext } from "react";

import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen
import { COLOR } from "../constants/GlobalColor";
import AssetScreen from "../screens/AssetScreen";
import EndGameScreen from "../screens/EndGameScreen";
import JobMarket from "../screens/JobMarket";
import ManageRelationship from "../screens/ManageRelationship";
import OccupationScreen from "../screens/OccupationScreen";
import RelationshipScreen from "../screens/Relationship";
import SchoolScreen from "../screens/SchoolScreen";
import DrawerStack from "./drawerStack";

const Stack = createNativeStackNavigator();

function UserStack() {
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
      <Stack.Screen
        name="EndGameScreen"
        component={EndGameScreen}
        options={{
          headerShown: false,
          title: "Game Over!",
        }}
      />
    </Stack.Navigator>
  );
}

export default UserStack;
