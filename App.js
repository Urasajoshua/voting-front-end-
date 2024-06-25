import { StyleSheet, Text, View,useColorScheme } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from './app/screens/Login'
import {NavigationContainer,DefaultTheme,DarkTheme,useTheme} from '@react-navigation/native'
import {NativeBaseProvider} from 'native-base'
import Home from './app/screens/Home'
import Level from './app/screens/Level'
import ElectionDetails from './app/screens/ElectionDetails'
import PositionsScreen from './app/screens/PositionsScreen'

const Stack = createStackNavigator()


const App = () => {
  
  return (
   <NativeBaseProvider>
     <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='login' component={Login} options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='home' component={Home} options={{headerShown:false}}/>
      <Stack.Screen name='level' component={Level} options={{headerShown:false}}/>
      <Stack.Screen name="ElectionDetails" component={ElectionDetails} options={{headerShown:false}} />
      <Stack.Screen name="PositionsScreen" component={PositionsScreen} options={{headerShown:false}} />
    </Stack.Navigator>
    </NavigationContainer>
   </NativeBaseProvider>
  )
}

export default App

const styles = StyleSheet.create({})