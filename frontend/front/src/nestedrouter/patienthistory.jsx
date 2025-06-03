import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Patienthistory() {
    const [latestAppointment, setLatestAppointment] = useState(null);
    const [latestPrescription, setLatestPrescription] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const [appointmentsRes, prescriptionsRes, patientsRes] = await Promise.all([
                    axios.get("http://localhost:2000/appoint_get"),
                    axios.get("http://localhost:2000/pres_get"),
                    axios.get("http://localhost:2000/patient_get"),
                ]);

                const appointments = appointmentsRes.data;
                const prescriptions = prescriptionsRes.data;
                const patients = patientsRes.data;


                const patientMap = {};
                patients.forEach((patient) => {
                    patientMap[patient._id] = patient.Patientname;
                });


                if (appointments.length > 0) {
                    const latestApp = appointments[appointments.length - 1];
                    latestApp.patientName = patientMap[latestApp.patient_id] || "Unknown Patient";
                    setLatestAppointment(latestApp);
                }


                if (prescriptions.length > 0) {
                    const latestPres = prescriptions[prescriptions.length - 1];
                    latestPres.patientName = patientMap[latestPres.patient_id] || "Unknown Patient";
                    setLatestPrescription(latestPres);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-4">Upcoming Appointment & Prescription</h2>

            {latestAppointment ? (
                <div className="mb-5">
                    <h4>upcoming Appointment</h4>
                    <table className="table table-bordered mx-auto" style={{ width: "80%", marginTop: "20px" }}>
                        <thead className="table-primary">
                            <tr>
                                <th>Next Appointment</th>
                                <th>Last Appointment</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Patient Name</th>
                            </tr>
                        </thead>
                        <tbody className="table-success">
                            <tr>
                                <td>{latestAppointment.Nextappointment}</td>
                                <td>{latestAppointment.Lastappointment}</td>
                                <td>{latestAppointment.Time}</td>
                                <td>{latestAppointment.Reason}</td>
                                <td>{latestAppointment.patientName}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No appointment data available.</p>
            )}

            {latestPrescription ? (
                <div className="mb-5">
                    <h4> Prescription</h4>
                    <table className="table table-bordered mx-auto" style={{ width: "80%", marginTop: "20px" }}>
                        <thead className="table-danger">
                            <tr>
                                <th>Patient Name</th>
                                <th>Medicine</th>
                                <th>Dosage</th>
                            </tr>
                        </thead>
                        <tbody className="table-info">
                            <tr>
                                <td>{latestPrescription.patientName}</td>
                                <td>{latestPrescription.Medicine}</td>
                                <td>{latestPrescription.Dosage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No prescription data available.</p>
            )}

            <Link to="/doctordashbord">GO BACK</Link>
        </div>
    );
}
