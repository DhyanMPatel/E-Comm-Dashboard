import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')           /// if we click on SignUp then navigate to root automaticaly
        }
    },[])

    let Submit = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        const data = await fetch("http://localhost:5000/signup", {      // fetch data from front-end
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            /// No neccesory to add token in headers here
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const result = await data.json();
        console.log(result);
        /// set user and token
        localStorage.setItem("user",JSON.stringify(result.result))    // give key and String value pair
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate("/")
        
    }

    const seeOrNot = () => {
        const input = document.getElementById("Password")     // id of password input field
        const passbtn = document.getElementById("Btn")         // id of button
        if (input.type === "password") {
            input.type = "text";
            passbtn.textContent = "Hide"
        } else {
            input.type = "password";
            passbtn.textContent = "Show"
        }
    }
    return (
        <form className='flex flex-col items-center' onSubmit={Submit}>
            <h1 className='block text-5xl text-center p-6 '>Create</h1>

            <div>
            <input className='Input' type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input className='Input' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className='Input border-none p-0 flex '>
                <input id='Password' autoComplete="true" className='Input m-0 w-10/12 rounded-tr-none rounded-br-none border-r-0' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" id="Btn" className='btn-toggle w-2/12 focus:shadow-lg' onClick={() => seeOrNot()}>Show</button>
            </div>
            </div>

            <button className='btn-primary w-20'>Send</button>
        </form>
    )
}
export default SignUp;