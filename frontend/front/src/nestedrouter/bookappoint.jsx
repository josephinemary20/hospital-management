import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Bookappoint() {
    const [bookappointments, setBookappointments] = useState([]);
    const [doctors, setDoctors] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            try {

                const [bookappointmentsdata, doctorsdata,] = await Promise.all([
                    axios.get('http://localhost:2000/book_get'),
                    axios.get('http://localhost:2000/doctor_get')

                ]);


                const doctorMap = {};
                doctorsdata.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });




                const fetchedAppointments = bookappointmentsdata.data.map(appointment => ({
                    ...appointment,
                    doctorName: doctorMap[appointment.doctor_id] || 'Unknown Doctor',

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
            <h5> PatientName  NextAppointment  Time  DoctorName  </h5>
            <ol>
                {bookappointments.map(book => (
                    <li key={book._id}>
                        {book.Patientname}{book.Nextappointment}{book.Time}{book.doctorName}<br />

                    </li>
                ))}
            </ol>
            <Link to={'/patientdashbord'}>GO BACK</Link>
        </div>
    );
}
