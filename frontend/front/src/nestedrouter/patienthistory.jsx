import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Patienthistory() {
    const [patienthistory, setPatienthistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    prescriptions,
                    appointments,
                    doctors,
                    patientsList
                ] = await Promise.all([
                    axios.get('http://localhost:2000/pres_get'),
                    axios.get('http://localhost:2000/appoint_get'),
                    axios.get('http://localhost:2000/doctor_get'),
                    axios.get('http://localhost:2000/patient_get'),
                ]);

                const doctorMap = {};
                doctors.data.forEach(doctor => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const patientMap = {};
                patientsList.data.forEach(patient => {
                    patientMap[patient._id] = patient.Patientname;
                });

                const fetchedPatienthistory = prescriptions.data.map(history => ({
                    ...history,
                    doctorName: doctorMap[history.doctor_id] || 'Unknown Doctor',
                    patientName: patientMap[history.patient_id] || 'Unknown Patient',
                }));

                setPatienthistory(fetchedPatienthistory);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center p-4">
            <h2 className="mb-4">Patient History</h2>
            <ol>
                {patienthistory.map(history => (
                    <li key={history._id}>
                        {history.Date} - {history.Reason} - {history.doctorName} - {history.patientName} - {history.Medicine} - {history.Dosage}
                    </li>
                ))}
            </ol>
            <Link to="/doctordashboard">GO BACK</Link>
        </div>
    );
}
