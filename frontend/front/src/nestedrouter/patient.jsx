import { useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosinstance/axiosinstance";


export default function Patient() {
    const [Patientname, setPatientname] = useState('')
    const [Patientid, setPatientid] = useState('')

    const patientsignup = () => {
        axios.post('http://localhost:2000/patient_signup', { Patientname, Patientid }).then(res => {
            console.log('patientsignup', res)
        })
    }

    const patientLogin = () => {
        axios.post('http://localhost:2000/patient_login', { Patientname, Patientid })
            .then(res => {
                axiosInstance.defaults.headers['token'] = res.data?.token

                localStorage.setItem('token', res.data?.token)
            })
    }



    return <div className=" text-center">
        <form>
            <div >
                <h3>PATIENT SIGNUP</h3>
            </div>
            <div className="mt-3">
                <input onChange={e => setPatientname(e.target.value)} value={Patientname || ''} placeholder="Patientname" />
            </div>
            <div className="mt-3">
                <input onChange={e => setPatientid(e.target.value)} value={Patientid || ''} placeholder="Patientid" />
            </div>
            <div className="mt-3">
                <button onClick={patientsignup} >SIGNUP</button>
            </div>
            <div className="mt-3">
                <button onClick={patientLogin}>LOGIN</button>
            </div>

        </form>

    </div>

}