import React from 'react';


import {
    Button,
    Text,
    View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'

type SalesProps = NativeStackScreenProps<RootStackParamList, 'Sales'> 

const Sales = ({navigation}:SalesProps) => {

    return(
        <View>
            <Text style={{color:'black', textAlign:'center'}}>Pid:</Text>
            <Text style={{color:'black', textAlign:'center'}}>HI</Text>
            <Button title='Home' onPress={()=>navigation.navigate("Home")}/>
        </View>
    )
}

export default Sales;