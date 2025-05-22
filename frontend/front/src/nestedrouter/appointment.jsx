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
                console.error(" fetching appointment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Appointments</h2>
            <ol>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        {appointment.Date}- {appointment.Time}-{appointment.Reason}- {appointment.doctorName}-{appointment.patientName}<br />

                    </li>
                ))}
            </ol>
            <Link to={'/doctordashbord'}>GO BACK</Link>
        </div>
    );
}
