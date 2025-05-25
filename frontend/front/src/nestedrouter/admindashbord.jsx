import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Admindashbord() {
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


    let navigate = useNavigate();
    const logout = async () => {
        localStorage.clear()
        navigate('/')
    }
    return <div className="text-center">
        <div className="mt-3">
            <h3>ASSIGN DOCTORS TO DEPARTMENT</h3 >
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
                <button>Submit</button>
            </div>

        </form>

        <div className="mt-3">
            <Link to={'/allappointment'}>VIEW ALL APPOINTMENT</Link>
        </div>
        <div className="mt-3">
            <Link to={'/managepatient'}>MANAGE PATIENTS</Link>
        </div>
        <div className="mt-3">
            <Link>BILLING REPORTS</Link>
        </div>
        <div className="mt-3">
            <button className="btn btn-primary" onClick={() => navigate('/appointmentdashbord')}>APPOINTMENT MANAGEMENT</button>
        </div>

        <div className="mt-3">
            <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
        </div>

    </div>
}