import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products",{
            /// this now neccesory to add token in headers
            headers:{
                /// add bearer and use backtick to display products
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        setProducts(result);
    }
    // console.log("products : ", products);

    const deleteProduct = async (id) => {
        // console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {       // of perticular product id
            method: "DELETE",
            /// this now neccesory to add token in headers
            headers:{
                /// add bearer and use backtick to display products
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        if (result) {
            getProducts();          /// this will refresh again
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                /// this now neccesory to add token in headers
                headers:{
                    /// add bearer and use backtick to display products
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className="flex justify-center flex-col p-1">
            <h1 className="text-2xl flex justify-center m-4">List of Products</h1>
            <div className="flex place-content-between">
                <input className=" Input w-5/12 mb-6" type="text" placeholder="Search Product Name" onChange={searchHandle} />
            </div>
            <table>
                <thead>
                    <tr className="flex justify-center">
                        <td className="td">S.No</td>
                        <td className="td">Name</td>
                        <td className="td">Price</td>
                        <td className="td">Category</td>
                        <td className="td">Company</td>
                        <td className="td">Operation</td>
                    </tr>
                </thead>
                {
                    products.length > 0 ?
                        <tbody>
                            {
                                products.map((item, index) =>
                                    <tr className="flex justify-center" key={index}>
                                        <td className="td">{index + 1}</td>
                                        <td className="td">{item.name}</td>
                                        <td className="td">{item.price}</td>
                                        <td className="td">{item.category}</td>
                                        <td className="td">{item.company}</td>
                                        <td className="td">
                                            <button className="relative btn-primary w-5/12 mr-2" onClick={() => deleteProduct(item._id)} >Delete</button>        {/* take id from  */}
                                            <div className="btn-primary relative w-5/12 flex justify-center">
                                                <Link className="" to={`/update/${item._id}`}>Update</Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        : <tbody>
                            <tr className="flex justify-center">
                                <td className="text-2xl font-extralight p-10">No Product Found</td>
                            </tr>
                        </tbody>
                }
            </table>
        </div>
    )
}
export default Products;