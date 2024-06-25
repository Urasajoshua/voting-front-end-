import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import Vote from './Vote'
import Result from './Result'
import Profile from './Profile'
import {
    FontAwesome,
    MaterialIcons,
    Octicons,
    FontAwesome6,
    FontAwesome5,
    Ionicons,
    Foundation
  } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

const Home = () => {
  return (
   <Tab.Navigator>
    <Tab.Screen name='Home' component={HomeScreen} options={{tabBarActiveTintColor:'#00A313',tabBarLabel:'Home',tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown:false
        }} />
    <Tab.Screen name='Vote' component={Vote} options={{tabBarActiveTintColor:'#00A313',tabBarLabel:'Vote',tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="vote-yea" color={color} size={size} />
          ),
          headerShown:false
        }} />
    <Tab.Screen name='Result' component={Result} options={{tabBarActiveTintColor:'#00A313',tabBarLabel:'Results',tabBarIcon: ({ color, size }) => (
            <Foundation name="results" color={color} size={size} />
          ),
          headerShown:false
        }}/>
    <Tab.Screen name='Profile' component={Profile} options={{tabBarActiveTintColor:'#00A313',tabBarLabel:'Profile',tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}/>
   </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})