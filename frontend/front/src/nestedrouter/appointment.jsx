import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

export default function Appointment() {
    const [appointments, setAppointments] = useState([]);



    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontSize: 12,
        },
        table: {
            display: 'table',
            width: 'auto',
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
            marginTop: 10,
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableColHeader: {
            width: '25%',
            borderStyle: 'solid',
            borderColor: 'black',
            borderBottomWidth: 1,
            backgroundColor: '#eee',
            padding: 5,
        },
        tableCol: {
            width: '25%',
            borderStyle: 'solid',
            borderColor: 'black',
            borderBottomWidth: 1,
            padding: 5,
        },
        tableCell: {
            fontSize: 10,
        },
    });

    const MyDocument = ({ data }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text>DOCTOR UPCOMING APPOINTMENTS</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}>PatientName</Text></View>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}>Doctor Name</Text></View>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}>Lastappointment</Text></View>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}>Nextappointment</Text></View>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}> Time</Text></View>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}> Reason</Text></View>

                    </View>
                    <view>
                        {data.map((item, idx) => <View style={styles.tableRow} key={idx}>

                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item?.patient_id?.Patientname}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item?.doctor_id?.Doctorname}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.Lastappointment}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.Nextappointment}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.Time}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.Reason}</Text></View>

                        </View>
                        )}
                    </view>
                </View>
            </Page>
        </Document>
    );

    const GeneratePDF = async (data) => {
        const blob = await pdf(<MyDocument data={data} />).toBlob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'example.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appointmentsdata, doctorsdata, patientsdata] = await Promise.all([
                    axios.get('http://localhost:2000/appoint_get'),
                    axios.get('http://localhost:2000/doctor_get'),
                    axios.get('http://localhost:2000/patient_get'),
                ]);

                const doctorMap = {};
                doctorsdata.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const patientMap = {};
                patientsdata.data.forEach(patient => {
                    patientMap[patient._id] = patient.Patientname;
                });

                const fetchedAppointments = appointmentsdata.data.map(appointment => ({
                    ...appointment,
                    doctorName: doctorMap[appointment.doctor_id] || 'Unknown Doctor',
                    patientName: patientMap[appointment.patient_id] || 'Unknown Patient',
                }));

                setAppointments(fetchedAppointments);
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Appointments</h2>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => { GeneratePDF(appointments) }}>View PDF</button>
            </div>
            <table className="table table-bordered mx-auto " style={{ width: '90%', marginTop: '20px' }}>
                <thead className="table-primary">
                    <tr>
                        <th>Next Appointment</th>
                        <th>Last Appointment</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Doctor Name</th>
                        <th>Patient Name</th>
                    </tr>
                </thead>
                <tbody className="table-success">
                    {appointments.map(appointment => (
                        <tr key={appointment._id}>
                            <td>{appointment.Nextappointment}</td>
                            <td>{appointment.Lastappointment}</td>
                            <td>{appointment.Time}</td>
                            <td>{appointment.Reason}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.patientName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/doctordashbord'}>GO BACK</Link>
        </div>
    );
}
