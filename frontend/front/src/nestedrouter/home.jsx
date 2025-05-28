import { useNavigate } from "react-router-dom";
import '../../src/nestedrouter/style.css'
export default function Home() {
    let navigate = useNavigate();
    return <div className="text-center vh-100" class="image">
        <div className="text-center">
            <div>
                <h1 className="text-warning">WELCOME TO ASHIQ HOSPITAL</h1>
            </div>
            <div className="mt-5">
                <button className=" btn bg-danger " onClick={() => navigate('/doctor')} >doctorsignup</button>
            </div>
            <div className="mt-5">
                <button className=" btn bg-danger " onClick={() => navigate('/patient')} >Patientsignup</button>
            </div>
            <div className="mt-5">
                <button className=" btn bg-danger " onClick={() => navigate('/admin')} >Adminsignup</button>
            </div>
        </div>
    </div>


}