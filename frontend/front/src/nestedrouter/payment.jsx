import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import '../../src/nestedrouter/style.css';

export default function Payment() {
    const [lastConsultationfees, setLastConsultationfees] = useState(null);

    useEffect(() => {
        const fetchLatestAmount = async () => {
            try {
                const response = await axios.get("http://localhost:2000/bill_get");
                const bills = response.data;
                if (bills.length > 0) {
                    const latestBill = bills[bills.length - 1];
                    setLastConsultationfees(latestBill.Consultationfees);
                }
            } catch (error) {
                console.error(" latest Consultationfees:", error);
            }
        };

        fetchLatestAmount();
    }, []);

    const handleClick = () => {
        Swal.fire({
            title: 'Payment Successful',
            text: `Your payment of ₹${lastConsultationfees} has been processed successfully.`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div className="text-center money">
            <div className="text-center">
                <div>
                    <h2>PAYMENT PROCESS</h2>
                </div>
                <div className="mb-3">
                    <h3>Dear patient, your payment is</h3>
                </div>
                <div className="mb-3">
                    {lastConsultationfees !== null ? (
                        <button onClick={handleClick}>{lastConsultationfees}</button>
                    ) : (
                        <p>Loading amount...</p>
                    )}
                </div>
                <Link to="/patientdashbord">GO BACK</Link>
            </div>
        </div>
    );
}
