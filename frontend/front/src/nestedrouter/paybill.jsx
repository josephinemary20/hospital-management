import { Link, useNavigate, } from "react-router-dom";
import { useState, } from "react";
import axiosInstance from "../axiosinstance/axiosinstance"
import '../../src/nestedrouter/style.css'

export default function Paybill() {

    // bill
    const [Amount, setAmount] = useState('')
    const [Paymentstatus, setPaymentstatus] = useState('')
    const [Patientname, setPatientname] = useState('')

    let navigate = useNavigate();

    const createbill = () => {
        axiosInstance.post('http://localhost:2000/bill', { Amount, Paymentstatus, Patientname }).then(res => {

        })
    }

    const Submitbill = e => {
        e.preventDefault()
        createbill();
    }


    return <div className="text-center" class="prescription">
        <div className="text-center">
            <div >
                <h3>PAYMENT FORM</h3>
            </div>
            <form onClick={Submitbill}>
                <div className="mt-3">
                    <input onChange={e => setPatientname(e.target.value)} value={Patientname || ''} placeholder="Patientname" required />
                </div>
                <div className="mt-3">
                    <input onChange={e => setAmount(e.target.value)} value={Amount || ''} placeholder="Amount" required />
                </div>
                <div className="mt-3">
                    <input onChange={e => setPaymentstatus(e.target.value)} value={Paymentstatus || ''} placeholder="Paymentstatus" required />
                </div>
                <div className="mt-3">
                    <button onClick={() => navigate('/payment')}>submit</button>
                </div>

            </form>

            <div className="mt-3">
                <Link to={'/patientdashbord'}>GO BACK</Link>
            </div>
        </div>

    </div>
}