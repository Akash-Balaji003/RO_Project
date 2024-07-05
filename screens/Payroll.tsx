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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDate } from '../components/DateContext';
import { format } from 'date-fns';


type PayrollProps = NativeStackScreenProps<RootStackParamList, 'Payroll'>;

type Employee = {
    emp_id: number;
    Company_id: number;
    emp_name: string;
    imageUrl: any;
    iconAM: string;
    iconPM: string;
    tickColor: string;
    crossColor: string;
};

const Payroll = ({ navigation }: PayrollProps) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true); // Loader state
    const { date } = useDate();
    const formattedDate = format(date, 'yyyy-MM-dd');


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
            const employeeData = data.map((emp: { emp_id: number; emp_name: string }) => ({
                emp_id: emp.emp_id,
                Company_id: 101, // Assuming the same Company_id for all
                emp_name: emp.emp_name,
                imageUrl: require('/Users/akashbalaji/RO_Project/Frontend/images/test1.jpeg'),
                iconAM: 'square',
                iconPM: 'square',
                tickColor: 'grey',
                crossColor: 'grey',
            }));
            setEmployees(employeeData);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                Alert.alert(`Attendance for ${formattedDate} has not been updated`)
            } else {
                const employeeData = data.map((emp: { emp_id: number; emp_name: string, iconAM: string, iconPM: string, tickColor: string, crossColor: string }) => ({
                    emp_id: emp.emp_id,
                    Company_id: 101,
                    emp_name: emp.emp_name,
                    imageUrl: require('/Users/akashbalaji/RO_Project/Frontend/images/test1.jpeg'),
                    iconAM: emp.iconAM || 'square',
                    iconPM: emp.iconPM || 'square',
                    tickColor: emp.tickColor || 'grey',
                    crossColor: emp.crossColor || 'grey',
                }));
                setEmployees(employeeData);
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            Alert.alert('Error', 'Error fetching attendance data');
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
                tickColor: 'grey',
                crossColor: 'grey',
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
            iconAM: emp.iconAM,
            iconPM: emp.iconPM,
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
                    ? {
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
                    ? {
                          ...emp,
                          tickColor: emp.tickColor === 'grey' ? 'green' : 'grey',
                          crossColor: 'grey',
                          iconAM: emp.tickColor === 'grey' ? 'check-square' : 'square',
                          iconPM: emp.tickColor === 'grey' ? 'check-square' : 'square',
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
                          crossColor: emp.crossColor === 'grey' ? 'red' : 'grey',
                          tickColor: emp.crossColor === 'grey' ? 'grey' : emp.tickColor,
                          iconAM: emp.crossColor === 'grey' ? 'square' : emp.iconAM,
                          iconPM: emp.crossColor === 'grey' ? 'square' : emp.iconPM,
                      }
                    : emp
            )
        );
    };

    return (
        <SafeAreaView style={styles.bg1}>
            {loading ? ( // Display loader while fetching data
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView>
                    <View style={styles.list_container}>
                        {employees.map(({ emp_id, emp_name, iconAM, iconPM, tickColor, crossColor, imageUrl }) => (
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
                                <View style={{ gap: 5, marginLeft: 65 }}>
                                    <View style={{ marginLeft: 3, flexDirection: 'row', gap: 17, alignSelf: 'flex-start' }}>
                                        <TouchableOpacity onPress={() => toggleTickColor(emp_id)}>
                                            <FontAwesome name='check' size={28} color={tickColor} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => toggleCrossColor(emp_id)}>
                                            <FontAwesome name='remove' size={28} color={crossColor} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 8 }}>
                                        <View style={{ marginLeft: 2, flexDirection: 'row', gap: 15, alignSelf: 'flex-start' }}>
                                            <TouchableOpacity onPress={() => toggleIconAM(emp_id)}>
                                                <Feather name={iconAM} size={28} color="#000" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => toggleIconPM(emp_id)}>
                                                <Feather name={iconPM} size={28} color="#000" />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginLeft: 5, flexDirection: 'row', gap: 22 }}>
                                            <Text style={{ color: 'black' }}>AM</Text>
                                            <Text style={{ color: 'black' }}>PM</Text>
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
        gap: 15,
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
        width: 360,
    },
});

export default Payroll;