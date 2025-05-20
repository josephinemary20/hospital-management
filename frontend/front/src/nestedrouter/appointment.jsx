import { useState } from "react"
import axios from 'axios'

export default function Appointment() {
    const [Date, setDate] = useState('')
    const [Time, setTime] = useState('')
    const [Reason, setReason] = useState('')
    const [patient_id, setPatient_id] = useState('')
    const [doctor_id, setDoctor_id] = useState('')

    const createAppoint = () => {
        axios.post('http://localhost:2000/appoint', { Date, Time, Reason, patient_id, doctor_id })
            .then(res => {
            })

    }

    const Submit = e => {
        e.preventDefault()
        createAppoint();
    }



    return <div className="text-center">
        <form onSubmit={Submit}>
            <div className="mt-3">
                <input onChange={e => setDate(e.target.value)} value={Date || ''} placeholder="Date" />
            </div>
            <div className="mt-3">
                <input onChange={e => setTime(e.target.value)} value={Time || ''} placeholder="Time" />
            </div>
            <div className="mt-3">
                <input onChange={e => setReason(e.target.value)} value={Reason || ''} placeholder="Reason" />
            </div>
            <div className="mt-3">
                <select onChange={e => setPatient_id(e.target.value)} value={patient_id}  >
                    <option>select patientid</option>

                </select>
            </div>
            <div className="mt-3">
                <select onChange={e => setPatient_id(e.target.value)} value={patient_id}  >
                    <option>select patientname</option>

                </select>
            </div>

            <div className="mt-3">
                <select onChange={e => setDoctor_id(e.target.value)} value={doctor_id} >
                    <option>select doctorname</option>

                </select>
            </div>
            <div className="mt-3">
                <button>submit</button>
            </div>
        </form>

    </div>
}