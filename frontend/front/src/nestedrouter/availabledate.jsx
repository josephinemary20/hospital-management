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

                setSlots(fetchedAvailabledate); // Moved inside try block
            } catch (error) {
                console.error("Error fetching slot data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h1>Doctor Available Dates</h1>
            <ol>
                {slots.map((slot) => (
                    <li key={slot._id}>
                        {slot.doctorName} - {slot.Availabledate}
                    </li>
                ))}
            </ol>
            <Link to="/appointmentdashbord">GO BACK</Link>
        </div>
    );
}
