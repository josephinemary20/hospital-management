import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Managepatient() {
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
            <h2 className="mb-3">Manage Patient History</h2>
            <table className="table table-bordered mx-auto" style={{ width: "90%" }}>
                <thead className="table-danger">
                    <tr>
                        <th>Patient Name</th>
                        <th>Last Appointment</th>
                        <th>Reason</th>
                        <th>Next Appointment</th>

                    </tr>
                </thead>
                <tbody className="table-warning">
                    {appointments.map(appointment => (
                        <tr key={appointment._id}>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.Lastappointment}</td>
                            <td>{appointment.Reason}</td>
                            <td>{appointment.Nextappointment}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/admindashbord'}>GO BACK</Link>
        </div>
    );
}
