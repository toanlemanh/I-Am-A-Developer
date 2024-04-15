
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/Home';
import RelationshipScreen from './src/screens/Relationship'
import AssetScreen from './src/screens/AssetScreen';
import OccupationScreen from './src/screens/OccupationScreen';
import { AntDesign,  } from '@expo/vector-icons';

import ManageRelationship from './src/screens/ManageRelationship';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
export default function App() {

  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  function DrawerNav(){
    return(
      <Drawer.Navigator>
        <Drawer.Screen
          name='I am a Developer'
          component={HomeScreen}
          options={{
            headerStyle:{
              backgroundColor:'#77B29F'
            },
            headerTintColor:'#EED817',
            headerTitleAlign:'center'
          }}
        />
      </Drawer.Navigator>
    )
  }
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={({ navigation }) => ({
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              elevation: 0
            },
           
          })}
        />
        <Stack.Screen 
          name='MainScreen'
          component={DrawerNav}
          options={{headerShown:false}}
          
        />

        <Stack.Screen
          name='Relationship'
          component={RelationshipScreen}
          options={({ navigation }) => ({
            title: 'RELATIONSHIP',
            headerStyle: {
              backgroundColor: '#EB9F4A',
            },
            headerTintColor: '#FFFFFF',
            headerLeft: () => (
              <AntDesign
                name="caretleft"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()} 
              />
            ),
            headerTitleAlign:'center'
          })}
        
        />
         <Stack.Screen
          name='ManageRelationship'
          component={ManageRelationship}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#EB9F4A',
            },
            headerTintColor: '#FFFFFF',
            headerLeft: () => (
              <AntDesign
                name="caretleft"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()} 
              />
            ),
            headerTitleAlign:'center'
          })}
        
        />
        <Stack.Screen
          name='Assets'
          component={AssetScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Occupation'
          component={OccupationScreen}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
