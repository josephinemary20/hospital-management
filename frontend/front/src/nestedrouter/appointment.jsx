import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState({});
    const [patients, setPatients] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {

                const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
                    axios.get('http://localhost:2000/appoint_get'),
                    axios.get('http://localhost:2000/doctor_get'),
                    axios.get('http://localhost:2000/patient_get'),
                ]);


                const doctorMap = {};
                doctorsRes.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const patientMap = {};
                patientsRes.data.forEach(patient => {
                    patientMap[patient._id] = patient.Patientname;
                });


                const fetchedAppointments = appointmentsRes.data.map(appointment => ({
                    ...appointment,
                    doctorName: doctorMap[appointment.doctor_id] || 'Unknown Doctor',
                    patientName: patientMap[appointment.patient_id] || 'Unknown Patient',
                }));

                setAppointments(fetchedAppointments);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        {appointment.Date} {appointment.Time}-{appointment.Reason}- {appointment.doctorName}-{appointment.patientName}<br />

                    </li>
                ))}
            </ul>
            <Link to={'/doctordashbord'}>GO BACK</Link>
        </div>
    );
}
