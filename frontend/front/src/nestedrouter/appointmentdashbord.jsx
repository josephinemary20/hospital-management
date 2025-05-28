import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import '../../src/nestedrouter/style.css'

export default function Appointmentdashbord() {
    let navigate = useNavigate();

    return <div className="text-center" class="appointmentdashbord">
        <div className="text-center">
            <div >
                <button className="btn btn-secondary" onClick={() => navigate('/assigndoctorappoint')}>Admin Booking Doctor Page</button>
            </div>

            <div className="mt-3">
                <Link to={'/slot'}>VIEW DOCTOR APPOINTMENT</Link>
            </div>
            <div className="mt-3">
                <Link to={'/availabledate'}>DOCTOR AVAILABLE DATE</Link>
            </div>
            <div className="mt-3 " >
                <button className=" btn bg-danger " onClick={() => navigate('/admindashbord')} >GO BACK</button>
            </div>

        </div>


    </div>
}