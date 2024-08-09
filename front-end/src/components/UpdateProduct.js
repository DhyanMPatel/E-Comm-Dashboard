import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import Footer from "./Footer";

export const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();             /// provide id from URL
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        // console.log(params);
        try {
            let data = await fetch(`http://localhost:5000/product/${params.id}`, {
                /// this now neccesory to add token in headers
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })      /// get product details from back-end
            let result = await data.json();
            // console.log(result)
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        } catch (e) {
            console.log(e);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            let data = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: 'Put',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'application/json',
                    /// this now neccesory to add token in headers
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            let result = await data.json();
            // console.log(result);
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="Container">
                <form className="flex flex-col justify-center items-center" onSubmit={updateProduct}>
                    <header className="text-5xl m-4">Update Form</header>

                    <div className="w-80">
                        <input type="text" className="Input" placeholder="Update Name" value={name} onChange={e => setName(e.target.value)} />
                        <input type="text" className="Input" placeholder="Update Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        <input type="text" className="Input" placeholder="Update Category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                        <input type="text" className="Input" placeholder="Update Company" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                    </div>

                    <button type="submit" className="btn-primary my-5 px-3">Update</button>

                </form>
            </div>
            <div className="Footer absolute bottom-0">
                <Footer />
            </div>
        </>
    )
}