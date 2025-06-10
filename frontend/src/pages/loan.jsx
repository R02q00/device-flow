import { useEffect, useState } from 'react';
import Back from '../components/back.jsx'
import Slider from '../components/slider.jsx';
import { IoIosAdd as Add } from 'react-icons/io';
import { CiTrash } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import { api } from '../configApi/configs.js';

export default function Loan({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('new');
    const [loan, setLoan] = useState([]);
    const handleOpen = (mode) => {
        setIsOpen(!isOpen);
        setMode(mode);

    }
    const getLoan = async() => {
        await api.get("/api/loan")
            .then(result=>{
                setLoan(result.data.loans);
            })
            .catch(error => {
                console.log(error.result?.message || error.message);
            })
    }
    const handleDelete = async (ref) => {
        await api.delete(`/api/loan/${ref}`)
            .then(result => {
                console.log(result);
                getLoan();
            })
            .catch(error => {
                console.log(error.result?.message || error.message)
            })
    };

    useEffect(() => {
        getLoan();

    },[])

    return(
        <div className="h-[100vh] relative">
            <Back href={"home"} title={"Loan a device"}/>
            <div className="w-full flex justify-end items-center gap-3 pr-3">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button">
                        <HiDotsVertical className="text-xl text-indigo-500 rounded-sm hover:text-indigo-700 hover:cursor-pointer active:text-indigo-700"/>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>A-Z</a></li>
                        <li><a>Z-A</a></li>
                    </ul>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Loaner</th>
                            <th>Device</th>
                            <th>Duration</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loan.map( (value) => (
                                <tr key={value.id}>
                                    <td>{value.loaner}</td>
                                    <td>{value.tools}</td>
                                    <td>
                                        <div className='flex gap-2'>
                                            <span>{value.start}</span>
                                            <span>{value.end}</span>
                                        </div>
                                    </td>
                                    <td>{value.statut}</td>
                                    <td>
                                        <div className='flex justify-end gap-1'>
                                            <button className='btn btn-xs bg-indigo-500 text-white' onClick={()=> handleOpen('edit')}>Edit</button>
                                            <button className='btn btn-xs bg-red-400 text-white' onClick={()=> handleDelete(value.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className='absolute bottom-2 right-2 rounded-full bg-indigo-500 flex items-center justify-center p-2 mr-2'>
                <Add className="text-white text-2xl cursor-pointer" onClick={()=>{handleOpen('new')}}/>
            </div>
            {isOpen ? <Slider mode={mode} close={() => setIsOpen(!isOpen)}/> : null}
        </div>

    );
}