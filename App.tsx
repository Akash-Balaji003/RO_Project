import React, { useEffect, useState } from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Payroll from '/Users/akashbalaji/RO_Project/Frontend/screens/Payroll.tsx'
import Home from '/Users/akashbalaji/RO_Project/Frontend/screens/Home.tsx';
import Sales from '/Users/akashbalaji/RO_Project/Frontend/screens/Sales.tsx';
import Credits from '/Users/akashbalaji/RO_Project/Frontend/screens/Credits.tsx';

export type RootStackParamList = {
  Sales:undefined;
  Payroll: undefined;
  Home: undefined;
  Credits: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(){

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{title:"Hello P2B Fuels", headerTitleStyle:{fontWeight:"400", fontFamily:"Poppins", fontSize:20}, headerStyle: {
            backgroundColor: '#D7FCF1',
          },}}
        />
        <Stack.Screen
          name='Sales'
          component={Sales}
        />
        <Stack.Screen
          name='Credits'
          component={Credits}
        />
        <Stack.Screen
          name='Payroll'
          component={Payroll}
          options={{title:"Attendance", headerTitleStyle:{color:'orange'}, headerStyle: {
            backgroundColor: '#D7FCF1',
          },}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
