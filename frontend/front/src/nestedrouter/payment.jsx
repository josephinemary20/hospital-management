import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../src/nestedrouter/style.css'

export default function Payment() {
    const [lastAmount, setLastAmount] = useState(null);

    useEffect(() => {
        const fetchLatestAmount = async () => {
            try {
                const response = await axios.get("http://localhost:2000/bill_get");
                const bills = response.data;
                if (bills.length > 0) {
                    const latestBill = bills[bills.length - 1]; // get last bill
                    setLastAmount(latestBill.Amount);
                }
            } catch (error) {
                console.error("Error fetching latest amount:", error);
            }
        };

        fetchLatestAmount();
    }, []);

    const handleClick = () => {
        alert(`Your payment of ${lastAmount} has been processed successfully.`);
    };

    return (
        <div className="text-center" class="money">
            <div className="text-center">
                <div >
                    <h2>PAYMENT PROCESS</h2>
                </div>
                <div className="mb-3">
                    <h3>Dear patient, your payment is</h3>
                </div>
                <div className="mb-3">
                    {lastAmount !== null ? (
                        <button onClick={handleClick}>{lastAmount}</button>
                    ) : (
                        <p>Loading amount...</p>
                    )}
                </div>
                <Link to="/patientdashbord">GO BACK</Link>
            </div>
        </div>

    );
}
