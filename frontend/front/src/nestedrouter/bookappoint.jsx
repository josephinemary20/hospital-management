import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Bookappoint() {
    const [bookappointments, setBookappointments] = useState([]);
    const [doctors, setDoctors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookappointmentsdata, doctorsdata] = await Promise.all([
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
                console.error("Error fetching appointment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Appointments History</h2>
            <table className="table mx-auto" style={{ width: '80%' }}>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Next Appointment</th>
                        <th>Time</th>
                        <th>Doctor Name</th>
                    </tr>
                </thead>
                <tbody>
                    {bookappointments.map(book => (
                        <tr key={book._id}>
                            <td>{book.Patientname}</td>
                            <td>{book.Nextappointment}</td>
                            <td>{book.Time}</td>
                            <td>{book.doctorName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3">
                <Link to={'/patientdashbord'}>GO BACK</Link>
            </div>
        </div>
    );
}
