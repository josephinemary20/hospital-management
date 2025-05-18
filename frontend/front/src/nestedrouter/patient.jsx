import { useState } from "react";
import axios from "axios";

export default function Patient() {
    const [patientname, setPatientname] = useState('')
    const [patientid, setPatientid] = useState('')

    const postpatient = () => {
        let url = 'http://localhost:6000/patient_signup';
        let method = 'post';
        axios[method](url, { Patientname: patientname, Patientid: patientid })
            .then(res => {
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
                <input onChange={e => setPatientname(e.target.value)} value={patientname || ''} placeholder="Patientname" />
            </div>
            <div className="mt-3">
                <input onChange={e => setPatientid(e.target.value)} value={patientid || ''} placeholder="Patientid" />

            </div>
            <div className="mt-3">
                <button type="submit">Submit</button>
            </div>
        </form>

    </div>

}