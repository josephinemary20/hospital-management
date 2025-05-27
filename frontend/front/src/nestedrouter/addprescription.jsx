import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"
import { Link } from "react-router-dom"

export default function Addprescription() {

    const PresClick = () => {
        alert(" Patient prescription Added.");
    };

    // prescription
    const [Medicine, setMedicine] = useState('')
    const [Dosage, setDosage] = useState('')
    const [patient_id, setPatient_id] = useState()
    const [patientlist, setPatientlist] = useState([])

    const createPres = () => {
        axiosInstance.post('http://localhost:2000/pres', { Medicine, Dosage, patient_id }).then(res => {

        })
    }

    const getpatient = () => {
        axios.get('http://localhost:2000/patient_get')
            .then(res => {
                setPatientlist(res?.data)
            })

    }

    const Submitpres = e => {
        e.preventDefault()
        createPres();
    }

    useEffect(() => {
        getpatient();
    }, [])

    return <div className="text-center">
        <div className="mt-3">
            <h3>Prescription from</h3>
        </div>
        <form onSubmit={Submitpres}>
            <div className="mt-3">
                <select onChange={e => setPatient_id(e.target.value)} value={patient_id}  >
                    <option>select patientname</option>

                    {
                        patientlist.map((patient) => <option key={patient._id} value={patient._id}>{patient.Patientname}</option>)
                    }

                </select>
            </div>
            <div className="mt-3">
                <input onChange={e => setMedicine(e.target.value)} value={Medicine || ''} placeholder="Medicine" />
            </div>
            <div className="mt-3">
                <input onChange={e => setDosage(e.target.value)} value={Dosage || ''} placeholder="Dosage" />
            </div>

            <div className="mt-3">
                <button onClick={PresClick}>submit</button>
            </div>
            <div className="mt-3">
                <Link to={'/doctordashbord'}>GO BACK</Link>
            </div>


        </form>

    </div>

}