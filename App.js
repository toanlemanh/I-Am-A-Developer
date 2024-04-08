import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './src/screens/Home'
import HealthScreen from './src/screens/HealthScreen';
import MoneyScreen from './src/screens/MoneyScreen';
import OccupationScreen from './src/screens/OccupationScreen';
import { Entypo,AntDesign,MaterialCommunityIcons,MaterialIcons  } from '@expo/vector-icons';



export default function App() {
  const BottomTab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      
      <BottomTab.Navigator screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarActiveTintColor:'black'
      }}>
        <BottomTab.Screen name='Home' component={HomeScreen} options={{
          tabBarIcon:({color,size})=> <View style={styles.wrapper}>
            <Entypo name="shop" size={size} color={color} />
          </View>
        }}/>
        <BottomTab.Screen name='Health' component={HealthScreen} options={{
          tabBarIcon:({color,size})=> <View style={styles.wrapper}>
            <AntDesign name="heart" size={size} color={color} />
          </View>
        }}/>
        <BottomTab.Screen name='Money' component={MoneyScreen} options={{
          tabBarIcon:({color,size})=> <View style={styles.wrapper}>
            <MaterialCommunityIcons name="sack" size={size} color={color} />
          </View>
        }} />
        <BottomTab.Screen name='Occupation' component={OccupationScreen} options={{
          tabBarIcon:({color,size})=> <View style={styles.wrapper}>
            <MaterialIcons name="work" size={size} color={color} />
          </View>
        }}/>
      </BottomTab.Navigator>
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
  wrapper:{
    width: 42,
    height:42,
    borderRadius:24,
    backgroundColor:'#C0C0C0',
    justifyContent:'center',
    alignItems:'center'
  }
});
