import React, { useState } from "react";

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
                    'Content-Type': "application/json"
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
        <div className="Container">
            <form className='flex flex-col items-center' onClick={addProduct}>
                <h1 className="text-5xl m-4">Add Product</h1>
                <div>
                    <input className="Input" type="text" placeholder="Enter Product Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    {error && !name && <span className="text-red-600 ml-44 -mt-3 text-sm">Enter valid Value</span>}         {/* This will check if error is true and !name is true then see span */}

                    <input className="Input" type="text" placeholder="Enter Product Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    {error && !price && <span className="text-red-600 ml-44 -mt-3 text-sm">Enter Valid Price</span>}

                    <input className="Input" type="text" placeholder="Enter Product Category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                    {error && !category && <span className="text-red-600 ml-44 -mt-3 text-sm">Enter Valid Category</span>}

                    <input className="Input" type="text" placeholder="Enter Product Company" value={company} onChange={(e) => { setCompany(e.target.value) }} />
                    {error && !company && <span className="text-red-600 ml-44 -mt-3 text-sm">Enter Valid Company</span>}

                </div>
                <button className="btn-primary px-6">Add</button>
            </form>
        </div>
    )
}

export default AddProduct;