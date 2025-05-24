import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import axiosInstance from "../axiosinstance/axiosinstance"
import { useNavigate } from "react-router-dom"

export default function Appointmentdashbord() {
    let navigate = useNavigate();

    const [Starttime, setStarttime] = useState('')
    const [Endtime, setEndtime] = useState('')
    const [Slotduration, setSlotduration] = useState('')
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])
    const [department_id, setDepartment_id] = useState()
    const [departmentlist, setDepartmentlist] = useState([])

    const Bookpage = () => {
        axiosInstance.post('http://localhost:2000/book', { Starttime, Endtime, Slotduration, doctor_id, department_id }).then(res => {
        })
    }
    const getdoctor = () => {
        axios.get('http://localhost:2000/doctor_get')
            .then(res => {
                setDoctorlist(res?.data)
            })
    }

    const getdepartment = () => {
        axios.get('http://localhost:2000/doctor_get')
            .then(res => {
                setDoctorlist(res?.data)
            })
    }

    const Submit = e => {
        e.preventDefault()
        Bookpage();
    }

    useEffect(() => {
        getdoctor();
        getdepartment();
    }, [])
    return <div className="text-center">
        <form onSubmit={Submit}>
            <div className="mt-3">
                <input onChange={e => setStarttime(e.target.value)} value={Starttime || ''} placeholder="Starttime" />
            </div>
            <div className="mt-3">
                <input onChange={e => setEndtime(e.target.value)} value={Endtime || ''} placeholder="Endtime" />
            </div>
            <div className="mt-3">
                <input onChange={e => setSlotduration(e.target.value)} value={Slotduration || ''} placeholder="Slotduration" />
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
                <select onChange={e => setDepartment_id(e.target.value)} value={department_id} >
                    <option>select department</option>

                    {
                        departmentlist?.map((department) => <option key={department._id} value={department._id}>{department.Department}</option>)
                    }

                </select>
            </div>
            <div className="mt-3">
                <button>Submit</button>
            </div>

        </form>
        <div className="mt-3">
            <Link to={'/slot'}>BOOKING PAGE</Link>
        </div>
        <div className="mt-3">
            <Link>CALENDAR AVAILABILITY</Link>
        </div>
        <div className="mt-3 " >
            <button className=" btn bg-danger " onClick={() => navigate('/admindashbord')} >GO BACK</button>
        </div>




    </div>
}