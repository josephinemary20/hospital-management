import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Allappointment() {
    const [appointments, setAppointments] = useState([]);
    const [bookappointments, setBookappointments] = useState([]);
    const [doctors, setDoctors] = useState({});
    const [patients, setPatients] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appointmentsdata, bookappointmentsdata, doctorsdata, patientsdata] = await Promise.all([
                    axios.get('http://localhost:2000/appoint_get'),
                    axios.get('http://localhost:2000/book_get'),
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

                const fetchedBookAppointments = bookappointmentsdata.data.map(book => ({
                    ...book,
                    doctorName: doctorMap[book.doctor_id] || 'Unknown Doctor',
                }));

                setAppointments(fetchedAppointments);
                setBookappointments(fetchedBookAppointments);
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Doctor Upcoming Appointments</h2>
            <table className="table table-bordered mx-auto" style={{ width: "90%" }}>
                <thead className="table-success">
                    <tr>
                        <th>Next Appointment</th>
                        <th>Last Appointment</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Doctor Name</th>
                        <th>Patient Name</th>
                    </tr>
                </thead>
                <tbody className="table-active">
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

            <h2 className="mb-3 mt-5">Patient Booking Appointments History</h2>
            <table className="table table-bordered mx-auto" style={{ width: "80%" }}>
                <thead className="table-primary">
                    <tr>
                        <th>Patient Name</th>
                        <th>Next Appointment</th>
                        <th>Time</th>
                        <th>Doctor Name</th>
                    </tr>
                </thead>
                <tbody className="table-warning">
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

            <Link to="/admindashbord">GO BACK</Link>
        </div>
    );
}
