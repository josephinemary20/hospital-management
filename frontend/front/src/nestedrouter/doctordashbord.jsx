import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"

export default function Doctordashbord() {

    const [Date, setDate] = useState()
    const [Time, setTime] = useState('')
    const [Reason, setReason] = useState('')
    const [patient_id, setPatient_id] = useState()
    const [patientlist, setPatientlist] = useState([])
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])

    const createAppoint = () => {
        axiosInstance.post('http://localhost:2000/appoint', { Date, Time, Reason, patient_id, doctor_id }).then(res => {

        })

    }
    const getdoctor = () => {
        axios.get('http://localhost:2000/doctor_get')
            .then(res => {
                setDoctorlist(res?.data)
            })
    }
    const getpatient = () => {
        axios.get('http://localhost:2000/patient_get')
            .then(res => {
                setPatientlist(res?.data)
            })

    }

    const Submit = e => {
        e.preventDefault()
        createAppoint();
    }

    useEffect(() => {
        getdoctor();
        getpatient();

    }, [])




    let navigate = useNavigate();
    const logout = async () => {
        localStorage.clear()
        navigate('/')
    }

    return <div className="text-center">

        <form onSubmit={Submit}>
            <div className="mt-3">
                <input onChange={e => setDate(e.target.value)} type="Date" value={Date || ''} />
            </div>
            <div className="mt-3">
                <input onChange={e => setTime(e.target.value)} value={Time || ''} placeholder="Time" />
            </div>
            <div className="mt-3">
                <input onChange={e => setReason(e.target.value)} value={Reason || ''} placeholder="Reason" />
            </div>

            <div className="mt-3">
                <select onChange={e => setPatient_id(e.target.value)} value={patient_id}  >
                    <option>select patientname</option>

                    {
                        patientlist.map((patient) => <option key={patient._id} value={patient._id}>{patient.Patientname}</option>)
                    }

                </select>
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
            <Link to={'/appointment'} >VIEW UPCOMING APPOINTMENT</Link>
        </div>
        <div className="mt-3">
            <Link>ADD PRESCRIPTION TO PATIENT</Link>
        </div>
        <div className="mt-3">
            <Link>VIEW PATIENT HISTORY</Link>
        </div>
        <div className="mt-3">
            <button className=" btn bg-danger" onClick={logout}>LOGOUT</button>
        </div>

    </div>
}