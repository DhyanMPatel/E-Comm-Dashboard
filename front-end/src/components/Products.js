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
    // console.log("products : ", products);

    const deleteProduct=async(id)=>{
        // console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"DELETE",
        })
        result  = await result.json();
        if(result){
            getProducts();          /// this will refresh again
        }
    }

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
                        <td className="td">Operation</td>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map((item, index) =>
                        <tr className="flex justify-center" key={index}>
                            <td className="td">{index+1}</td>
                            <td className="td">{item.name}</td>
                            <td className="td">{item.price}</td>
                            <td className="td">{item.category}</td>
                            <td className="td">{item.company}</td>
                            <td className="td"><button className="btn-primary" onClick={()=>deleteProduct(item._id)} >Delete</button></td>          {/* take id from  */}
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default Products;