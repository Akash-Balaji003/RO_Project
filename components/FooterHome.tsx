import React from 'react';


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

export default function FooterHome(){

    function onPressButton(text: string) {
        Alert.alert('You tapped ' + text);
      }
      
    return(
        <View style={styles.navbarFooter}>
            <View style={styles.footerItemHolder}>

                <TouchableOpacity style={styles.footerItem} onPress={()=>onPressButton("Home")}>
                    <Octicons name='home' size={30} color={'black'} style={{marginLeft:8}}/>
                    <Text style={styles.Bottom}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem} onPress={()=>onPressButton("Other")} >
                    <Entypo name='news' size={30} color={'black'} style={{marginLeft:4}}/>
                    <Text style={styles.Bottom}>Other</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem} onPress={()=>onPressButton("Settings")}>
                    <Feather name='settings' size={30} color={'black'} style={{marginLeft:12}}/>
                    <Text style={styles.Bottom}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem} onPress={()=>onPressButton("Account")}>
                    <Feather name='user' size={30} color={'black'} style={{marginLeft:12}} />
                    <Text style={styles.Bottom}>Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  
    footerItem:{
        flex:1,
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
        fontSize: 16,
        fontFamily: 'poppins',
    },
    
    navbarFooter:{
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 360,
        height: 203,
        elevation:8,
    }
});