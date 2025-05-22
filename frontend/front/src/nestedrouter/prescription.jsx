import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Prescription() {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prescriptiondetails, patientsdetails] = await Promise.all([
                    axios.get('http://localhost:2000/pres_get'),
                    axios.get('http://localhost:2000/patient_get'),
                ]);

                const patientMap = {};
                patientsdetails.data.forEach(patient => {
                    patientMap[patient._id] = patient.Patientname;
                });

                const fetchedPrescription = prescriptiondetails.data.map(prescription => ({
                    ...prescription,
                    patientName: patientMap[prescription.patient_id] || 'Unknown Patient',
                }));

                setPrescriptions(fetchedPrescription);
            } catch (error) {
                console.error(" fetching prescription data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <ol>
                {prescriptions.map(prescription => (
                    <li key={prescription._id}>
                        {prescription.patientName}-{prescription.Medicine} -{prescription.Dosage} <br />
                    </li>
                ))}
            </ol>
            <Link to={'/doctordashbord'}>GO BACK</Link>
        </div>
    );
}
