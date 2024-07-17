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
import { useDate2 } from '../components/SalCalcDate';
import { format, getDaysInMonth } from 'date-fns';

type SalCalcProps = NativeStackScreenProps<RootStackParamList, 'SalCalc'> 

type ItemType = {
    label: string;
    value: string;
};

const SalCalc = ({navigation}:SalCalcProps) => {

    const { date2 } = useDate2();
    const formattedDate = format(date2, 'yyyy-MM');
    const year = format(date2, 'yyyy');
    const month = format(date2, 'MM');
    const daysInMonth = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1));

    const [value, setValue] = useState<string | null>(null);
    const [dropdownData, setDropdownData] = useState<ItemType[]>([]);
    const [selectCom, setselectCom] = useState<string | undefined>();
    const [OtherBonus, onChangeOtherBonus] = React.useState('');
    const [Recnumber, onChangeRecNumber] = React.useState('');
    const [text, onChangeText] = React.useState('');

    const [due, setDue] = useState<number | undefined>(undefined);
    const [actualDue, setactualDue] = useState<number | undefined>(undefined);
    const [Att, setAtt] = useState<number | undefined>(undefined);
    const [Daily_wage, setDaily_wage] = useState<number | undefined>(undefined);
    const [BasicPerMonth, setBasicPerMonth] = useState<number | undefined>(undefined);
    const [Bata, setBata] = useState<number | undefined>(undefined);
    const [DA_amt, setDA_amt] = useState<number | undefined>(undefined);
    const [NoLeaveBonus, setNoLeaveBonus] = useState<number | undefined>(undefined);
    const [Tot_sal, setTot_sal] =  useState<number | undefined>(undefined);
    const [Sal_to_give, setSal_to_give] =  useState<number | undefined>(undefined);

    const [existingPayroll, setExistingPayroll] = useState<boolean>(false);

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

    useEffect(() => {
        const fetchDataAtt = async () => {
            if (!selectedEmployee) return;
            try {
                const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/get-att-sal?data=${selectedEmployee.value}&data2=${formattedDate}`); // Replace with your actual API URL
                const data = await response.json();
                console.log('salary calc data:', data);

                if (data && data.data && data.data.Total_Daily_Wage != null && data.data.Total_Attendance != null) {
                    console.log('Total Daily Wage:', data.data.Total_Daily_Wage);
                    console.log('Total Attendance:', data.data.Total_Attendance);
                    console.log('Basic_Per_Month:', data.data.Basic_Per_Month);
                    console.log('BATA:', data.data.BATA);
                    console.log('DA_Percentage:', data.data.DA_Percentage);
                    console.log('No_Leave_Bonus:', data.data.No_Leave_Bonus);
                    console.log('NLB_Threshold:', data.data.NLB_Threshold);

                    const BPM_inp = data.data.Basic_Per_Month;
                    const Att_code = data.data.Total_Attendance;
                    const Bata_inp = data.data.BATA;
                    const NLB_inp = data.data.No_Leave_Bonus;
                    const DA_inp = data.data.DA_Percentage;
                    const NLB_Threshold_inp = data.data.NLB_Threshold;

                    if(data.data.Basic_Per_Month != 0){
                        const Wage = ((BPM_inp / daysInMonth)*Att_code) ;
                        setDaily_wage(Math.round(Wage));
                        setDA_amt(Math.round((DA_inp / 100) * Wage));
                    } else{
                        const Wage = data.data.Total_Daily_Wage;
                        setDaily_wage(Math.round(Wage));
                        setDA_amt(Math.round((DA_inp / 100) * Wage));
                    }

                    setAtt(Att_code);
                    setBasicPerMonth(BPM_inp);
                    setBata(Bata_inp);

                    if((Att_code/daysInMonth)*100 >= NLB_Threshold_inp ){
                        setNoLeaveBonus(NLB_inp);
                    } else{
                        setNoLeaveBonus(0);
                    }

                } else {
                    console.error('Received data is not in the expected format:', data);
                    Alert.alert('Error', 'Received data is not in the expected format');
                }

            } catch (error) {
                console.error('Error fetching Att_sal:', error);
                Alert.alert('Error', 'Failed to fetch att_sal. Try again later.');
            }
        };

        fetchDataAtt();
    }, [selectedEmployee, date2]);

    useEffect(() => {
        const otherBonus = parseFloat(OtherBonus) || 0;
        const totalSalary = (NoLeaveBonus || 0) + (Bata || 0) + (DA_amt || 0) + (Daily_wage || 0) + otherBonus;
        setTot_sal(totalSalary);
    }, [NoLeaveBonus, Bata, DA_amt, Daily_wage, OtherBonus]);

    useEffect(() => {
        const recNumber = parseFloat(Recnumber) || 0;
        const endSalary = (Tot_sal || 0) - (Bata || 0) - recNumber;
        setSal_to_give(endSalary);
    }, [Tot_sal, Bata, Recnumber]);

    const submitData = async () => {
        try {
            const currentDate = new Date().toISOString().split('T')[0];
            const calculatedActualDue = Number(due) - (Number(Recnumber) || 0);
            setactualDue(calculatedActualDue);
            console.log('ActualDue:', actualDue)
            const employeeData = {
                Emp_id: Number(selectedEmployee?.value),
                Company_id: 101,
                Debit: 0,
                Credit: Recnumber,
                Description: text ?? "P2B Fuels Salary",
                submitted_date: currentDate,
                MOP: selectCom,
                Txn_date: currentDate,
                actual_due: actualDue ?? 0.0
            };
            const viewData = {
                Emp_id: Number(selectedEmployee?.value),
                Company_id: 101,
                Days_worked: Att,
                Wage: Daily_wage,
                DA_Amount: DA_amt,
                Salary: Sal_to_give,
                No_Leave_Bonus: NoLeaveBonus,
                Recovery: Recnumber,
                OtherBonus: OtherBonus,
                BATA: Bata,
                Description: text ?? "P2B Fuels Salary",
                Salary_date: currentDate,
                MOP: selectCom,
                Due: due ?? 0.0
            };

            const response = await fetch('https://hchjn6x7-8000.inc1.devtunnels.ms/Txn-sal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            const response2 = await fetch('https://hchjn6x7-8000.inc1.devtunnels.ms/Payroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(viewData),
            });

            if (response2.ok && response.ok) {
                const json2 = await response2.json();
                const json = await response.json();
                console.log('Response from server:', json2);
                console.log('Response from server:', json);
                Alert.alert('Success', 'Data submitted successfully');
            } else {
                throw new Error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert('Error', 'Error submitting data');
        }
    };

    const fetchPayrollData = async () => {
        if (!selectedEmployee) return;

        try {
            const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/get-payroll?empId=${selectedEmployee.value}&date=${formattedDate}`);
            const data = await response.json();

            if (data) {
                setExistingPayroll(true);
                setDaily_wage(data.Wage);
                setDA_amt(data.DA_Amount);
                setNoLeaveBonus(data.No_Leave_Bonus);
                setBata(data.BATA);
                onChangeOtherBonus(data.OtherBonus?.toString() || '');
                onChangeRecNumber(data.Recovery?.toString() || '');
                setAtt(data.Days_worked);
                setTot_sal(data.Salary);
                const Salary_to_be_paid = (data.Salary - data.BATA - data.Recovery);
                setSal_to_give(Salary_to_be_paid);
                onChangeText(data.Description || 'P2B Fuels Salary');
                setselectCom(data.MOP);
                setDue(data.Due);
            } else{
                setExistingPayroll(false);
            }
        } catch (error) {
            console.error('Error fetching payroll data:', error);
            Alert.alert('Error', 'Failed to fetch payroll data. Try again later.');
        }
    };

    useEffect(() => {
        fetchPayrollData();
    }, [selectedEmployee, formattedDate]);

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
                            <Text style={{color:'#616161', fontSize:20, width:30, borderWidth:1, borderRadius:8, height:35, textAlign:'center', textAlignVertical:'center', marginTop:-5}}>{Att}</Text>
                        </View>
                        <Left borderColor="#e0e0e0" color="#616161">Credits</Left>
                        <View style={styles.Cred_deb}>
                            <View style={styles.rowEntry}>
                                <Text style={styles.displayText}>Basic</Text>
                                <Text style={styles.displayArea}>{Daily_wage}</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:123}]}>
                                <Text style={styles.displayText}>DA</Text>
                                <Text style={styles.displayArea}>{DA_amt}</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:4}]}>
                                <Text style={[styles.displayText]}>No Leave Bonus</Text>
                                <Text style={[styles.displayArea ]}>{NoLeaveBonus}</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:100}]}>
                                <Text style={styles.displayText}>BATA</Text>
                                <Text style={styles.displayArea}>{Bata}</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:39}]}>
                                <Text style={[styles.displayText,{color:'black'}]}>Other Bonus</Text>
                                <TextInput
                                    style={{color:'black', height: 30, width:150, borderBlockColor:'grey', borderRadius:5, borderWidth:1, fontSize:18, paddingBottom:1}}
                                    onChangeText={onChangeOtherBonus}
                                    value={OtherBonus}
                                    placeholderTextColor='black'
                                    textAlign='right'
                                    placeholder="1000"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={[styles.rowEntry,{gap:42}]}>
                                <Text style={styles.displayText}>Total Salary</Text>
                                <Text style={styles.displayArea}>{Tot_sal}</Text>
                            </View>
                        </View>
                        <Left borderColor="#e0e0e0" color="#616161">Deductions</Left>
                        <View style={styles.Cred_deb}>
                            <View style={[styles.rowEntry,{gap:1}]}>
                                <Text style={[styles.displayText,{fontSize:16.5, textAlignVertical:'center'}]}>BATA (Already paid)</Text>
                                <Text style={styles.displayArea}>{Bata}</Text>
                            </View>
                            <View style={[styles.rowEntry,{gap:68}]}>
                                <Text style={[styles.displayText,{color:'black'}]}>Recovery</Text>
                                <TextInput
                                    style={{color:'black', height: 30, width:150, borderBlockColor:'grey', borderRadius:5, borderWidth:1, fontSize:18, paddingBottom:1}}
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
                                <Text style={styles.displayArea}>{Sal_to_give}</Text>
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
                        <TouchableOpacity style={styles.cardviewBtnSubmit} onPress={submitData}>
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