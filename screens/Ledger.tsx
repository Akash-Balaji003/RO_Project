import React, { useState } from 'react';
import {
    Alert,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

type LedgerProps = NativeStackScreenProps<RootStackParamList, 'Ledger'> 

const Ledger = ({navigation}:LedgerProps) => {
    function onPressButton(text: string) {
        Alert.alert('You tapped ' + text);
      }
    return(
        <SafeAreaView style={styles.bg1}>
            <View style={styles.mainScreen}>
                <ScrollView>
                    <View style={styles.btn_container}>
                        <TouchableOpacity style={styles.cardviewBtnReset} onPress={()=>onPressButton("Reset")}>
                            <Text style={styles.BtnText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardviewBtnEdit} onPress={()=>onPressButton("Edit")}>
                            <Text style={styles.BtnText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardviewBtnSubmit} onPress={()=>onPressButton("Submit")}>
                            <Text style={styles.BtnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.navbarFooter}>
                    <View style={styles.footerItemHolder}>

                        <TouchableOpacity style={{flex:0.7}} onPress={()=>navigation.navigate("Home")}>
                            <Octicons name='home' size={30} color={'black'} style={{marginLeft:5}}/>
                            <Text style={styles.Bottom}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1.2}} onPress={()=>navigation.navigate("Payroll")} >
                            <MaterialCommunityIcons name='notebook-edit-outline' size={30} color={'black'} style={{marginLeft:20}}/>
                            <Text style={styles.Bottom}>Attendance</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:0.9}} onPress={()=>navigation.navigate("SalAdv")}>
                            <FontAwesome5 name='coins' size={30} color={'black'} style={{marginLeft:9}}/>
                            <Text style={styles.Bottom}>Sal. Adv</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:0.95}} onPress={()=>navigation.navigate("SalCalc")}>
                            <SimpleLineIcons name='calculator' size={30} color={'black'} style={{marginLeft:9}} />
                            <Text style={styles.Bottom}>Sal. Calc</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:0.95}} onPress={()=>navigation.navigate("Ledger")}>
                            <SimpleLineIcons name='notebook' size={30} color={'black'} style={{marginLeft:5}} />
                            <Text style={styles.Bottom}>Ledger</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 21,
    },
    cardviewBtnReset: {
        backgroundColor: 'red',
        borderRadius: 10,
        height: 40,
        width: 100,
        elevation: 8,
    },
    cardviewBtnEdit: {
        backgroundColor: 'orange',
        borderRadius: 10,
        height: 40,
        width: 100,
        elevation: 8,
    },
    cardviewBtnSubmit: {
        backgroundColor: 'green',
        borderRadius: 10,
        height: 40,
        width: 100,
        elevation: 8,
    },
    BtnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff',
        paddingTop: 8,
    },
    Emp_card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 6,
        height: 90,
        width: 330,
        padding: 10,
        gap: 15,
        marginTop: 8,
    },
    btn_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 12,
        marginTop: 8,
        marginLeft: 16,
        width: 329,
        marginBottom: 8,
    },
    list_container: {
        margin: 15,
        marginTop: 8,
        gap: 10,
        backgroundColor: '#D7FCF1',
        width: 360,
        height: 'auto',
    },
    Emp_image_style: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    Emp_name_style: {
        color: 'black',
        alignContent: 'center',
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    Emp_id_style: {
        color: '#6E6E6E',
        alignContent: 'center',
        fontFamily: 'Poppins',
        fontSize: 16,
    },
    bg1: {
        backgroundColor: '#D7FCF1',
        width: 360,
    },
  
    footerItemHolder:{
        flexDirection: 'row',
        justifyContent:'space-around',
        width: 360,
        gap:20,
        margin:8,
    },
    
    Bottom: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'poppins',
    },
      
    navbarFooter:{
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 360,
        height: 203,
        elevation:8,
    },
    mainScreen:{
        width: 360,
        height: 800
    },
});

export default Ledger;