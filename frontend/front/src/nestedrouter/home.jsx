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
                <button className=" btn bg-danger " onClick={() => navigate('/doctor')} >doctor signup</button>
            </div>
            <div className="mt-5">
                <button className=" btn bg-danger " onClick={() => navigate('/patient')} >Patient signup</button>
            </div>
            <div className="mt-5">
                <button className=" btn bg-danger " onClick={() => navigate('/admin')} >Admin signup</button>
            </div>
        </div>
    </div>


}