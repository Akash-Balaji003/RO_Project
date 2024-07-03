import React from 'react';


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
            <Text style={{color:'black', textAlign:'center'}}>Hiii</Text>
            <Button title='Back' onPress={()=>navigation.goBack()}/>
        </View>
    )
}

export default Credits;