import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Bill() {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [billsData] = await Promise.all([
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
            <table className="table table-bordered mx-auto" style={{ width: "80%" }}>
                <thead className="thead-dark">
                    <tr>
                        <th>Patient Name</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map(bill => (
                        <tr key={bill._id}>
                            <td>{bill.Patientname}</td>
                            <td>{bill.Amount}</td>
                            <td>{bill.Paymentstatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admindashbord">GO BACK</Link>
        </div>
    );
}
