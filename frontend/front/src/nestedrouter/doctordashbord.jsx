import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import axiosInstance from "../axiosinstance/axiosinstance"

export default function Doctordashbord() {
    // appointment
    const [Date, setDate] = useState('')
    const [Time, setTime] = useState('')
    const [Reason, setReason] = useState('')
    const [patient_id, setPatient_id] = useState()
    const [patientlist, setPatientlist] = useState([])
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])
    // prescription
    const [Medicine, setMedicine] = useState('')
    const [Dosage, setDosage] = useState('')

    // history
    const [appointment_id, setAppointment_id] = useState()
    const [appointmentlist, setAppointmentlist] = useState([])
    const [prescription_id, setPrescription_id] = useState()
    const [prescriptionlist, setPrescriptionlist] = useState([])



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

    const createPres = () => {
        axiosInstance.post('http://localhost:2000/pres', { Medicine, Dosage, patient_id }).then(res => {

        })
    }

    const Submitpres = e => {
        e.preventDefault()
        createPres();
    }

    const createhistory = () => {
        axiosInstance.post('http://localhost:2000/history', { appointment_id, prescription_id }).then(res => {

        })
    }
    const getappointment = () => {
        axios.get('http://localhost:2000/appoint_get')
            .then(res => {
                setAppointmentlist(res?.data)
            })
    }

    const getprescription = () => {
        axios.get('http://localhost:2000/pres_get')
            .then(res => {
                setPrescriptionlist(res?.data)
            })
    }


    const Submithistory = e => {
        e.preventDefault()
        createhistory();
    }

    useEffect(() => {
        getappointment();
        getprescription();

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
        <form onSubmit={Submitpres}>
            <div className="mt-3">
                <select onChange={e => setPatient_id(e.target.value)} value={patient_id}  >
                    <option>select patientname</option>

                    {
                        patientlist.map((patient) => <option key={patient._id} value={patient._id}>{patient.Patientname}</option>)
                    }

                </select>
            </div>
            <div className="mt-3">
                <input onChange={e => setMedicine(e.target.value)} value={Medicine || ''} placeholder="Medicine" />
            </div>
            <div className="mt-3">
                <input onChange={e => setDosage(e.target.value)} value={Dosage || ''} placeholder="Dosage" />
            </div>

            <div className="mt-3">
                <button>submit</button>
            </div>


        </form>
        <div className="mt-3">
            <Link to={'/prescription'}>ADD PRESCRIPTION TO PATIENT</Link>
        </div>
        <form onSubmit={Submithistory}>
            <div className="mt-3">
                <select onChange={e => setPatient_id(e.target.value)} value={patient_id}  >
                    <option>select patientname</option>

                    {
                        patientlist.map((patient) => <option key={patient._id} value={patient._id}>{patient.Patientname}</option>)
                    }

                </select>
            </div>
            < div className="mt-3">
                <select onChange={e => setDoctor_id(e.target.value)} value={doctor_id} >
                    <option>select doctorname</option>

                    {
                        doctorlist?.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.Doctorname}</option>)
                    }

                </select>
            </div>
            < div className="mt-3">
                <select onChange={e => setAppointment_id(e.target.value)} value={appointment_id}  >
                    <option>select Date</option>

                    {
                        appointmentlist.map((appoint) => <option key={appoint._id} value={appoint._id}>{appoint.Date}</option>)
                    }

                </select>
            </div>
            < div className="mt-3">
                <select onChange={e => setAppointment_id(e.target.value)} value={appointment_id}  >
                    <option>select Reason</option>

                    {
                        appointmentlist.map((appoint) => <option key={appoint._id} value={appoint._id}>{appoint.Reason}</option>)
                    }

                </select>
            </div>
            < div className="mt-3">
                <select onChange={e => setPrescription_id(e.target.value)} value={prescription_id}  >
                    <option>select Medicine</option>

                    {
                        prescriptionlist.map((pres) => <option key={pres._id} value={pres._id}>{pres.Medicine}</option>)
                    }

                </select>
            </div>
            < div className="mt-3">
                <select onChange={e => setPrescription_id(e.target.value)} value={prescription_id}  >
                    <option>select Dosage</option>

                    {
                        prescriptionlist.map((pres) => <option key={pres._id} value={pres._id}>{pres.Dosage}</option>)
                    }

                </select>
            </div>
            <div>
                <button className="mt-3">submit</button>
            </div>

        </form>

        <div className="mt-3">
            <Link to={'/patienthistory'}>VIEW PATIENT HISTORY</Link>
        </div>
        <div className="mt-3">
            <button className=" btn bg-danger" onClick={logout}>LOGOUT</button>
        </div>

    </div>
}