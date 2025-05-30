import React from "react";
import {MdDeviceHub, MdHourglassEmpty, MdSettings } from "react-icons/md";

const Card = () =>{
    return(
        <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-1 px-2 py-2">
                  <div className="bg-white flex items-center p-4 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-full flex items-center gap-2 cursor-pointer">
                          <div className="p-5 bg-blue-100 rounded-sm">
                              <MdDeviceHub className='text-blue-500 text-xl'/>
                          </div>
                         <div className="w-full flex flex-col items-center">
                            <span>05</span>
                            <h3 className="text-gray-500">total</h3>
                         </div>
                      </div>
                  </div>
                  <div className="bg-white flex items-center p-4 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-full flex items-center gap-2 cursor-pointer">
                          <div className="bg-orange-100 rounded-sm p-5">
                              <MdHourglassEmpty className='text-red-500 text-xl'/>
                          </div>
                          <div className="w-full flex flex-col items-center">
                            <span>02</span>
                            <h3 className="text-gray-500">emprunt</h3>
                        </div>
                      </div>
                  </div>
                  <div className="bg-white flex items-center p-4 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-full flex items-center gap-2 cursor-pointer">
                        <div className="bg-red-100 rounded-sm p-5">
                            <MdSettings className='text-red-500 text-xl'/>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <span>01</span>
                            <h3 className="text-gray-500">rapare</h3>
                        </div>
                      </div>
                  </div>
            </div>
    )
}

export default Card;