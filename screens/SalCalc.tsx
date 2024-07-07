import React, { useEffect, useState } from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';

type SalCalcProps = NativeStackScreenProps<RootStackParamList, 'SalCalc'> 

type ItemType = {
    label: string;
    value: string;
};

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

const SalCalc = ({navigation}:SalCalcProps) => {

    const [value, setValue] = useState<string | null>(null);
    const [dropdownData, setDropdownData] = useState<ItemType[]>([]);

    function onPressButton(text: string) {
        Alert.alert('You tapped ' + text);
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://hchjn6x7-8000.inc1.devtunnels.ms/get-data'); // Replace with your actual API URL
                const dataString = await response.json();
                const data = JSON.parse(dataString);
                console.log('Parsed data:', data);
                const formattedData = data.map((item: any) => ({
                    label: item.emp_name,
                    value: item.emp_id.toString(),
                }));
                setDropdownData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to fetch data. Try again later.');
            }
        };
  
        fetchData();
    }, []);
  

    const renderItem = (item: ItemType) => {
        return (
          <View style={styles2.item}>
            <Text style={styles2.textItem}>{item.label}</Text>
            {item.value === value && (
              <AntDesign
                style={styles2.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          </View>
        );
    };

    return(
        <SafeAreaView style={styles.bg1}>
            <View style={styles.mainScreen}>
                <ScrollView>
                    <View style={styles.Emp_card}> 
                        <Dropdown
                            style={styles2.dropdown}
                            placeholderStyle={styles2.Emp_nameStyle}
                            selectedTextStyle={styles2.Emp_nameStyle}
                            inputSearchStyle={styles2.inputSearchStyle}
                            iconStyle={styles2.iconStyle}
                            data={dropdownData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select employee"
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={(item: ItemType) => {
                                setValue(item.value);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign style={styles2.icon} color="black" name="Safety" size={20} />
                            )}
                            renderItem={renderItem}
                        />
                        <View style={{flexDirection:'row', width:300, height:50, gap:10}}>
                            <Text style={{color:'black', fontSize:20, width:170, paddingTop:2}}>Mode of payment</Text>
                            <Text style={{color:'black', fontSize:20, width:120, paddingTop:2}}>Days Worked</Text>
                        </View>
                    </View>

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
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 6,
        height: 523,
        width: 330,
        padding: 10,
        gap: 15,
        marginTop: 8,
        marginLeft:15
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

const styles2 = StyleSheet.create({
    dropdown: {
      margin: 5,
      height: 50,
      width:300,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
  
      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      color:'black'
    },
    Emp_nameStyle:{
      fontSize:16,
      color:'black'
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default SalCalc;