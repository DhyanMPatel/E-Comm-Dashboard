import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'

export const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();             /// provide id from URL

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async () =>{
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`)      /// get product details from back-end
        result = await result.json();
        // console.log(result)
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = (e) => {
        e.preventDefault();
        console.log(name, price, category, company);
    }

    return (
        <div className="Container">
            <form className="flex flex-col justify-center items-center" onSubmit={updateProduct}>
            <header className="text-5xl m-4">Update Form</header>
                
                <input type="text" className="Input" placeholder="Update Name" value={name} onChange={e =>  setName(e.target.value) } />
                <input type="text" className="Input" placeholder="Update Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <input type="text" className="Input" placeholder="Update Category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                <input type="text" className="Input" placeholder="Update Company" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                
                <button type="submit" className="btn-primary my-5">Update</button>
            
            </form>
        </div>
    )
}