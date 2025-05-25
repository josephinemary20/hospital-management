import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"

export default function Patientdashbord() {

    // book appointment
    const [Nextappointment, setNextappointment] = useState('')
    const [Time, setTime] = useState('')
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])
    const [patient_id, setPatient_id] = useState()
    const [patientlist, setPatientlist] = useState([])


    const Bookappoint = () => {
        axiosInstance.post('http://localhost:2000/book', { Nextappointment, Time, doctor_id, patient_id }).then(res => {
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
        Bookappoint();
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
        <div className="mt-3">
            <h1>BOOK APPOINTMENT</h1>
        </div>
        <form onSubmit={Submit}>
            <div className="mt-3">
                <select onChange={e => setPatient_id(e.target.value)} value={patient_id} >
                    <option>select patientname</option>

                    {
                        patientlist?.map((patient) => <option key={patient._id} value={patient._id}>{patient.Patientname}</option>)
                    }

                </select>
            </div>
            <div className="mt-3">
                <label>Nextappointment</label><br />
                <input onChange={e => setNextappointment(e.target.value)} type="Date" value={Nextappointment || ''} />
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
            <Link to={'/payment'}>PAY BILLS</Link>
        </div>
        <div className="mt-3">
            <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
        </div>
    </div>
}