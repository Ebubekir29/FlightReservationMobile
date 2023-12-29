import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MainScreen from './screen/MainScreen';
import Signup from './screen/Signup';
import Login from './screen/Login';
import UcusListele from './screen/UcusListele';
import ProfileScreen from "./screen/ProfileScreen";
import SeatSelection from './screen/SeatSelection';
import MyTickets from './screen/MyTickets';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Login">
       <Stack.Screen name="Login" options={{
          tabBarLabel: "Login", headerShown: false
        }} component={Login} />
       <Stack.Screen name="Main" options={{
          tabBarLabel: "Signup", headerShown: false
        }} component={MainScreen} />
       <Stack.Screen name="Signup" options={{
          tabBarLabel: "Signup", headerShown: false
        }} component={Signup} />
       <Stack.Screen name="Ucuslar" component={UcusListele}   options={{
          headerShown: false
        }}/>
       <Stack.Screen name="SeatSelection" component={SeatSelection}   options={{
          headerShown: false
        }}/>
       <Stack.Screen name="MyTickets" component={MyTickets}   options={{
          headerShown: false
        }}/>
  </Stack.Navigator>
);

const StackNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Main" component={MainStack} options={{
          tabBarLabel: "Anasayfa", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Entypo name="home"  size={30} color="blue" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          ),
        }} />
     <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: "Profil", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Ionicons name="person" size={24} color="blue" />
          ) : (
            <Ionicons name="person-outline" size={24} color="black" />
          ),
        }} />
  </Tab.Navigator>
);

export default StackNavigator;