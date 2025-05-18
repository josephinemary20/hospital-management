import { useState } from "react";
import axios from "axios";

export default function Doctor() {
    const [doctorname, setDoctorname] = useState('')
    const [doctorid, setDoctorid] = useState('')

    const postdoctor = () => {
        let url = 'http://localhost:6000/doctor_signup';
        let method = 'post';
        axios[method](url, { Doctorname: doctorname, Doctorid: doctorid })
            .then(res => {
                console.log('doctorsignup', res)
            })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        postdoctor();

    };

    return <div>
        <form onSubmit={onSubmit}>
            <div>
                <h3>DOCTOR SIGNUP</h3>
            </div>
            <div className="mt-3">
                <input onChange={e => setDoctorname(e.target.value)} value={doctorname || ''} placeholder="Doctorname" />
            </div>
            <div className="mt-3">
                <input onchange={e => setDoctorid(e.target.value)} value={doctorid || ''} placeholder="Doctorid" />

            </div>
            <div className="mt-3">
                <button type="submit">Submit</button>
            </div>
        </form>

    </div>

}