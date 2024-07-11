import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Left } from 'react-native-component-separator';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { useDate2 } from '../components/DateContext2';
import { format } from 'date-fns';

type SalCalcProps = NativeStackScreenProps<RootStackParamList, 'SalCalc'> 

type ItemType = {
    label: string;
    value: string;
};

const SalCalc = ({navigation}:SalCalcProps) => {

    const { date2 } = useDate2();
    const formattedDate = format(date2, 'MM');

    const [value, setValue] = useState<string | null>(null);
    const [dropdownData, setDropdownData] = useState<ItemType[]>([]);
    const [selectCom, setselectCom] = useState<string | undefined>();
    const [number, onChangeNumber] = React.useState('');
    const [Recnumber, onChangeRecNumber] = React.useState('');
    const [text, onChangeText] = React.useState('');
    const [due, setDue] = useState<number | undefined>(undefined);
    const selectedEmployee = dropdownData.find((item) => item.value === value);


    function onPressButton(text: string) {
        Alert.alert('You tapped ' + text);
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://hchjn6x7-8000.inc1.devtunnels.ms/get-data');
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

    useEffect(() => {
        const fetchDataDues = async () => {
            if (!selectedEmployee) return;
            try {
                const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/get-due?data=${selectedEmployee.value}`); // Replace with your actual API URL
                const data = await response.json();
                console.log('Parsed data (Emp_due):', data);
    
                // Check if data is an array and has at least one object
                if (Array.isArray(data) && data.length > 0) {
                    // Access the first object in the array (assuming only one object is returned)
                    const parsedBody = JSON.parse(data[0].body);
    
                    // Extract dues value
                    const dueAmount = parseFloat(parsedBody.dues);
                    if (isNaN(dueAmount)) {
                        throw new Error('Invalid due amount received from server');
                    }
    
                    // Update state with fetched due
                    setDue(dueAmount);
                } else {
                    throw new Error('Invalid response format');
                }
    
            } catch (error) {
                console.error('Error fetching dues:', error);
                Alert.alert('Error', 'Failed to fetch dues. Try again later.');
            }
        };
    
        fetchDataDues();
    }, [selectedEmployee]);

    /*
    useEffect(() => {
        const fetchDataAtt = async () => {
            if (!selectedEmployee) return;
            try {
                const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/get-att-sal?data=${selectedEmployee.value}&data2=${formattedDate}`); // Replace with your actual API URL
                const data = await response.json();
                console.log('Parsed data (Emp_due):', data);
    
            } catch (error) {
                console.error('Error fetching dues:', error);
                Alert.alert('Error', 'Failed to fetch dues. Try again later.');
            }
        };
    
        fetchDataAtt();
    }, [selectedEmployee]);
    */

    const Comments: RadioButtonProps[] = useMemo(() => ([
        {
            id: 'Cash', // acts as primary key, should be unique and non-empty string
            label: 'Cash',
            value: 'option1'
        },
        {
        id: 'Online', // acts as primary key, should be unique and non-empty string
        label: 'Online',
        value: 'option2'
        }
    ]), []);
  

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
                        <View style={{flexDirection:'row', width:300, height:30, gap:10}}>
                            <Text style={{color:'black', fontSize:20, width:170, paddingTop:2}}>Mode of payment</Text>
                            <Text style={{color:'black', fontSize:20, width:120, paddingTop:2}}>Days Worked</Text>
                        </View>
                        <View style={{flexDirection:'row', width:300, height:30, gap:62}}>
                            <RadioGroup 
                                radioButtons={Comments} 
                                onPress={setselectCom}
                                selectedId={selectCom}
                                containerStyle={{flexDirection: 'row', gap:-15, alignItems:'flex-start', marginLeft:-10}}
                                labelStyle={styles.label}
                            />
                            <Text style={{color:'#616161', fontSize:20, width:30, borderWidth:1, borderRadius:8, height:35, textAlign:'center', textAlignVertical:'center', marginTop:-5}}>{formattedDate}</Text>
                        </View>
                        <Left borderColor="#e0e0e0" color="#616161">Credits</Left>
                        <View style={styles.Cred_deb}>
                            <View style={styles.rowEntry}>
                                <Text style={styles.displayText}>Basic</Text>
                                <Text style={styles.displayArea}>00.00</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:123}]}>
                                <Text style={styles.displayText}>DA</Text>
                                <Text style={styles.displayArea}>00.00</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:4}]}>
                                <Text style={[styles.displayText]}>No Leave Bonus</Text>
                                <Text style={[styles.displayArea ]}>00.00</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:100}]}>
                                <Text style={styles.displayText}>BATA</Text>
                                <Text style={styles.displayArea}>00.00</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:39}]}>
                                <Text style={[styles.displayText,{color:'black'}]}>Other Bonus</Text>
                                <TextInput
                                style={{color:'Black', height: 30, width:150, borderBlockColor:'grey', borderRadius:5, borderWidth:1, fontSize:18, paddingBottom:1}}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholderTextColor='black'
                                textAlign='right'
                                placeholder="1000"
                                keyboardType="numeric"
                            />
                            </View>
                            <View style={[styles.rowEntry,{gap:42}]}>
                                <Text style={styles.displayText}>Total Salary</Text>
                                <Text style={styles.displayArea}>00.00</Text>
                            </View>
                        </View>
                        <Left borderColor="#e0e0e0" color="#616161">Deductions</Left>
                        <View style={styles.Cred_deb}>
                            <View style={[styles.rowEntry,{gap:1}]}>
                                <Text style={[styles.displayText,{fontSize:16.5, textAlignVertical:'center'}]}>BATA (Already paid)</Text>
                                <Text style={styles.displayArea}>00.00</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:68}]}>
                                <Text style={[styles.displayText,{color:'black'}]}>Recovery</Text>
                                <TextInput
                                    style={{color:'Black', height: 30, width:150, borderBlockColor:'grey', borderRadius:5, borderWidth:1, fontSize:18, paddingBottom:1}}
                                    onChangeText={onChangeRecNumber}
                                    value={Recnumber}
                                    placeholderTextColor='black'
                                    textAlign='right'
                                    placeholder="1000"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={[styles.rowEntry,{gap:1}]}>
                                <Text style={[styles.displayText,{fontSize:20, textAlignVertical:'center'}]}>Salary to be paid</Text>
                                <Text style={styles.displayArea}>00.00</Text>
                            </View>
                            <View style={[styles.rowEntry,{alignSelf:'center'}]}>
                                <Text style={[styles.displayText,{textAlign:'center', paddingLeft:0, fontSize:18}]}>*Dues from employee Rs.{due}</Text>
                            </View>
                            <TextInput
                            style={{color: 'black',
                            height: 120,
                            width: 300,
                            borderColor: 'grey',
                            borderRadius: 5,
                            borderWidth: 1,
                            fontSize: 16,
                            marginTop:10,
                            paddingLeft: 10}}
                            onChangeText={onChangeText}
                            value={text}
                            placeholderTextColor='grey'
                            textAlign='left'
                            placeholder="P2B FUELS SALARY.."
                        />
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
        height: 870,
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
    label: {
        marginRight:-5,
        color: 'black',
        fontSize:14
    },
    Cred_deb:{
        width:300,
        height:270,
        gap:15
    },
    displayArea:{
        color:'#616161',
        fontSize:20,
        paddingRight:5,
        borderWidth:1,
        borderRadius:5,
        width:150,
        textAlign:'right',
        textAlignVertical:'bottom'
    },
    displayText:{
        color:'#616161',
        fontSize:20,
        paddingLeft:5
        
    },
    rowEntry:{
        flexDirection:'row', 
        height:30, 
        justifyContent:'flex-end', 
        gap:100
    }
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