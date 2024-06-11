import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from './app/screens/Login'
import {NavigationContainer} from '@react-navigation/native'
import {NativeBaseProvider} from 'native-base'
import Home from './app/screens/Home'

const Stack = createStackNavigator()


const App = () => {
  return (
   <NativeBaseProvider>
     <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='login' component={Login} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='home' component={Home} options={{headerShown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
   </NativeBaseProvider>
  )
}

export default App

const styles = StyleSheet.create({})