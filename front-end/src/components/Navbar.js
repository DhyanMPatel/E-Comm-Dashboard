import React from "react";
import { Link } from 'react-router-dom'
const Nav = () => {
    const auth = localStorage.getItem('user')
    return (
        <nav className="Navbar">
            <div className="logo NavbarBrand">E-Comm</div>
            <ul className="flex flex-row items-center ">
                <li className="NavLink"><Link to='/'>Products</Link></li>
                <li className="NavLink"><Link to='/add'>Add Product</Link></li>
                <li className="NavLink"><Link to='/update'>Update Product</Link></li>
                <li className="NavLink"><Link to='/profile'>Profile</Link></li>
                <li className="NavLink pr-1">
                    {auth ?
                        <Link to='/logout'>Logout</Link>
                        : <Link to='/signup'>Sign Up</Link>
                    }
                </li>

            </ul>
        </nav>
    )
}
export default Nav;