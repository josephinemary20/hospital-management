
import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "./home"
import Doctor from "./doctor"
import Patient from "./patient"

export default function Nestedrouter() {
    return <div>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/doctor' element={<Doctor />} />
                <Route path='/patient' element={<Patient />} />
            </Routes>
        </HashRouter>
    </div>
}