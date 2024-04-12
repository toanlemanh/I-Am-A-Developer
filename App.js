import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


export default function App() {

  const BottomTab = createBottomTabNavigator();

  const Stack = createStackNavigator();
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
            // headerLeft: () => (
            //   <View>
            //     <FontAwesome.Button
            //       name='long-arrow-left'
            //       size={25}
            //       backgroundColor="#f9fafd"
            //       color="#333"
            //       onPress={() => navigation.navigate('LoginScreen')}
            //     />
            //   </View>
            // ),
          })}
        />
      </Stack.Navigator>

      {/* <BottomTab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black'
      }}>
        <BottomTab.Screen name='Home' component={HomeScreen} options={{
          tabBarIcon: ({ color, size }) => <View style={styles.wrapper}>
            <Entypo name="shop" size={size} color={color} />
          </View>
        }} />
        <BottomTab.Screen name='Health' component={HealthScreen} options={{
          tabBarIcon: ({ color, size }) => <View style={styles.wrapper}>
            <AntDesign name="heart" size={size} color={color} />
          </View>
        }} />
        <BottomTab.Screen name='Money' component={MoneyScreen} options={{
          tabBarIcon: ({ color, size }) => <View style={styles.wrapper}>
            <MaterialCommunityIcons name="sack" size={size} color={color} />
          </View>
        }} />
        <BottomTab.Screen name='Occupation' component={OccupationScreen} options={{
          tabBarIcon: ({ color, size }) => <View style={styles.wrapper}>
            <MaterialIcons name="work" size={size} color={color} />
          </View>
        }} />
      </BottomTab.Navigator> */}
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
  wrapper: {
    width: 42,
    height: 42,
    borderRadius: 24,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
