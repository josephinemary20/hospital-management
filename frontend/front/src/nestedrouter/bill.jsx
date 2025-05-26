import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Bill() {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [billsData, patientsData] = await Promise.all([
                    axios.get('http://localhost:2000/bill_get')

                ]);



                const fetchedBills = billsData.data.map(bill => ({
                    ...bill,

                }));

                setBills(fetchedBills);
            } catch (error) {
                console.error("Error fetching billing data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Billing Reports</h2>
            <ol>
                {bills.map(bill => (
                    <li key={bill._id}>
                        {bill.Patientname} - {bill.Amount} - {bill.Paymentstatus}
                        <br />
                    </li>
                ))}
            </ol>
            <Link to="/admindashbord">GO BACK</Link>
        </div>
    );
}
