import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Appointment() {
    const [lastAppointment, setLastAppointment] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appointmentsResponse, patientsResponse] = await Promise.all([
                    axios.get("http://localhost:2000/appoint_get"),
                    axios.get("http://localhost:2000/patient_get"),
                ]);

                const appointments = appointmentsResponse.data;
                const patients = patientsResponse.data;

                if (appointments.length === 0) {
                    setLastAppointment(null);
                    return;
                }

                const patientMap = {};
                patients.forEach((patient) => {
                    patientMap[patient._id] = patient.Patientname;
                });

                // Get the most recent appointment
                const latestAppointment = appointments[appointments.length - 1];
                latestAppointment.patientName =
                    patientMap[latestAppointment.patient_id] || "Unknown Patient";

                setLastAppointment(latestAppointment);
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Upcoming  Appointment</h2>
            {lastAppointment ? (
                <table
                    className="table table-bordered mx-auto"
                    style={{ width: "90%", marginTop: "20px" }}
                >
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
                            <td>{lastAppointment.Nextappointment}</td>
                            <td>{lastAppointment.Lastappointment}</td>
                            <td>{lastAppointment.Time}</td>
                            <td>{lastAppointment.Reason}</td>
                            <td>{lastAppointment.patientName}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No appointment data available.</p>
            )}
            <Link to="/doctordashbord">GO BACK</Link>
        </div>
    );
}
