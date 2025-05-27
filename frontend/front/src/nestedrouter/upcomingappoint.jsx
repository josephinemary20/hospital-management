
import { Link } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"


export default function Upcomingappoint() {
    // appointment
    const [Nextappointment, setNextappointment] = useState('')
    const [Lastappointment, setLastappointment] = useState('')
    const [Time, setTime] = useState('')
    const [Reason, setReason] = useState('')
    const [patient_id, setPatient_id] = useState()
    const [patientlist, setPatientlist] = useState([])
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])

    const createAppoint = () => {
        axiosInstance.post('http://localhost:2000/appoint', { Lastappointment, Nextappointment, Time, Reason, patient_id, doctor_id }).then(res => {

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

    useEffect(() => {
        getdoctor();
        getpatient();

    }, [])

    const Submit = (e) => {
        e.preventDefault()
        createAppoint();
    }
    return <div className="text-center">
        <div className="mt-3">
            <h3>Appointment Form</h3>
        </div>
        <form onSubmit={Submit}>
            <div className="mt-3">
                <label>Nextappointment</label><br />
                <input onChange={e => setNextappointment(e.target.value)} type="Date" value={Nextappointment || ''} />
            </div>
            <div className="mt-3">
                <label>Lastappointment</label><br />
                <input onChange={e => setLastappointment(e.target.value)} type="Date" value={Lastappointment || ''} />
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
                <button onSubmit={Submit}>submit</button>
            </div>
        </form>
        <div className="mt-3">
            <Link to={'/doctordashbord'}>GO BACK</Link>
        </div>

    </div>
}