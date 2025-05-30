import { useNavigate } from "react-router-dom";
import Back from "../components/back";
import {IoIosAdd as Add} from "react-icons/io"
import Modal from "../components/modal";
import { useEffect, useState } from "react";
export default function Device({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('add');
    const handleOpen = (mode) =>{
        setIsOpen(true);
        setMode(mode);
    };
    useEffect(()=>{

        
    },[])
    
    return(
        <div className="relative h-[100vh]">
        <Back href={"home"} title={"Device"}/>
        <div className="overflow-x-auto">
            <table className="table">
            {/* head */}
            <thead>
                <tr>
                <td>
                    <label>
                    <input type="checkbox" className="checkbox h-5 w-5" />
                    </label>
                </td>
                <th>Photo</th>
                <th>Name</th>
                <th>Statut</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* row 2 */}
                <tr>
                <td>
                    <label className="">
                    <input type="checkbox" className="checkbox w-5 h-5" />
                    </label>
                </td>
                <td>
                    <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                        <img
                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Brice Swyre</div>
                    </div>
                    </div>
                </td>
                <td>
                    Carroll Group
                </td>
                <td>good</td>
                <td>
                    <button className="btn btn-ghost btn-xs" onClick={()=>{handleOpen('edit')}}>Edit</button>
                    <button className="btn btn-ghost btn-xs" onClick={()=>{handleOpen('edit')}}>Delete</button>
                </td>
                </tr>
                {/* row 3 */}
                <tr>
                <th>
                    <label>
                    <input type="checkbox" className="checkbox h-5 w-5" />
                    </label>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                        <img
                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Marjy Ferencz</div>
                    </div>
                    </div>
                </td>
                <td>
                    Rowe-Schoen
                </td>
                <td>good</td>
                <td>
                    <button className="btn btn-ghost btn-xs">Edit</button>
                    <button className="btn btn-ghost btn-xs">delete</button>

                </td>
                </tr>
            </tbody>
            </table>
        </div>
        {/* section modal */}
        <div className="absolute bottom-5 right-2 p-2 bg-gray-400 rounded-full cursor-pointer">
            <Add className="text-white text-2xl" onClick={()=>{handleOpen('add')}}/>
        </div>
        {isOpen ? <Modal mode={mode} isOpen={isOpen} onClose={()=>{setIsOpen(false)}}/> : null}
      </div>
    );
}