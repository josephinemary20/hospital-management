import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Bookappoint() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {

                const [appointmentsdata, doctorsdata] = await Promise.all([
                    axios.get('http://localhost:2000/appoint_get'),
                    axios.get('http://localhost:2000/doctor_get'),

                ]);


                const doctorMap = {};
                doctorsdata.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });




                const fetchedAppointments = appointmentsdata.data.map(appointment => ({
                    ...appointment,
                    doctorName: doctorMap[appointment.doctor_id] || 'Unknown Doctor',

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
                        {appointment.Date}- {appointment.Time}- {appointment.doctorName}<br />

                    </li>
                ))}
            </ol>
            <Link to={'/patientdashbord'}>GO BACK</Link>
        </div>
    );
}
