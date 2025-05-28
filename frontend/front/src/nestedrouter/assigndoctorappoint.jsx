import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import axiosInstance from "../axiosinstance/axiosinstance"
import '../../src/nestedrouter/style.css'


export default function Assigndoctorappoint() {
    const Click = () => {
        alert(" Admin booked doctor page.");
    };


    const [Starttime, setStarttime] = useState('')
    const [Endtime, setEndtime] = useState('')
    const [Slotduration, setSlotduration] = useState('')
    const [Availabledate, setAvailabledate] = useState('')
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])
    const [department_id, setDepartment_id] = useState()
    const [departmentlist, setDepartmentlist] = useState([])

    const Bookpage = () => {
        axiosInstance.post('http://localhost:2000/slot', { Starttime, Endtime, Slotduration, Availabledate, doctor_id, department_id }).then(res => {
        })
    }
    const getdoctor = () => {
        axios.get('http://localhost:2000/doctor_get')
            .then(res => {
                setDoctorlist(res?.data)
            })
    }

    const getdepartment = () => {
        axios.get('http://localhost:2000/department_get')
            .then(res => {
                setDepartmentlist(res?.data)
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



    return <div className="text-center" class="adminbooking">
        <div className="text-center">
            <div >
                <h3>Admin Booking Doctor Page</h3>
            </div>
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
                    <label>Availabledate</label><br />
                    <input onChange={e => setAvailabledate(e.target.value)} value={Availabledate || ''} type="Date" />
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
                    <button onClick={Click}>Submit</button>
                </div>

            </form>
            <div className="mt-3">
                <Link to={'/appointmentdashbord'}>GO BACK</Link>
            </div>

        </div>
    </div>


}