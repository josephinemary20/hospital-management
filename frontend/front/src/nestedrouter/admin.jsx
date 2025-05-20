import { useState } from "react";
import axios from "axios";

export default function Admin() {
    const [Adminname, setAdminname] = useState('')
    const [Adminid, setAdminid] = useState('')

    const adminsignup = () => {
        axios.post('http://localhost:2000/admin_signup', { Adminname, Adminid }).then(res => {
            console.log('adminsignup', res)
        })
    }

    const adminLogin = () => {
        axios.post('http://localhost:2000/admin_login', { Adminname, Adminid })
            .then(res => {
                axiosInstance.defaults.headers['token'] = res.data?.token

                localStorage.setItem('token', res.data?.token)
            })
    }


    return <div className="text-center">
        <form >
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
                <button onClick={adminsignup}>SIGNUP</button>
            </div>
            <div className="mt-3">
                <button onClick={adminLogin}>LOGIN</button>
            </div>
        </form>

    </div>

}