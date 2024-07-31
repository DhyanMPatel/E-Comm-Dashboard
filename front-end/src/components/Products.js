import React, { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products")
        result = await result.json();
        setProducts(result);
    }
    console.log("products : ", products);
    return (
        <div className="flex justify-center flex-col">
            <h1 className="text-2xl flex justify-center m-4">List of Products</h1>
            <table>
                <thead>
                    <tr className="flex justify-center">
                        <td className="td">S.No</td>
                        <td className="td">Name</td>
                        <td className="td">Price</td>
                        <td className="td">Category</td>
                        <td className="td">Company</td>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map((item, index) =>
                        <tr className="flex justify-center" key={index}>
                            <td className="td">{index}</td>
                            <td className="td">{item.name}</td>
                            <td className="td">{item.price}</td>
                            <td className="td">{item.category}</td>
                            <td className="td">{item.company}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default Products;