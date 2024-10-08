import React, { useState } from "react";
import Footer from "./Footer";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {
        try {
            console.log(!name)              // return true if empty and vise versa
            if (!name || !price || !category || !company) {
                setError(true);
                return false                   // will not pass values to DB
            }

            console.log(name, price, category, company);
            const userId = JSON.parse(localStorage.getItem('user'))._id
            let data = await fetch('http://localhost:5000/add', {
                method: 'post',
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    'Content-Type': "application/json",
                    /// this now neccesory to add token in headers
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            data = await data.json();
            console.log(data);
        }
        catch (e) {
            console.log(e)
            alert(e)
        }
    }
    return (
        <>
            <div className="Container">
                <form className='flex flex-col items-center' onClick={addProduct}>
                    <h1 className="text-5xl m-4">Add Product</h1>
                    <div className="w-80">
                        <input className="Input" type="text"  placeholder="Enter Product Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        {error && !name && <div className="text-red-600 flex justify-end pr-2 -mt-3 text-sm">Enter valid Value</div>}         {/* This will check if error is true and !name is true then see span */}

                        <input className="Input" type="text" placeholder="Enter Product Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        {error && !price && <div className="text-red-600 flex justify-end pr-2 -mt-3 text-sm">Enter Valid Price</div>}

                        <input className="Input" type="text" placeholder="Enter Product Category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                        {error && !category && <div className="text-red-600 flex justify-end pr-2 -mt-3 text-sm">Enter Valid Category</div>}

                        <input className="Input" type="text" placeholder="Enter Product Company" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                        {error && !company && <div className="text-red-600 flex justify-end pr-2 -mt-3 text-sm">Enter Valid Company</div>}

                    </div>
                    <button type="button" className="btn-primary px-6">Add</button>
                </form>
            </div>
            <div className="Footer absolute bottom-0">
                <Footer />
            </div>
        </>
    )
}

export default AddProduct;