import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MainScreen from './screen/MainScreen';
import Login from './screen/Login';
import Signup from './screen/Signup';
const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MainScreen} options={{
          tabBarLabel: "Home", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Entypo name="home" size={24} color="black" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          ),
        }} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Main" component={BottomTabs}   options={{
          tabBarLabel: "Login", headerShown: false
        }}/>
        <Stack.Screen name="Login" options={{
          tabBarLabel: "Login", headerShown: false
        }} component={Login} />
          <Stack.Screen name="Signup" options={{
          tabBarLabel: "Signup", headerShown: false
        }} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
