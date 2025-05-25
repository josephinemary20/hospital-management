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

                // Build patient and doctor maps
                const patientMap = {};
                patientsRes.data.forEach(patient => {
                    patientMap[patient._id] = patient.Patientname;
                });

                const doctorMap = {};
                doctorsRes.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                // Map appointment data
                const mappedAppointments = appointmentsRes.data.map(app => ({
                    ...app,
                    doctorName: doctorMap[app.doctor_id] || "Unknown Doctor",
                    patientName: patientMap[app.patient_id] || "Unknown Patient"
                }));

                // Map prescription data
                const mappedPrescriptions = prescriptionsRes.data.map(pres => ({
                    ...pres,
                    patientName: patientMap[pres.patient_id] || "Unknown Patient"
                }));

                // Set states
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
            <ol>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        {appointment.Lastappointment} -{appointment.Nextappointment} - {appointment.Time} - {appointment.Reason} - {appointment.doctorName} - {appointment.patientName}
                    </li>
                ))}
            </ol>

            <h2 className="mb-4">Prescriptions</h2>
            <ol>
                {prescriptions.map(prescription => (
                    <li key={prescription._id}>
                        {prescription.patientName} - {prescription.Medicine} - {prescription.Dosage}
                    </li>
                ))}
            </ol>

            <Link to="/doctordashbord">GO BACK</Link>
        </div>
    );
}
