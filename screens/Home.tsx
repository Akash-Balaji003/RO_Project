import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Footer1 from '/Users/akashbalaji/RO_Project/Frontend/components/Footer.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'> 


const Home = ({navigation}:HomeProps) => {

    function onPressButton() {
        Alert.alert('You tapped a card!');
      }
    
  return(
        <SafeAreaView style={styles.bg1}>
            <View style={styles.homeScreen}>
                <ScrollView>
                    <View style={styles.verticalContainer}>

                        <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Payroll")} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Payroll</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate("Sales")} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Sales</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        </View>


                        <View style={[styles.rowContainer, {marginTop:15}]}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Credits")} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Credits</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Purchase</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        </View>


                        <View style={[styles.rowContainer, {marginTop:15}]}>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Inventory</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Audit</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        </View>


                        <View style={[styles.rowContainer, {marginTop:15}]}>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Reports</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Docs Upload</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        </View>

                        <View style={[styles.rowContainer, {marginTop:15}]}>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Alert</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Setup</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        </View>

                        <View style={[styles.rowContainer, {marginTop:15}]}>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Help</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressButton} style={styles.cardview}>
                            <Text style={styles.cardTitle}>Help</Text>
                            <Image source={require('/Users/akashbalaji/RO_Project/Frontend/images/wave_L2.png')} resizeMode="cover" style={styles.image} />
                        </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
                <Footer1/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

  Title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    margin: 8,
    fontFamily: 'poppins',

  },

  image: {
    width: 155,
    flex:1,
    borderRadius: 17,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 0,
  },

cardTitle:{
  textAlign: 'center',
  justifyContent: 'center',
  color: 'black',
  fontFamily: 'poppins',
  fontSize: 19,
  gap: 10,
  marginTop: 12,
},

cardview:{
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 17,
    elevation: 8
},

verticalContainer:{
  display: 'flex',
  width: 318,
  height: 870,
  backgroundColor: '#D7FCF1',
  marginTop: 15,
  marginLeft: 21
},

rowContainer:{
  flexDirection: 'row',
  height: 129,
  width:318,
  gap: 9,
  justifyContent: 'center',
},

  homeScreen:{
    width: 360,
    height: 800
  },

  navbarHeader:{
    flexDirection: 'row',
    backgroundColor: '#D7FCF1',
    width: 360,
    height: 80,
    elevation: 8,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  bg1: {
    backgroundColor: '#D7FCF1'
  }
});

export default Home;
