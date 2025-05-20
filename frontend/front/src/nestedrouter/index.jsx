
import { HashRouter, Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axiosInstance from "../axiosinstance/axiosinstance"
import Home from "./home"
import Doctor from "./doctor"
import Patient from "./patient"
import Admin from "./admin"
import Doctordashbord from "./doctordashbord"
import Admindashbord from "./admindashbord"
import Patientdashbord from "./patientdashbord"



export default function Nestedrouter() {
    const navigate = useNavigate();
    const checkDoctor = async () => {
        let token = await localStorage.getItem('doctortoken')
        if (token) {
            axiosInstance.defaults.headers['doctortoken'] = token
            navigate('/doctordashbord')
        }
    };

    const checkAdmin = async () => {
        let token = await localStorage.getItem('admintoken')
        if (token) {
            axiosInstance.defaults.headers['admintoken'] = token
            navigate('/admindashbord')
        }
    };

    const checkPatient = async () => {
        let token = await localStorage.getItem('patienttoken')
        if (token) {
            axiosInstance.defaults.headers['patienttoken'] = token
            navigate('/patientdashbord')
        }
    };

    const ProtectRoute = () => {
        let token = localStorage.getItem('token')
        return token ? <Outlet /> : <Navigate to={'/'} />
    }

    useEffect(() => {
        checkDoctor();
        checkAdmin();
        checkPatient();
    }, [])
    return <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/doctor' element={<Doctor />} />
            <Route path='/patient' element={<Patient />} />
            <Route path='/admin' element={<Admin />} />
            <Route element={<ProtectRoute />} >
                <Route path='/doctordashbord' element={<Doctordashbord />} />
                <Route path='/patientdashbord' element={<Patientdashbord />} />
                <Route path='/admindashbord' element={<Admindashbord />} />
            </Route>


        </Routes>
    </div>
}