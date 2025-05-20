
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
import Appointment from "./appointment"



export default function Nestedrouter() {
    const navigate = useNavigate();
    const checkDoctor = async () => {

        let doctortoken = await localStorage.getItem('doctortoken')
        if (doctortoken) {
            axiosInstance.defaults.headers['token'] = doctortoken
            navigate('/doctordashbord')
        }


        let admintoken = await localStorage.getItem('admintoken')
        if (admintoken) {
            axiosInstance.defaults.headers['token'] = admintoken
            navigate('/admindashbord')
        }

        let patienttoken = await localStorage.getItem('patienttoken')
        if (patienttoken) {
            axiosInstance.defaults.headers['token'] = patienttoken
            navigate('/patientdashbord')
        }

    }



    /*const checkPatient = async () => {
        let token = await localStorage.getItem('patienttoken')
        if (token) {
            axiosInstance.defaults.headers['token'] = token
            navigate('/patientdashbord')
        }
    };*/

    const ProtectRoute = () => {
        let token = localStorage.getItem('doctortoken')
        return token ? <Outlet /> : <Navigate to={'/'} />
    }
    const Protectadmin = () => {
        let token = localStorage.getItem('admintoken')
        return token ? <Outlet /> : <Navigate to={'/'} />
    }
    const Protectpatient = () => {
        let token = localStorage.getItem('patienttoken')
        return token ? <Outlet /> : <Navigate to={'/'} />
    }



    useEffect(() => {
        checkDoctor();
        // checkAdmin();
        //checkPatient();
    }, [])
    return <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/doctor' element={<Doctor />} />
            <Route path='/patient' element={<Patient />} />
            <Route path='/admin' element={<Admin />} />
            <Route element={<ProtectRoute />} >
                <Route path='/doctordashbord' element={<Doctordashbord />} />
                <Route path='/appointment' element={<Appointment />} />
                <Route element={<Protectpatient />} >
                    <Route path='/patientdashbord' element={<Patientdashbord />} />
                </Route>
                <Route element={<Protectadmin />} >
                    <Route path='/admindashbord' element={<Admindashbord />} />
                </Route>
            </Route>



        </Routes>
    </div>

}