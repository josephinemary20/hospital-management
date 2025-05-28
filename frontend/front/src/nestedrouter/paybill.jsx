import { Link, } from "react-router-dom";
import { useState, } from "react";
import axiosInstance from "../axiosinstance/axiosinstance"
import '../../src/nestedrouter/style.css'

export default function Paybill() {

    // bill
    const [Amount, setAmount] = useState('')
    const [Paymentstatus, setPaymentstatus] = useState('')
    const [Patientname, setPatientname] = useState('')

    const Bill = () => {
        alert(" Your payment is successfully .");
    };

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
                <h3>PRESCRIPTION FORM</h3>
            </div>
            <form onClick={Submitbill}>
                <div className="mt-3">
                    <input onChange={e => setPatientname(e.target.value)} value={Patientname || ''} placeholder="Patientname" />
                </div>
                <div className="mt-3">
                    <input onChange={e => setAmount(e.target.value)} value={Amount || ''} placeholder="Amount" />
                </div>
                <div className="mt-3">
                    <input onChange={e => setPaymentstatus(e.target.value)} value={Paymentstatus || ''} placeholder="Paymentstatus" />
                </div>
                <div className="mt-3">
                    <button onClick={Bill}>submit</button>
                </div>

            </form>

            <div className="mt-3">
                <Link to={'/patientdashbord'}>GO BACK</Link>
            </div>
        </div>

    </div>
}