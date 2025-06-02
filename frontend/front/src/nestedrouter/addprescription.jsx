import { useState, useEffect } from "react";
import axios from 'axios';
import axiosInstance from "../axiosinstance/axiosinstance";
import { Link, useNavigate } from "react-router-dom";
import '../../src/nestedrouter/style.css';

export default function Addprescription() {
    const [Medicine, setMedicine] = useState('');
    const [Dosage, setDosage] = useState('');
    const [patient_id, setPatient_id] = useState('');
    const [patientlist, setPatientlist] = useState([]);

    const navigate = useNavigate();

    const createPres = async () => {
        try {
            await axiosInstance.post('http://localhost:2000/pres', { Medicine, Dosage, patient_id });
            navigate('/prescription');
        } catch (error) {
            console.error('Error creating prescription:', error);
            // Optionally, display an error message to the user
        }
    };

    const getpatient = async () => {
        try {
            const res = await axios.get('http://localhost:2000/patient_get');
            setPatientlist(res.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
            // Optionally, display an error message to the user
        }
    };

    const Submitpres = (e) => {
        e.preventDefault();
        createPres();
    };

    useEffect(() => {
        getpatient();
    }, []);

    return (
        <div className="addprescription">
            <div className="text-center">
                <h3>Prescription Form</h3>
                <form onSubmit={Submitpres}>
                    <div className="mt-3">
                        <select onChange={e => setPatient_id(e.target.value)} value={patient_id} required>
                            <option value="">Select patient name</option>
                            {patientlist.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.Patientname}
                                </option>))}
                        </select>
                    </div>
                    <div className="mt-3">
                        <input type="text" onChange={e => setMedicine(e.target.value)} value={Medicine} placeholder="Medicine" required />
                    </div>
                    <div className="mt-3">
                        <input type="text" onChange={e => setDosage(e.target.value)} value={Dosage} placeholder="Dosage" require />
                    </div>
                    <div className="mt-3">
                        <button type="submit">Submit</button>
                    </div>
                    <div className="mt-3">
                        <Link to="/doctordashbord">Go Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

