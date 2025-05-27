import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Slot() {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [slotsRes, doctorsRes, departmentsRes] = await Promise.all([
                    axios.get("http://localhost:2000/slot_get"),
                    axios.get("http://localhost:2000/doctor_get"),
                    axios.get("http://localhost:2000/department_get"),
                ]);

                const doctorMap = {};
                doctorsRes.data.forEach((doctor) => {
                    doctorMap[doctor._id] = doctor.Doctorname;
                });

                const departmentMap = {};
                departmentsRes.data.forEach((dept) => {
                    departmentMap[dept._id] = dept.Department;
                });

                const formattedSlots = slotsRes.data.map((slot) => ({
                    ...slot,
                    doctorName: doctorMap[slot.doctor_id] || "Unknown Doctor",
                    departmentName: departmentMap[slot.department_id] || "Unknown Department",
                }));

                setSlots(formattedSlots);
            } catch (error) {
                console.error("Error fetching slot data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Book Appointments</h2>
            <table className="table table-bordered mx-auto" style={{ width: "90%" }}>
                <thead className="thead-dark">
                    <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Doctor Name</th>
                        <th>Department</th>
                        <th>Slot Duration</th>
                        <th>Available Date</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map(slot => (
                        <tr key={slot._id}>
                            <td>{slot.Starttime}</td>
                            <td>{slot.Endtime}</td>
                            <td>{slot.doctorName}</td>
                            <td>{slot.departmentName}</td>
                            <td>{slot.Slotduration}</td>
                            <td>{slot.Availabledate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/appointmentdashbord'}>GO BACK</Link>
        </div>
    );
}
