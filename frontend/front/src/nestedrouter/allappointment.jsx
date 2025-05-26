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
            <h5>NextAppointment  LastAppointment  Time  Reason  DoctorName PatientName</h5>
            <ol>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        {appointment.Nextappointment}  {appointment.Lastappointment}  {appointment.Time}  {appointment.Reason}  {appointment.doctorName}  {appointment.patientName}
                    </li>
                ))}
            </ol>

            <h2 className="mb-3 mt-5">Patient Booking Appointments History</h2>
            <h5>PatientName  NextAppointment Time  DoctorName</h5>
            <ol>
                {bookappointments.map(book => (
                    <li key={book._id}>
                        {book.Patientname}  {book.Nextappointment}  {book.Time}  {book.doctorName}
                    </li>
                ))}
            </ol>

            <Link to={'/admindashbord'}>GO BACK</Link>
        </div>
    );
}
