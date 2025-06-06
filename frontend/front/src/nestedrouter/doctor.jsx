import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance/axiosinstance";
import '../../src/nestedrouter/style.css'

export default function Doctor() {
    const [Doctorname, setDoctorname] = useState('')
    const [Doctorid, setDoctorid] = useState('')

    let navigate = useNavigate();

    const doctorsignup = () => {
        axios.post('http://localhost:2000/doctor_signup', { Doctorname, Doctorid }).then(res => {
            console.log('doctorsignup', res)

        })
    }


    const doctorLogin = () => {
        axios.post('http://localhost:2000/doctor_login', { Doctorname, Doctorid })
            .then(res => {
                navigate('/doctordashbord')
                axiosInstance.defaults.headers['token'] = res.data?.token
                localStorage.setItem('doctortoken', res.data?.token)

            })
    }



    return <div className="text-center" class="doctor">
        <form >
            <div className="text-center">
                <div >
                    <h3>DOCTOR SIGNUP</h3>
                </div>
                <div className="mt-3">
                    <input onChange={e => setDoctorname(e.target.value)} value={Doctorname || ''} placeholder="Doctorname" required />
                </div>
                <div className="mt-3">
                    <input onChange={e => setDoctorid(e.target.value)} value={Doctorid || ''} placeholder="Doctorid" required />

                </div>

                <div className="mt-3">
                    <button onClick={doctorsignup}>SIGNIN</button>
                </div>
                <div className="mt-3">
                    <button onClick={doctorLogin} >LOGIN</button>
                </div>
            </div>
        </form>

    </div>

}