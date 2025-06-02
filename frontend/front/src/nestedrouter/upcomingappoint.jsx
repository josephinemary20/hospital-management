
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"
import '../../src/nestedrouter/style.css'



export default function Upcomingappoint() {
    // appointment
    const [Nextappointment, setNextappointment] = useState('')
    const [Lastappointment, setLastappointment] = useState('')
    const [Time, setTime] = useState('')
    const [Reason, setReason] = useState('')
    const [patient_id, setPatient_id] = useState()
    const [patientlist, setPatientlist] = useState([])


    let navigate = useNavigate();


    const createAppoint = () => {
        axiosInstance.post('http://localhost:2000/appoint', { Lastappointment, Nextappointment, Time, Reason, patient_id }).then(res => {

        })

    }

    const getpatient = () => {
        axios.get('http://localhost:2000/patient_get')
            .then(res => {
                setPatientlist(res?.data)
            })

    }

    useEffect(() => {
        getpatient();

    }, [])

    const Submit = (e) => {
        e.preventDefault()
        createAppoint();
    }

    return <div className="text-center" class="doctorappointment">
        <div className="text-center">
            <div >
                <h3 className="text-primary">Appointment Form</h3>
            </div>


            <form onSubmit={Submit}>
                <div className="mt-3">
                    <label className="text-info">Nextappointment</label><br />
                    <input onChange={e => setNextappointment(e.target.value)} type="Date" value={Nextappointment || ''} required />
                </div>
                <div className="mt-3">
                    <label className="text-info">Lastappointment</label><br />
                    <input onChange={e => setLastappointment(e.target.value)} type="Date" value={Lastappointment || ''} required />
                </div>
                <div className="mt-3">
                    <input onChange={e => setTime(e.target.value)} value={Time || ''} placeholder="Time" required />
                </div>
                <div className="mt-3">
                    <input onChange={e => setReason(e.target.value)} value={Reason || ''} placeholder="Reason" required />
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
                    <button onSubmit={Submit} onClick={() => navigate('/appointment')} >submit</button>
                </div>
            </form>
            <div className="mt-3">
                <Link to={'/doctordashbord'}>GO BACK</Link>
            </div>
        </div>

    </div>
}