import { Link, useNavigate } from "react-router-dom";

export default function Doctordashbord() {

    let navigate = useNavigate();
    const logout = async () => {
        localStorage.clear()
        navigate('/')
    }

    return <div className="text-center">

        <div className="mt-3">
            <button className="btn btn-secondary" onClick={() => navigate('/upcomingappoint')}>Appointment</button>
        </div>

        <div className="mt-3">
            <Link to={'/appointment'} >VIEW UPCOMING APPOINTMENT</Link>
        </div>
        <div className="mt-3">
            <button className="btn btn-secondary" onClick={() => navigate('/addprescription')}>Add Prescription</button>
        </div>

        <div className="mt-3">
            <Link to={'/prescription'}>ADD PRESCRIPTION TO PATIENT</Link>
        </div>

        <div className="mt-3">
            <Link to={'/patienthistory'}>VIEW PATIENT HISTORY</Link>
        </div>
        <div className="mt-3">
            <button className=" btn bg-danger" onClick={logout}>LOGOUT</button>
        </div>

    </div>
}