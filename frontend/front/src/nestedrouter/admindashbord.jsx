import { useNavigate } from "react-router-dom";
export default function Admindashbord() {
    let navigate = useNavigate();
    const logout = async () => {
        localStorage.clear()
        navigate('/')
    }
    return <div>
        <h1>adminpage</h1>
        <div className="mt-3">
            <button className="btn btn-danger" onClick={logout}>LOGOUT</button>
        </div>

    </div>
}