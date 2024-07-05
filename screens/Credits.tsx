import React, { useState } from 'react';
import {
    Button,
    Text,
    View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'

type CreditsProps = NativeStackScreenProps<RootStackParamList, 'Credits'> 

const Credits = ({navigation}:CreditsProps) => {
    return(
        <View>
            <Button title='Back' onPress={()=>navigation.goBack()}/>
            <Text style={{color:'black', textAlign:'center'}}>what</Text>
        </View>
    )
}

export default Credits;