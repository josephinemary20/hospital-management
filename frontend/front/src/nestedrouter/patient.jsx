import { useState } from "react";
import axios from "axios";

export default function Patient() {
    const [Patientname, setPatientname] = useState('')
    const [Patientid, setPatientid] = useState('')

    const postpatient = () => {
        axios.post('http://localhost:2000/patient_signup', { Patientname, Patientid }).then(res => {
            console.log('patientsignup', res)
        })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        postpatient();

    };

    return <div>
        <form onSubmit={onSubmit}>
            <div>
                <h3>PATIENT SIGNUP</h3>
            </div>
            <div className="mt-3">
                <input onChange={e => setPatientname(e.target.value)} value={Patientname || ''} placeholder="Patientname" />
            </div>
            <div className="mt-3">
                <input onChange={e => setPatientid(e.target.value)} value={Patientid || ''} placeholder="Patientid" />

            </div>
            <div className="mt-3">
                <button type="submit">Submit</button>
            </div>
        </form>

    </div>

}