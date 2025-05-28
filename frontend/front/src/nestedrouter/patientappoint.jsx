import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"
import '../../src/nestedrouter/style.css'

export default function Patientappoint() {
    // book appointment
    const [Nextappointment, setNextappointment] = useState('')
    const [Time, setTime] = useState('')
    const [Patientname, setPatientname] = useState('')
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])

    const Click = () => {
        alert(" Your appointment successfully Register.");
    };


    const Bookappoint = () => {
        axiosInstance.post('http://localhost:2000/book', { Nextappointment, Time, doctor_id, Patientname }).then(res => {
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


    return <div className="text-center" class="bookappointment">
        <div className="text-center">
            <div >
                <h3> PATIENT BOOKING APPOINTMENT FORM</h3>
            </div>
            <form onSubmit={Submit}>
                <div className="mt-3">
                    <input onChange={e => setPatientname(e.target.value)} value={Patientname || ''} placeholder="Patientname" />
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
                    <button onClick={Click}>submit</button>
                </div>
                <div className="mt-3">
                    <Link to={'/patientdashbord'}>GO BACK</Link>
                </div>
            </form>

        </div>


    </div>
}