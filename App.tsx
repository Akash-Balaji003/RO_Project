import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { DateProvider, useDate } from '/Users/akashbalaji/RO_Project/Frontend/components/DateContext.tsx'; // Import useDate

import Payroll from './screens/Payroll';
import Home from './screens/Home';
import Sales from './screens/Sales';
import Credits from './screens/Credits';
import SalAdv from './screens/SalAdv';
import SalCalc from './screens/SalCalc';
import Ledger from './screens/Ledger'

export type RootStackParamList = {
  Sales: undefined;
  Payroll: undefined;
  Home: undefined;
  Credits: undefined;
  SalAdv: undefined;
  SalCalc: undefined;
  Ledger: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [open, setOpen] = useState(false);
  const { date, setDate } = useDate();
  const formattedDate = format(date, 'dd MMMM yyyy');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Hello P2B Fuels",
            headerTitleStyle: { fontWeight: "400", fontFamily: "Poppins", fontSize: 20 },
            headerStyle: {
              backgroundColor: '#D7FCF1',
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Evillcons
                  name="bell"
                  size={35}
                  color="black"
                  style={{ marginRight: 5, paddingTop: 10 }}
                  onPress={() => { /* Add navigation or other actions */ }}
                />
                <Image
                  source={require('./images/test1.jpeg')}
                  style={styles.Image_style}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen name="Sales" component={Sales} />
        <Stack.Screen name="Credits" component={Credits} />
        <Stack.Screen
          name="Payroll"
          component={Payroll}
          options={{
            title: "Attendance",
            headerTitleStyle: { color: 'orange' },
            headerStyle: {
              backgroundColor: '#D7FCF1',
            },
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity style={styles.Btn_card} onPress={() => setOpen(true)}>
                  <Text style={styles.BtnText}>{formattedDate}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen 
          name="SalAdv" 
          component={SalAdv} 
          options={{
            title: "Salary Advance",
            headerTitleStyle: { color: 'orange' },
            headerStyle: {
              backgroundColor: '#D7FCF1',
            }}}
        />
        <Stack.Screen 
          name="SalCalc" 
          component={SalCalc} 
          options={{
            title: "Salary Calculation",
            headerTitleStyle: { color: 'orange' },
            headerStyle: {
              backgroundColor: '#D7FCF1',
            }}}
        />
        <Stack.Screen 
          name="Ledger" 
          component={Ledger} 
          options={{
            title: "Ledger",
            headerTitleStyle: { color: 'orange' },
            headerStyle: {
              backgroundColor: '#D7FCF1',
            }}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  Image_style: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    margin: 5,
  },
  Btn_card: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 30,
    width: 90,
    elevation: 10,
    marginTop: 3,
  },
  BtnText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700',
    color: 'black',
    paddingTop: 6,
  },
});

export default function AppWrapper() {
  return (
    <DateProvider>
      <App />
    </DateProvider>
  );
}
