import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../../src/nestedrouter/style.css'

export default function Assigndepartment() {
    const Click = () => {
        alert(" Doctor department added.");
    };
    const [doctor_id, setDoctor_id] = useState()
    const [doctorlist, setDoctorlist] = useState([])
    const [department_id, setDepartment_id] = useState()
    const [departmentlist, setDepartmentlist] = useState([])

    const Bookpage = () => {
        axiosInstance.post('http://localhost:2000/slot', { doctor_id, department_id }).then(res => {
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

    return <div className="text-center" class="assigndepartment">
        <div className="text-center">
            <div >
                <h3> ASSIGN DOCTORS  DEPARTMENT</h3 >
            </div>
            <form onSubmit={Submit}>

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
                <div className="mt-3">
                    <Link to={'/admindashbord'}>GO BACK</Link>
                </div>

            </form>
        </div>
    </div>


}