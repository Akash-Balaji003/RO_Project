
import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';

type SalAdvProps = NativeStackScreenProps<RootStackParamList, 'SalAdv'> 

type ItemType = {
    label: string;
    value: string;
};


const SalAdv = ({navigation}:SalAdvProps) => {
    function onPressButton(text: string) {
        Alert.alert('You tapped ' + text);
      }

    const [dropdownData, setDropdownData] = useState<ItemType[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [number, onChangeNumber] = React.useState('');

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


    const radioButtons = useMemo(() => ([
      {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: 'Advance',
          value: 'option1'
      },
      {
          id: '2',
          label: 'Recovery',
          value: 'option2'
      }
    ]), []);

    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [selectedIdMOP, setSelectedIdMOP] = useState<string | undefined>();
    const [selectCom, setselectCom] = useState<string | undefined>();
    const [text, onChangeText] = React.useState('');



    const MOPBtns: RadioButtonProps[] = useMemo(() => ([
      {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: 'Cash',
          value: 'option1'
      },
      {
        id: '2', // acts as primary key, should be unique and non-empty string
        label: 'Gpay',
        value: 'option2'
      },
      {
          id: '3',
          label: 'PayTM',
          value: 'option3'
      }
  ]), []);

  const MOPBtns2: RadioButtonProps[] = useMemo(() => ([
    {
        id: '4', // acts as primary key, should be unique and non-empty string
        label: 'NEFT',
        value: 'option4'
    },
    {
      id: '5', // acts as primary key, should be unique and non-empty string
      label: 'Cheque',
      value: 'option5'
    }
]), []);

  const Comments: RadioButtonProps[] = useMemo(() => ([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Salary Advance',
        value: 'option1'
    },
    {
      id: '2', // acts as primary key, should be unique and non-empty string
      label: 'Shortage',
      value: 'option2'
    },
    {
      id: '3', // acts as primary key, should be unique and non-empty string
      label: 'Others',
      value: 'option3'
    }
  ]), []);



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
                        <View style={{flexDirection:'row', width:300, height:75, gap:10}}>
                            <View style={styles.container}>
                              <RadioGroup
                                radioButtons={radioButtons}
                                onPress={setSelectedId}
                                selectedId={selectedId}
                                containerStyle={styles.radioContainer}
                                labelStyle={styles.label}
                              />
                            </View>
                            <TextInput
                                style={{color:'orange', height: 30, width:150, borderBlockColor:'grey', borderRadius:5, borderWidth:1, fontSize:18, paddingBottom:1, marginTop:20}}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholderTextColor='orange'
                                textAlign='right'
                                placeholder="1000"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{width:300, height:115}}>
                          <Text style={{color:'black', fontSize:18, textAlign:'left'}}>Mode of Payment</Text>
                          <View style={{flexDirection: 'column', gap:10}}>
                            <RadioGroup 
                                  radioButtons={MOPBtns} 
                                  onPress={setSelectedIdMOP}
                                  selectedId={selectedIdMOP}
                                  containerStyle={{flexDirection: 'row', alignItems:'flex-start'}}
                                  labelStyle={styles.label}
                            />
                            <RadioGroup 
                                  radioButtons={MOPBtns2} 
                                  onPress={setSelectedIdMOP}
                                  selectedId={selectedIdMOP}
                                  containerStyle={{flexDirection: 'row', alignItems:'flex-start'}}
                                  labelStyle={styles.label}
                            />
                          </View>
                        </View>
                        <View style={{width:300, height:140}}>
                          <Text style={{color:'black', fontSize:18, textAlign:'left'}}>Comments</Text>
                          <View style={{flexDirection: 'row', gap:10}}>
                            <RadioGroup 
                                  radioButtons={Comments} 
                                  onPress={setselectCom}
                                  selectedId={selectCom}
                                  containerStyle={{flexDirection: 'column', gap:8, alignItems:'flex-start'}}
                                  labelStyle={styles.label}
                            />
                          </View>
                        </View>
                        <TextInput
                              style={{color: 'black',
                                height: 80,
                                width: 300,
                                borderColor: 'grey',
                                borderRadius: 5,
                                borderWidth: 1,
                                fontSize: 16,
                                marginTop: 10,
                                paddingLeft: 10}}
                              onChangeText={onChangeText}
                              value={text}
                              placeholderTextColor='black'
                              textAlign='left'
                              placeholder="Type..."
                        />
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
        padding: 7,
        gap: 5,
        marginTop: 8,
        marginLeft:15
    },
    btn_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 12,
        marginTop: 8,
        marginLeft: 15,
        width: 329,
        marginBottom: 8,
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
    container: {
      justifyContent: 'flex-start',
      height:60,
      width: 140
    },
    radioContainer: {
      flexDirection: 'column',
      width: 140
      // Default is row, change to column if needed
    },
    label: {
      marginRight:20,
      color: 'black',
      fontSize:14 // Add some margin to the right of the label
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
    color:'black',
    height: 40,
    fontSize: 16,
  },
});

export default SalAdv;
