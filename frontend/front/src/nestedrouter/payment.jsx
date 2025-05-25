import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Payment() {
    const Click = () => {
        alert(" Your Payment has been processed successfully.");
    };
    return (
        <div className="text-center">
            <div className="mb-3">
                <h2>PAYMENT PROCESS</h2>
            </div>
            <div className="mb-3">
                <h3>dear patient your payment is</h3>
            </div>
            <div className="mb-3">
                <button onClick={Click}>450</button>
            </div>





            <Link to="/patientdashbord">GO BACK</Link>
        </div>
    );
}
