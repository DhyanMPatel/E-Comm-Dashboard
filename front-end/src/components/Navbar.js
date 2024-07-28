import React from "react";
import { Link, useNavigate } from 'react-router-dom'
const Nav = () => {
    const auth = localStorage.getItem('user')

    const navigate = useNavigate();            // rerender this and check any thing is remaining to rerender?

    const logout = () => {
        localStorage.removeItem('user');       // remove user
        navigate('/signup')                    // Navigate to Sign Up page
    }
    return (
        <nav className="Navbar">
            {/* <div className="logo NavbarBrand">E-Comm</div> */}
            <img className="logo NavbarBrand w-34 h-16" src="https://cdn.kwork.com/files/portfolio/t0/19/fe5d85ab72671d514e3a79b36425be9e4be468f9-1658487219.webp" alt="Logo" />
            <ul className="flex flex-row items-center ">

                {auth ?
                    <>
                        <li className="NavLink"><Link to='/'>Products</Link></li>
                        <li className="NavLink"><Link to='/add'>Add Product</Link></li>
                        <li className="NavLink"><Link to='/update'>Update Product</Link></li>
                        <li className="NavLink"><Link to='/profile'>Profile</Link></li>
                        <li className="NavLink pr-1"><Link onClick={logout} to='/signup'>Logout</Link></li>   {/*   /// when u click on Logout button it will autometically navigate to Signup and delete previous user    */}
                    </>
                    : <>
                        <li className="NavLink pr-1"><Link to='/signup'>Sign Up</Link></li>
                        <li className="NavLink"><Link to='/login'>Login</Link></li>     {/*     /// display Login or Not    */}
                    </>
                }


            </ul>
        </nav>
    )
}
export default Nav;
