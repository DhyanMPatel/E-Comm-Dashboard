import React from "react";
import { Link, useNavigate } from 'react-router-dom'
const Nav = () => {
    const auth = localStorage.getItem('user')

    const navigate = useNavigate();            // rerender this and check any thing is remaining to rerender?
    const logout = () =>{
        localStorage.removeItem('user');       // remove user
        navigate('/signup')                    // Navigate to Sign Up page
    }
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
                        <Link onClick={logout} to='/signup'>Logout</Link>
                        : <Link to='/signup'>Sign Up</Link>
                    }
                </li>

            </ul>
        </nav>
    )
}
export default Nav;
