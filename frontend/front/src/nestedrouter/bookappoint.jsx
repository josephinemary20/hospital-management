import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Bookappoint() {
    const [lastAppointment, setLastAppointment] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [appointmentsResponse, doctorsResponse] = await Promise.all([
                    axios.get("http://localhost:2000/book_get"),
                    axios.get("http://localhost:2000/doctor_get"),
                ]);

                const appointments = appointmentsResponse.data;
                const doctors = doctorsResponse.data;

                if (appointments.length === 0) {
                    setLastAppointment(null);
                    return;
                }

                const doctorMap = {};
                doctors.forEach((doctor) => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const lastAppointment = appointments[appointments.length - 1];
                lastAppointment.doctorName =
                    doctorMap[lastAppointment.doctor_id] || "Unknown Doctor";

                setLastAppointment(lastAppointment);
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center" >
            <h2 >Conform Patient Appointment</h2>
            {lastAppointment ? (
                <table className="table mx-auto" style={{ width: "80%" }}>
                    <thead className="table-danger">
                        <tr>
                            <th>Patient Name</th>
                            <th>Next Appointment</th>
                            <th>Time</th>
                            <th>Doctor Name</th>
                        </tr>
                    </thead>
                    <tbody className="table-primary">
                        <tr>
                            <td>{lastAppointment.Patientname}</td>
                            <td>{lastAppointment.Nextappointment}</td>
                            <td>{lastAppointment.Time}</td>
                            <td>{lastAppointment.doctorName}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No appointment data available.</p>
            )}
            <div className="mt-3">
                <Link to="/patientdashbord">GO BACK</Link>
            </div>
        </div>
    );
}
