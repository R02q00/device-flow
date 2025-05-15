import { Outlet, Link ,NavLink, useNavigate} from "react-router-dom";
import React from 'react'
import {MdDashboard} from "react-icons/md"
import { FiSearch} from "react-icons/fi"
import {FaList, FaHands} from "react-icons/fa"
import { IoHelp } from "react-icons/io5"
import './Layout.css';

const Layout = () => {
    const navigate = useNavigate();
    return(
          <div className="w-full h-[100vh] bg-base-100 flex flex-col justify-center item-center gap-30">
              {/* title */}
              <div className='w-full flex flex-col items-center gap-10'>
                  <p className='text-xl text-gray-800 text-center font-bold pointer-events-none'>Welcome to <span className="text-red-500">DEVICE</span><span>-FLOW</span></p>
                  <div className="relative w-[75%]">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-evetns-none">
                          <FiSearch className='text-gray-400'/>
                      </div>
                      <input 
                          type="text"
                          name=""
                          id="" 
                          className='w-full block pl-10 pr-3 py-3 border border-gray-300 rounded-lg
                          bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          placeholder='Search'
                      />
                  </div>
              </div>
              
              {/* card */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-col justify-center items-center gap-2 cursor-pointer"
                        onClick={()=> navigate('/dashboard')}
                      >
                          <div className="p-3 bg-blue-100 rounded-full">
                              <MdDashboard className='text-blue-600 text-xl'/>
                          </div>
                          <h2 className='text-xl font-semibold text-gray-800'>Dashboard</h2>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={()=> navigate('/device')}
                      >
                          <div className="p-3 bg-blue-100 rounded-full">
                              <FaList className='text-blue-600 text-xl'/>
                          </div>
                          <h3 className='text-xl font-semibold text-gray-800'>Device</h3>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={()=> navigate('/loan')}
                      >
                          <div className="p-3 bg-blue-100 rounded-full">
                              <FaHands className='text-blue-600 text-xl'/>
                          </div>
                          <h3 className='text-xl font-semibold text-gray-800'>Emprunts</h3>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-col justify-center items-center gap-2 cursor-pointer"
                        onClick={()=> navigate('/about')}
                      >
                          <div className="p-3 bg-blue-100 rounded-full">
                              <IoHelp className='text-blue-600 text-xl'/>
                          </div>
                          <h3 className='text-xl font-semibold text-gray-800'>About</h3>
                      </div>
                  </div>
              </div>
          </div>

    )
}

export default Layout