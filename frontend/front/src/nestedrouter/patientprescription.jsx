import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Patientprescription() {
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
                console.error("Error fetching prescription data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-4">Prescriptions</h2>
            <table className="table table-bordered mx-auto" style={{ width: "80%" }}>
                <thead className="table-danger">
                    <tr>
                        <th>Patient Name</th>
                        <th>Medicine</th>
                        <th>Dosage</th>
                    </tr>
                </thead>
                <tbody className="table-success">
                    {prescriptions.map(prescription => (
                        <tr key={prescription._id}>
                            <td>{prescription.patientName}</td>
                            <td>{prescription.Medicine}</td>
                            <td>{prescription.Dosage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/patientdashbord">GO BACK</Link>
        </div>
    );
}
