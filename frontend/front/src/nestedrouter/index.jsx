
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
import Prescription from "./prescription"
import Patienthistory from "./patienthistory"
import Bookappoint from "./bookappoint"
import Patientprescription from "./patientprescription"
import Appointmentdashbord from "./appointmentdashbord"
import Slot from "./slot"
import Availabledate from "./availabledate"
import Allappointment from "./allappointment"
import Managepatient from "./managepatient"
import Payment from "./payment"



export default function Nestedrouter() {
    const navigate = useNavigate();

    const checkToken = async () => {
        let doctortoken = await localStorage.getItem('doctortoken')
        let admintoken = await localStorage.getItem('admintoken')
        let patienttoken = await localStorage.getItem('patienttoken')
        if (doctortoken) {
            axiosInstance.defaults.headers['token'] = doctortoken
            navigate('/doctordashbord')
        } else if (admintoken) {
            axiosInstance.defaults.headers['token'] = admintoken
            navigate('/admindashbord')
        } else if (patienttoken) {
            axiosInstance.defaults.headers['token'] = patienttoken
            navigate('/patientdashbord')
        }

    }



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
        checkToken();

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
                <Route path='/prescription' element={<Prescription />} />
                <Route path='/patienthistory' element={<Patienthistory />} />
            </Route>
            <Route element={<Protectpatient />} >
                <Route path='/patientdashbord' element={<Patientdashbord />} />
                <Route path='/bookappoint' element={< Bookappoint />} />
                <Route path='patientprescription' element={<Patientprescription />} />
                <Route path='/payment' element={<Payment />} />
            </Route>
            <Route element={<Protectadmin />} >
                <Route path='/admindashbord' element={<Admindashbord />} />
                <Route path='/appointmentdashbord' element={<Appointmentdashbord />} />
                <Route path='availabledate' element={<Availabledate />} />
                <Route path='allappointment' element={<Allappointment />} />
                <Route path='/slot' element={<Slot />} />
                <Route path='/managepatient' element={<Managepatient />} />

            </Route>



        </Routes>
    </div>

}