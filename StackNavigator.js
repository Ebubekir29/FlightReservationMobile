import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import RouteCreate from './screen/RouteCreate';
import RouteEdit from './screen/RouteEdit';
import RouteGet from './screen/RouteGet';
import TicketEdit from './screen/TicketEdit';
import TicketCreate from './screen/TicketCreate';
import TicketGet from './screen/TicketGet';
import UserCreate from './screen/UserCreate';
import UserEdit from './screen/UserEdit';
import UserGet from './screen/UserGet';
import Tickets from './screen/Tickets';
import Payement from './screen/Payement';
import EditProfile from './screen/EditProfile';
import EditUserProfile from './screen/EditUserProfile';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const BottomTabs = () => {
    return (
      <Tab.Navigator  screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black', 
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}>
        <Tab.Screen name="Home" component={MainScreen} options={{
          tabBarLabel: "Home", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Entypo name="home" size={24} color="white" />
          ) : (
            <AntDesign name="home" size={24} color="white" />
          ),
        }} />
         <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: "Profile", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
            <Ionicons name="person" size={24} color="white" />
          ) : (
            <Ionicons name="person-outline" size={24} color="white" />
          ),
        }} />
      </Tab.Navigator>
    );
  }

  return (
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name="Main" component={BottomTabs}   options={{
          tabBarLabel: "Login",  headerShown: false
        }}/>
        <Stack.Screen name="Login" options={{
          tabBarLabel: "Login", headerShown: false
        }} component={Login} />
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
        <Stack.Screen name="RouteCreate" component={RouteCreate}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="RouteEdit" component={RouteEdit}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="RouteGet" component={RouteGet}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="TicketCreate" component={TicketCreate}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="TicketEdit" component={TicketEdit}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="TicketGet" component={TicketGet}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="UserCreate" component={UserCreate}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="UserEdit" component={UserEdit}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="UserGet" component={UserGet}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Tickets" component={Tickets}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Payment" component={Payement}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="EditProfile" component={EditProfile}   options={{
          headerShown: false
        }}/>
        <Stack.Screen name="EditUserProfile" component={EditUserProfile}   options={{
          headerShown: false
        }}/>
      </Stack.Navigator>
  );
};

export default StackNavigator;