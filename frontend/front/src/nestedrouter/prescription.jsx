import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Prescription() {
    const [lastPrescription, setLastPrescription] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prescriptionResponse, patientResponse] = await Promise.all([
                    axios.get("http://localhost:2000/pres_get"),
                    axios.get("http://localhost:2000/patient_get"),
                ]);

                const prescriptions = prescriptionResponse.data;
                const patients = patientResponse.data;

                if (prescriptions.length === 0) {
                    setLastPrescription(null);
                    return;
                }

                // Create a map of patient IDs to patient names
                const patientMap = {};
                patients.forEach((patient) => {
                    patientMap[patient._id] = patient.Patientname;
                });

                // Get the most recent prescription
                const latestPrescription = prescriptions[prescriptions.length - 1];
                latestPrescription.patientName =
                    patientMap[latestPrescription.patient_id] || "Unknown Patient";

                setLastPrescription(latestPrescription);
            } catch (error) {
                console.error("Error fetching prescription data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-4">Latest Prescription</h2>
            {lastPrescription ? (
                <table
                    className="table table-bordered mx-auto"
                    style={{ width: "80%", marginTop: "20px" }}
                >
                    <thead className="table-danger">
                        <tr>
                            <th>Patient Name</th>
                            <th>Medicine</th>
                            <th>Dosage</th>
                        </tr>
                    </thead>
                    <tbody className="table-info">
                        <tr>
                            <td>{lastPrescription.patientName}</td>
                            <td>{lastPrescription.Medicine}</td>
                            <td>{lastPrescription.Dosage}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No prescription data available.</p>
            )}
            <Link to="/doctordashbord">GO BACK</Link>
        </div>
    );
}
