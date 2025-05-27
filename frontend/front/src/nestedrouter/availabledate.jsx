import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Availabledate() {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [slotsRes, doctorsRes] = await Promise.all([
                    axios.get("http://localhost:2000/slot_get"),
                    axios.get("http://localhost:2000/doctor_get"),
                ]);

                const doctorMap = {};
                doctorsRes.data.forEach((doctor) => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const fetchedAvailabledate = slotsRes.data.map((slot) => ({
                    ...slot,
                    doctorName: doctorMap[slot.doctor_id] || "Unknown Doctor",
                }));

                setSlots(fetchedAvailabledate);
            } catch (error) {
                console.error("Error fetching slot data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h1 className="mb-4">Doctor Available Dates</h1>
            <table className="table table-bordered mx-auto w-auto">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Available Date</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map((slot) => (
                        <tr key={slot._id}>
                            <td>{slot.doctorName}</td>
                            <td>{slot.Availabledate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/appointmentdashbord">GO BACK</Link>
        </div>
    );
}
