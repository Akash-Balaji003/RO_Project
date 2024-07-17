import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDate } from '../components/AttendanceDate';
import { format } from 'date-fns';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



type PayrollProps = NativeStackScreenProps<RootStackParamList, 'Payroll'>;

type Employee = {
    emp_id: number;
    Company_id: number;
    emp_name: string;
    imageUrl: any;
    DA_Percentage: number,
    No_Leave_Bonus: number,
    Shift_Type: string,
    Basic_Per_Day: number,
    Basic_Per_Month: number,
    BATA: number,
    NLB_Threshold: number


    iconAM: string;
    iconPM: string;
    iconAM_OT: string;
    iconPM_OT: string; 
    tickColor: string;
    crossColor: string;
    iconsVisible: boolean;
    OTiconsVisible: boolean;
};

const Payroll = ({ navigation }: PayrollProps) => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true); // Loader state
    const { date } = useDate();
    const formattedDate = format(date, 'yyyy-MM-dd');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('https://hchjn6x7-8000.inc1.devtunnels.ms/get-data');
            const dataString = await response.json();
            console.log('Fetched data string:', dataString); // Debug log
            const data = JSON.parse(dataString[0]);
            console.log('Parsed data:', data); // Debug log
            const employeeData = data.map((emp: { emp_id: number; emp_name: string; DA_Percentage: number,
                No_Leave_Bonus: number;
                Shift_Type: string;
                Basic_Per_Day: number;
                Basic_Per_Month: number;
                BATA: number;
                NLB_Threshold: number }) => ({

                emp_id: emp.emp_id,
                Company_id: 101,
                emp_name: emp.emp_name,

                DA_Percentage: emp.DA_Percentage,
                No_Leave_Bonus: emp.No_Leave_Bonus,
                Shift_Type: emp.Shift_Type,
                Basic_Per_Day: emp.Basic_Per_Day,
                Basic_Per_Month: emp.Basic_Per_Month,
                BATA: emp.BATA,
                NLB_Threshold: emp.NLB_Threshold,

                imageUrl: require('/Users/akashbalaji/RO_Project/Frontend/images/test1.jpeg'),
                iconAM: 'square',
                iconPM: 'square',
                iconAM_OT: 'square',
                iconPM_OT: 'square',
                tickColor: 'grey',
                crossColor: '#FF6969',
                iconsVisible: false,
                OTiconsVisible: false,
            }));
            setEmployees(employeeData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Try again later.');
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    const fetchAttendanceData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/get-att-data?date=${formattedDate}`);
            const data = await response.json();

            if (data.length === 0) {
                fetchEmployees();
                Alert.alert('Error',`Attendance for ${formattedDate} is not available`)
            } else {
                const employeeData = data.map((emp: { emp_id: number; emp_name: string, iconAM: string, iconPM: string, iconAM_OT: string, iconPM_OT: string, tickColor: string, crossColor: string }) => ({
                    emp_id: emp.emp_id,
                    Company_id: 101,
                    emp_name: emp.emp_name,
                    imageUrl: require('/Users/akashbalaji/RO_Project/Frontend/images/test1.jpeg'),
                    iconAM: emp.iconAM || 'square',
                    iconPM: emp.iconPM || 'square',
                    iconAM_OT: emp.iconAM_OT, // New
                    iconPM_OT:emp.iconPM_OT,
                    tickColor: emp.tickColor || 'grey',
                    crossColor: emp.crossColor || '#FF6969',
                    iconsVisible: emp.iconAM === 'check-square' || emp.iconPM === 'check-square',
                    OTiconsVisible: emp.iconAM_OT === 'check-square' || emp.iconPM_OT === 'check-square',
                }));
                setEmployees(employeeData);
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            Alert.alert('Error', 'Error fetching attendance data');
            setError('Error fetching attendance data. Try again later.');
        } finally {
            setLoading(false);
        }
    };


    const resetEmployees = () => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp => ({
                ...emp,
                iconAM: 'square',
                iconPM: 'square',
                iconAM_OT: 'square', // New
                iconPM_OT: 'square',
                tickColor: 'grey',
                crossColor: '#FF6969',
                iconsVisible: false,
                OTiconsVisible: false, // New
            }))
        );
    };

    const checkAttendanceExists = async () => {
        try {
            const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/check-att-data?date=${formattedDate}`);
            const data = await response.json();
            return data.exists; // Assuming the endpoint returns a JSON object with an 'exists' boolean field
        } catch (error) {
            console.error('Error checking attendance data:', error);
            return false;
        }
    };
    
    const submitData = async () => {
        const currentDate = new Date().toISOString().split('T')[0];

        const employeeData = employees.map(emp => ({
            Emp_id: emp.emp_id,
            Emp_name: emp.emp_name,
            attendance_date: formattedDate,
            submitted_date: currentDate,
            Company_id: emp.Company_id,
            Basic_Per_Day: emp.Basic_Per_Day,
            Basic_Per_Month: emp.Basic_Per_Month,
            BATA: emp.BATA,
            DA_Percentage: emp.DA_Percentage,
            No_Leave_Bonus: emp.No_Leave_Bonus,
            Shift_Type: emp.Shift_Type,
            NLB_Threshold: emp.NLB_Threshold,
            iconAM: emp.iconAM,
            iconPM: emp.iconPM,
            iconAM_OT: emp.iconAM_OT, // New
            iconPM_OT: emp.iconPM_OT,
        }));
    
        try {
            const attendanceExists = await checkAttendanceExists();
    
            const endpoint = attendanceExists ? 'update' : 'submit';
            const method = attendanceExists ? 'PUT' : 'POST';
            
            const response = await fetch(`https://hchjn6x7-8000.inc1.devtunnels.ms/${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });
    
            if (response.ok) {
                const json = await response.json();
                console.log('Response from server:', json);
                Alert.alert('Success', `Attendance ${attendanceExists ? 'updated' : 'submitted'} successfully`);
                resetEmployees(); // Reset the employees list to the initial state
            } else {
                throw new Error(`Failed to ${attendanceExists ? 'update' : 'submit'} data`);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert('Error', 'Error updating attendance');
        }
    };

    const toggleIconAM = (Emp_id: number) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.emp_id === Emp_id
                    ? {
                          ...emp,
                          iconAM: emp.iconAM === 'square' ? 'check-square' : 'square',
                          tickColor: emp.iconAM === 'square' || emp.iconPM === 'check-square' ? 'green' : 'grey',
                          crossColor: 'grey',
                      }
                    : emp
            )
        );
    };

    const toggleIconPM = (Emp_id: number) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.emp_id === Emp_id
                        ?{
                            ...emp,
                            iconPM: emp.iconPM === 'square' ? 'check-square' : 'square',
                            tickColor: emp.iconPM === 'square' || emp.iconAM === 'check-square' ? 'green' : 'grey',
                            crossColor: 'grey',
                        }
                    : emp
            )
        );
    };

    const toggleTickColor = (Emp_id: number) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.emp_id === Emp_id
                        ?{
                            ...emp,
                            tickColor: emp.tickColor === 'grey' ? 'green' : 'grey',
                            crossColor: 'grey',
                            iconAM: emp.tickColor === 'grey' ? 'check-square' : 'square',
                            iconPM: emp.tickColor === 'grey' ? 'check-square' : 'square',
                            iconsVisible: !emp.iconsVisible,
                        }
                    : emp
            )
        );
    };

    const toggleCrossColor = (Emp_id: number) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.emp_id === Emp_id
                    ? {
                          ...emp,
                          crossColor: emp.crossColor === 'grey' ? '#FF6969' : 'grey',
                          tickColor: emp.crossColor === 'grey' ? 'grey' : emp.tickColor,
                          iconAM: emp.crossColor === 'grey' ? 'square' : emp.iconAM,
                          iconPM: emp.crossColor === 'grey' ? 'square' : emp.iconPM,
                          iconsVisible: false,
                      }
                    : emp
            )
        );
    };

    const toggleIconAM_OT = (Emp_id: number) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.emp_id === Emp_id
                        ?{
                            ...emp,
                            iconAM_OT: emp.iconAM_OT === 'square' ? 'check-square' : 'square',
                        }
                    : emp
            )
        );
    };

    const toggleIconPM_OT = (Emp_id: number) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.emp_id === Emp_id
                    ? {
                          ...emp,
                          iconPM_OT: emp.iconPM_OT === 'square' ? 'check-square' : 'square',
                      }
                    : emp
            )
        );
    };

    const toggleIcons = (Emp_id: number) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.emp_id === Emp_id
                    ? {
                          ...emp,
                          OTiconsVisible: !emp.OTiconsVisible, // Toggle OT icons visibility
                          iconAM_OT: emp.OTiconsVisible ? 'square' : emp.iconAM_OT,
                          iconPM_OT: emp.OTiconsVisible ? 'square' : emp.iconPM_OT,
                      }
                    : emp
            )
        );
    };

    return (
        <SafeAreaView style={styles.bg1}>
            <View style={styles.mainScreen}>
                <View style={{ flex: 1 }}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : (
                        <ScrollView>
                            <View style={styles.list_container}>
                                {employees.map(({ emp_id, emp_name, iconAM, iconPM, tickColor, crossColor, imageUrl, iconsVisible, OTiconsVisible, iconAM_OT, iconPM_OT }) => (
                                    <View key={emp_id} style={styles.Emp_card}>
                                        <Image
                                            source={require('/Users/akashbalaji/RO_Project/Frontend/images/test1.jpeg')}
                                            style={styles.Emp_image_style}
                                        />
                                        <View style={{ width: 80 }}>
                                            <Text style={styles.Emp_name_style}>{emp_name}</Text>
                                            <View style={{ flexDirection: 'row', gap: 4 }}>
                                                <Text style={styles.Emp_id_style}>Emp_id:</Text>
                                                <Text style={styles.Emp_name_style}>{emp_id}</Text>
                                            </View>
                                        </View>
                                        <View style={[{ gap: 5, marginLeft: 2, alignSelf:"flex-start", marginTop:0}]}>
                                            <TouchableOpacity onPress={() => toggleIcons(emp_id)} style={[{top: OTiconsVisible ? 0 : 30,}, {marginLeft:17}]}>
                                                <View style={[{height:25, width:25, borderRadius:12.5}, {backgroundColor: OTiconsVisible ? "green":"#FF6969"}]}>
                                                    <Text style={{color:'black', textAlign:'center', paddingTop:2.5}}>OT</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={[{ marginLeft: 0, flexDirection: 'row', gap: 5, alignSelf: 'flex-start' }, {top: OTiconsVisible ? 0 : 35,}]}>
                                                <TouchableOpacity onPress={() => toggleIconAM_OT(emp_id)} disabled={!OTiconsVisible}>
                                                    <Feather name={iconAM_OT} size={28} color="#000" style={[OTiconsVisible ? {} : { opacity: 0 }]} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => toggleIconPM_OT(emp_id)} disabled={!OTiconsVisible}>
                                                    <Feather name={iconPM_OT} size={28} color="#000" style={[OTiconsVisible ? {} : { opacity: 0}]} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ gap: 5, marginLeft: 15 }}>
                                            <View style={{ marginLeft: 3, flexDirection: 'row', gap: 5, alignSelf: 'flex-start' }}>
                                                <TouchableOpacity onPress={() => toggleTickColor(emp_id)} style={[{top: iconsVisible ? 0 : 30,}]}>
                                                    <FontAwesome name='check' size={30} color={tickColor} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => toggleCrossColor(emp_id)} style={[{top: iconsVisible ? 0 : 30,}]}>
                                                    <FontAwesome name='remove' size={30} color={crossColor} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[{top: iconsVisible ? 0 : 35,},{}]}>
                                                <View style={{ marginLeft: 2, flexDirection: 'row', gap: 5, alignSelf: 'flex-start' }}>
                                                    <TouchableOpacity onPress={() => toggleIconAM(emp_id)} disabled={!iconsVisible}>
                                                        <Feather name={iconAM} size={28} color="#000" style={[iconsVisible ? {} : { opacity: 0 }]} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => toggleIconPM(emp_id)} disabled={!iconsVisible}>
                                                        <Feather name={iconPM} size={28} color="#000" style={[iconsVisible ? {} : { opacity: 0}]} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ marginLeft: 4, flexDirection: 'row', gap: 14 }}>
                                                    <Text style={[iconsVisible ? {} : { opacity: 0 }, {color:'black'}]}>1st</Text>
                                                    <Text style={[iconsVisible ? {} : { opacity: 0 }, {color:'black'}]}>2nd</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.btn_container}>
                                <TouchableOpacity style={styles.cardviewBtnReset} onPress={resetEmployees}>
                                    <Text style={styles.BtnText}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardviewBtnEdit} onPress={fetchAttendanceData}>
                                    <Text style={styles.BtnText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardviewBtnSubmit} onPress={submitData}>
                                    <Text style={styles.BtnText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </View>
                <View style={styles.navbarFooter}>
                    <View style={styles.footerItemHolder}>
                        <TouchableOpacity style={{ flex: 0.7 }} onPress={() => navigation.navigate("Home")}>
                            <Octicons name='home' size={30} color={'black'} style={{ marginLeft: 5 }} />
                            <Text style={styles.Bottom}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1.2 }} onPress={() => navigation.navigate("Payroll")}>
                            <MaterialCommunityIcons name='notebook-edit-outline' size={30} color={'black'} style={{ marginLeft: 20 }} />
                            <Text style={styles.Bottom}>Attendance</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 0.9 }} onPress={() => navigation.navigate("SalAdv")}>
                            <FontAwesome5 name='coins' size={30} color={'black'} style={{ marginLeft: 9 }} />
                            <Text style={styles.Bottom}>Sal. Adv</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 0.95 }} onPress={() => navigation.navigate("SalCalc")}>
                            <SimpleLineIcons name='calculator' size={30} color={'black'} style={{ marginLeft: 9 }} />
                            <Text style={styles.Bottom}>Sal. Calc</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 0.95 }} onPress={() => navigation.navigate("Ledger")}>
                            <SimpleLineIcons name='notebook' size={30} color={'black'} style={{ marginLeft: 5 }} />
                            <Text style={styles.Bottom}>Ledger</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

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
        gap: 7,
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
        flex: 1,
    },
    footerItemHolder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 360,
        gap: 20,
        margin: 8,
    },
    Bottom: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'poppins',
    },
    navbarFooter: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 360,
        height: 65,
        elevation: 8,
    },
    mainScreen: {
        width: 360,
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
});


export default Payroll;