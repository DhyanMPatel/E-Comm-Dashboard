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
    })

    let Submit = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        const data = await fetch("http://localhost:5000/signup", {      // fetch data from front-end
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const res = await data.json();
        localStorage.setItem("user",JSON.stringify(res))    // give key and String value pair
        console.log(res);
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
            <h1 className='block text-5xl text-center p-6 '>Form</h1>

            <input className='Input' type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input className='Input' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className='Input border-none p-0 flex '>
                <input id='Password' autoComplete="true" className='Input m-0 w-10/12 rounded-tr-none rounded-br-none border-r-0' type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" id="Btn" className='btn-toggle w-2/12 focus:shadow-lg' onClick={() => seeOrNot()}>Show</button>
            </div>

            <button className='btn-primary'>Send</button>
        </form>
    )
}
export default SignUp;