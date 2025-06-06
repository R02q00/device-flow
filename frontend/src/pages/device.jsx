import Back from "../components/back";
import {IoIosAdd as Add} from "react-icons/io"
import Modal from "../components/modal";
import { useEffect, useState } from "react";
import { api } from "../configApi/configs";
import { CiTrash } from "react-icons/ci";
import { MdEditNote} from "react-icons/md";
import {HiDotsVertical} from 'react-icons/hi'


export default function Device({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('add');
    const handleOpen = (mode) =>{
        setIsOpen(true);
        setMode(mode);
    };
    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedId, setSelectedId] = useState(0);

    const handleSelectedChecked = (value) =>{
        const id = parseInt(value, 10)
        setSelectedIds((prevSelectedIds) => {
            if(prevSelectedIds.includes(id)){
                return prevSelectedIds.filter((selectedId) => selectedId !== id);

            }else{
                return [...prevSelectedIds, id];
            }
        })
        console.log(selectedIds)
    }
    const handleDelete = async() => {
        
        for(const id of selectedIds){
            await api.delete(`api/tools/${id}`)
                .then(result => {
                    console.log(result.data)
                    setSelectedIds([]);
                    getAlltools();

                })
                .catch(error => console.log(error.result?.message || error.message))
        }
    }
    const getAlltools = async() => {
        await api.get("/api/tools")
            .then(result => {
                setData(result.data.tools);
            })
            .catch(error => console.log(error.result?.message || error.message))
    }

    useEffect(()=>{
        getAlltools();

    },[])
    
    return(
        <div className="relative h-[100vh]">
        <Back href={"home"} title={"Device"}/>
        <div className="w-full flex justify-end items-center gap-3 pr-4">
            {
                selectedIds.length !== 0 ? <CiTrash className="text-xl text-red-500 rounded-sm hover:bg-red-100 hover:cursor-pointer active:text-red-600" onClick={() => {handleDelete()}}/> : null
            }
            <HiDotsVertical className="text-xl text-indigo-500 rounded-sm hover:bg-gray-100 hover:cursor-pointer active:text-indigo-700"/>
        </div>
        <div className="overflow-x-auto">
            <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th>
                    </th>
                    <th>Photo</th>
                    <th>Sequence number</th>
                    <th>Name</th>
                    <th>Statut</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {   data.length === 0 ? <tr><td>No device for moment</td></tr> :
                    data.map((value) => (
                        <tr key={value.id}>
                        <td>
                            <label>
                            <input type="checkbox" className="checkbox w-5 h-5"
                                value={value.id}
                                checked={selectedIds.includes(value.id)}
                                onChange={() => {handleSelectedChecked(value.id)}}
                            />
                            </label>
                        </td>
                        <td>
                            <div className="flex items-center">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                    <img
                                        src={`http://localhost:3000/Public/tools/${value.photo}`}
                                        alt="tools photo" />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>{value.sequence_number}</td>
                        <td>
                            {value.name}
                        </td>
                        <td>{value.statut}</td>
                        <td className="flex items-center justify-center py-6">
                            <MdEditNote onClick={()=>{handleOpen('edit'), setSelectedId(value.id)}} className="text-xl text-indigo-600 cursor-pointer active:text-indigo-700"/>
                        </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
        {/* section modal */}
        <div className="absolute bottom-2 right-2 p-2 bg-indigo-500 rounded-full hover:cursor-pointer active:bg-indigo-700">
            <Add className="text-white text-2xl" onClick={()=>{handleOpen('add')}}/>
        </div>
        {isOpen ? <Modal mode={mode} id={selectedId} refresh={getAlltools} isOpen={isOpen} onClose={()=>{setIsOpen(false)}}/> : null}
      </div>
    );
}