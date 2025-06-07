import React from "react"
import { FaList } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate('/');
    }
    return( 
        <div className="h-20 flex justify-between items-center px-2">
            <FaList className='text-indigo-500 text-xl'/>
            <h3><span className="text-red-500">DEVICE</span><span>-FLOW</span></h3>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                
                <li onClick={()=> handleLogOut()}><a>Logout</a></li>
              </ul>
            </div>
        </div>
    )
}