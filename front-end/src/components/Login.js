import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /// can't navigate user after login
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [])

    const Submit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        // API Integration
        const data = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json'
            }
        })
        const result = await data.json();
        console.log(result);
        ///check auth is defined or not?
        if (result.auth) {
            /// pass useer with token
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        } else {
            alert("Please Enter Correct Details")
        }
    }

    const seeOrNot = () => {
        const input = document.getElementById('Password');
        const btn = document.getElementById('Btn');
        if (input.type === "password") {
            input.type = "text";
            btn.innerHTML = "Hide";
        } else {
            input.type = "password";
            btn.innerHTML = "Show";
        }
    }
    return (
        <form className="flex flex-col items-center" onSubmit={Submit}>
            <h1 className='block text-5xl text-center p-6 '>Login</h1>

            <div>
                <input className='Input' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='Input border-none p-0 flex '>
                    <input id='Password' autoComplete="true" className='Input m-0 rounded-tr-none rounded-br-none border-r-0' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" id="Btn" className='btn-toggle w-2/12 focus:shadow-lg' onClick={() => seeOrNot()}>Show</button>
                </div>
            </div>

            <button className='btn-primary w-20'>Send</button>
        </form>
    )
}

export default Login;