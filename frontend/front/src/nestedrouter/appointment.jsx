import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Appointment() {
    const [appointments, setAppointments] = useState([]);

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
            <table className="table table-bordered mx-auto" style={{ width: '90%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Next Appointment</th>
                        <th>Last Appointment</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Doctor Name</th>
                        <th>Patient Name</th>
                    </tr>
                </thead>
                <tbody>
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
