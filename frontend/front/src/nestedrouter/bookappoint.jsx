import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Bookappoint() {
    const [bookappointments, setBookappointments] = useState([]);
    const [doctors, setDoctors] = useState({});
    const [patients, setPatients] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {

                const [bookappointmentsdata, doctorsdata, patientsdata] = await Promise.all([
                    axios.get('http://localhost:2000/book_get'),
                    axios.get('http://localhost:2000/doctor_get'),
                    axios.get('http://localhost:2000/patient_get')

                ]);


                const doctorMap = {};
                doctorsdata.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const patientMap = {};
                patientsdata.data.forEach(patient => {
                    patientMap[patient._id] = patient.Patientname;
                });




                const fetchedAppointments = bookappointmentsdata.data.map(appointment => ({
                    ...appointment,
                    doctorName: doctorMap[appointment.doctor_id] || 'Unknown Doctor',
                    patientName: patientMap[appointment.patient_id] || 'Unknown Patient'

                }));

                setBookappointments(fetchedAppointments);
            } catch (error) {
                console.error(" fetching appointment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Appointments History</h2>
            <ol>
                {bookappointments.map(book => (
                    <li key={book._id}>
                        {book.patientName}-{book.Nextappointment}- {book.Time}- {book.doctorName}<br />

                    </li>
                ))}
            </ol>
            <Link to={'/patientdashbord'}>GO BACK</Link>
        </div>
    );
}
