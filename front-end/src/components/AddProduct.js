import React, { useState } from "react";

const AddProduct =() =>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company,setCompany] = useState('')
    const addProduct = async () =>{
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id
        let data = await fetch('http://localhost:5000/add',{
            method:'post',
            body:JSON.stringify({name,price,category,company, userId}),
            headers:{
                'Content-Type':"application/json"
            }
        })
        data = await data.json();
        console.log(data);
    } 
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-5xl m-4">Add Product</h1>
            <input className="Input" type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <input className="Input" type="text" placeholder="Enter Product Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            <input className="Input" type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
            <input className="Input" type="text" placeholder="Enter Product Company" value={company} onChange={(e)=>{setCompany(e.target.value)}} />
            <button className="btn-primary" onClick={addProduct}>Add</button>
        </div>
    )
}

export default AddProduct;