import { useNavigate } from "react-router-dom";
export default function Home() {
    let navigate = useNavigate();
    return <div className="text-center" >
        <div className="mt-5">
            <h1 className="text-primary">WELCOME TO ASHIQ HOSPITAL</h1>
        </div>
        <div className="mt-5">
            <button className=" btn bg-danger " onClick={() => navigate('/doctor')} >doctorsignup</button>
        </div>
        <div className="mt-5">
            <button className=" btn bg-danger " onClick={() => navigate('/patient')} >Patientsignup</button>
        </div>
    </div>


}