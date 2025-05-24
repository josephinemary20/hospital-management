import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"

export default function Patientdashbord() {

    // book appointment
    const [Date, setDate] = useState('')
    const [Time, setTime] = useState('')
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])


    const Bookappoint = () => {
        axiosInstance.post('http://localhost:2000/book', { Date, Time, doctor_id }).then(res => {
        })

    }

    const getdoctor = () => {
        axios.get('http://localhost:2000/doctor_get')
            .then(res => {
                setDoctorlist(res?.data)
            })
    }

    const Submit = e => {
        e.preventDefault()
        Bookappoint();
    }

    useEffect(() => {
        getdoctor();
    }, [])

    let navigate = useNavigate();
    const logout = async () => {
        localStorage.clear()
        navigate('/')
    }
    return <div className="text-center">
        <div className="mt-3">
            <h1>BOOK APPOINTMENT</h1>
        </div>
        <form onSubmit={Submit}>
            <div className="mt-3">
                <input onChange={e => setDate(e.target.value)} type="Date" value={Date || ''} />
            </div>
            <div className="mt-3">
                <input onChange={e => setTime(e.target.value)} value={Time || ''} placeholder="Time" />
            </div>


            <div className="mt-3">
                <select onChange={e => setDoctor_id(e.target.value)} value={doctor_id} >
                    <option>select doctorname</option>

                    {
                        doctorlist?.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.Doctorname}</option>)
                    }

                </select>
            </div>
            <div className="mt-3">
                <button>submit</button>
            </div>
        </form>

        <div className="mt-3">
            <Link to={'/bookappoint'}>VIEW APPOINTMENT HISTORY</Link>
        </div>
        <div className="mt-3">
            <Link to={'/patientprescription'}>VIEW PRESCRIPTION</Link>
        </div>
        <div className="mt-3">
            <Link>PAY BILLS</Link>
        </div>
        <div className="mt-3">
            <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
        </div>
    </div>
}