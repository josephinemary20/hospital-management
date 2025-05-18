import { useState } from "react";
import axios from "axios";

export default function Admin() {
    const [adminname, setAdminname] = useState('')
    const [adminid, setAdminid] = useState('')

    const postadmin = () => {
        let url = 'http://localhost:6000/admin_signup';
        let method = 'post';
        axios[method](url, { Adminname: adminname, Adminid: adminid })
            .then(res => {
                console.log('adminsignup', res)
            })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        postadmin();

    };

    return <div>
        <form onSubmit={onSubmit}>
            <div>
                <h3>ADMIN SIGNUP</h3>
            </div>
            <div className="mt-3">
                <input onChange={e => setAdminname(e.target.value)} value={adminname || ''} placeholder="Adminname" />
            </div>
            <div className="mt-3">
                <input onChange={e => setAdminid(e.target.value)} value={adminid || ''} placeholder="Adminid" />

            </div>
            <div className="mt-3">
                <button type="submit">Submit</button>
            </div>
        </form>

    </div>

}