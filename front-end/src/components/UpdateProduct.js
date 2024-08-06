import React, { useState } from "react";

export const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

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