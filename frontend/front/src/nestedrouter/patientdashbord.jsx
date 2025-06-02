import { Link, useNavigate } from "react-router-dom";
import '../../src/nestedrouter/style.css'

export default function Patientdashbord() {

    let navigate = useNavigate();
    const logout = async () => {
        localStorage.clear()
        navigate('/')
    }
    return <div className="text-center" class="patientdashbord">
        <div className="text-center">

            <div >
                <button className="btn btn-secondary" onClick={() => navigate('/patientappoint')}>Booking form</button>
            </div>

            <div className="mt-3">
                <button className="btn btn-secondary" onClick={() => navigate('/paybill')}>pay bill</button>
            </div>
            <div className="mt-3">
                <Link to={'/patientprescription'}>VIEW PRESCRIPTION</Link>
            </div>
            <div className="mt-3">
                <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
            </div>
        </div >

    </div>
}