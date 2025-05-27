
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Admindashbord() {

    let navigate = useNavigate();
    const logout = async () => {
        localStorage.clear()
        navigate('/')
    }
    return <div className="text-center">
        <div className="mt-3">
            <button className="btn btn-secondary" onClick={() => navigate('/assigndepartment')}>Assign doctor department</button>
        </div>
        <div className="mt-3">
            <Link to={'/allappointment'}>VIEW ALL APPOINTMENT</Link>
        </div>
        <div className="mt-3">
            <Link to={'/managepatient'}>MANAGE PATIENTS</Link>
        </div>
        <div className="mt-3">
            <Link to={'/bill'}>BILLING REPORTS</Link>
        </div>
        <div className="mt-3">
            <button className="btn btn-primary" onClick={() => navigate('/appointmentdashbord')}>APPOINTMENT MANAGEMENT</button>
        </div>

        <div className="mt-3">
            <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
        </div>

    </div>
}