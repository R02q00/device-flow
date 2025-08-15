import React, { useEffect, useState } from "react"
import ThemeToggle from "./themeToggle.jsx";
import { useNavigate } from "react-router-dom"

export const Header = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate('/');
  }
  useEffect(() => {
    setEmail(localStorage.getItem("email"));

  }, [])
  return (
    <div className="h-15 flex justify-between items-center px-4 bg-white dark:bg-gray-700">
      <h3 className="text-xl text-bold">
        <span className="text-red-500 font-bold">DEVICE</span>
        <span className="font-bold dark:text-white">-FLOW</span>
      </h3>
      <div className="flex items-center justify-center gap-2">
        <ThemeToggle />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar">
            <div className="w-10 rounded-full dark:bg-white">
              <img
                alt="alt"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-sm z-1 mt- w-52 p-2 shadow">
            <span className="px-2 py-2 text-gray-600 ">{email}</span>
          </ul>
        </div>
      </div>

    </div>
  )
}