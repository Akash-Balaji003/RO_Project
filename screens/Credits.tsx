import React, { useState } from 'react';
import { format } from 'date-fns';


import {
    Button,
    Text,
    View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {RootStackParamList} from '../App'
import DatePicker from 'react-native-date-picker';

type CreditsProps = NativeStackScreenProps<RootStackParamList, 'Credits'> 

const Credits = ({navigation}:CreditsProps) => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const formattedDate = format(date, 'dd MMMM yyyy');



    return(
        <View>
            
            <Button title='Back' onPress={()=>navigation.goBack()}/>
            <Text style={{color:'black', textAlign:'center'}}>what</Text>
            <Button title={formattedDate} onPress={() => setOpen(true)} />
            <DatePicker
                modal
                mode='date'
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
            
            
        </View>
    )
}

export default Credits;