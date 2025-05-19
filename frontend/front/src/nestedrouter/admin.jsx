import { useState } from "react";
import axios from "axios";

export default function Admin() {
    const [Adminname, setAdminname] = useState('')
    const [Adminid, setAdminid] = useState('')

    const postadmin = () => {
        axios.post('http://localhost:2000/admin_signup', { Adminname, Adminid }).then(res => {
            console.log('adminsignup', res)
        })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        postadmin();

    };

    return <div className="text-center">
        <form onSubmit={onSubmit}>
            <div>
                <h3>ADMIN SIGNUP</h3>
            </div>
            <div className="mt-3">
                <input onChange={e => setAdminname(e.target.value)} value={Adminname || ''} placeholder="Adminname" />
            </div>
            <div className="mt-3">
                <input onChange={e => setAdminid(e.target.value)} value={Adminid || ''} placeholder="Adminid" />

            </div>
            <div className="mt-3">
                <button type="submit">Submit</button>
            </div>
        </form>

    </div>

}