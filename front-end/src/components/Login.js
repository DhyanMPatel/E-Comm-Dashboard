import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Submit =(e)=>{
        e.preventDefault();
        console.log(email, password);
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
            
            <input className='Input' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className='Input border-none p-0 flex '>
                <input id='Password' autoComplete="true" className='Input m-0 w-10/12 rounded-tr-none rounded-br-none border-r-0' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" id="Btn" className='btn-toggle w-2/12 focus:shadow-lg' onClick={() => seeOrNot()}>Show</button>
            </div>

            <button className='btn-primary'>Send</button>
        </form>
    )
}

export default Login;