import { useState } from "react";
import axios from "axios";

export default function Doctor() {
    const [Doctorname, setDoctorname] = useState('')
    const [Doctorid, setDoctorid] = useState('')

    const postdoctor = () => {
        axios.post('http://localhost:2000/doctor_signup', { Doctorname, Doctorid }).then(res => {
            console.log('doctorsignup', res)
        })
    }


    const onsubmit = e => {
        e.preventDefault();
        postdoctor();

    };

    return <div>
        <form onSubmit={onsubmit}>
            <div>
                <h3>DOCTOR SIGNUP</h3>
            </div>
            <div className="mt-3">
                <input onChange={e => setDoctorname(e.target.value)} value={Doctorname || ''} placeholder="Doctorname" />
            </div>
            <div className="mt-3">
                <input onChange={e => setDoctorid(e.target.value)} value={Doctorid || ''} placeholder="Doctorid" />

            </div>
            <div className="mt-3">
                <button>Submit</button>
            </div>
        </form>

    </div>

}