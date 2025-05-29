import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Patienthistory() {
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [patientsMap, setPatientsMap] = useState({});
    const [doctorsMap, setDoctorsMap] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    appointmentsRes,
                    prescriptionsRes,
                    patientsRes,
                    doctorsRes
                ] = await Promise.all([
                    axios.get("http://localhost:2000/appoint_get"),
                    axios.get("http://localhost:2000/pres_get"),
                    axios.get("http://localhost:2000/patient_get"),
                    axios.get("http://localhost:2000/doctor_get")
                ]);

                const patientMap = {};
                patientsRes.data.forEach(patient => {
                    patientMap[patient._id] = patient.Patientname;
                });

                const doctorMap = {};
                doctorsRes.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const mappedAppointments = appointmentsRes.data.map(app => ({
                    ...app,
                    doctorName: doctorMap[app.doctor_id] || "Unknown Doctor",
                    patientName: patientMap[app.patient_id] || "Unknown Patient"
                }));

                const mappedPrescriptions = prescriptionsRes.data.map(pres => ({
                    ...pres,
                    patientName: patientMap[pres.patient_id] || "Unknown Patient"
                }));

                setDoctorsMap(doctorMap);
                setPatientsMap(patientMap);
                setAppointments(mappedAppointments);
                setPrescriptions(mappedPrescriptions);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Appointments</h2>
            <table className="table table-bordered mx-auto" style={{ width: '90%', marginTop: '20px' }}>
                <thead className="table-danger">
                    <tr>
                        <th>Last Appointment</th>
                        <th>Next Appointment</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Doctor Name</th>
                        <th>Patient Name</th>
                    </tr>
                </thead>
                <tbody className="table-success">
                    {appointments.map(appointment => (
                        <tr key={appointment._id}>
                            <td>{appointment.Lastappointment}</td>
                            <td>{appointment.Nextappointment}</td>
                            <td>{appointment.Time}</td>
                            <td>{appointment.Reason}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.patientName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="mb-4 mt-5">Prescriptions</h2>
            <table className="table table-bordered mx-auto" style={{ width: '60%' }}>
                <thead className="table-warning">
                    <tr>
                        <th>Patient Name</th>
                        <th>Medicine</th>
                        <th>Dosage</th>
                    </tr>
                </thead>
                <tbody className="table-active">
                    {prescriptions.map(prescription => (
                        <tr key={prescription._id}>
                            <td>{prescription.patientName}</td>
                            <td>{prescription.Medicine}</td>
                            <td>{prescription.Dosage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/doctordashbord">GO BACK</Link>
        </div>
    );
}
