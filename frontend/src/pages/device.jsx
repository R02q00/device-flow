import Back from "../components/back";
import { IoIosAdd as Add } from "react-icons/io"
import Modal from "../components/modal";
import { useEffect, useState } from "react";
import { api } from "../configApi/configs";
import { CiTrash } from "react-icons/ci";
import { MdEditNote } from "react-icons/md";
import { HiDotsVertical } from 'react-icons/hi'
import { FiSearch, FiX } from "react-icons/fi";

export default function Device({ }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('add');
    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [termSearch, setTermSearch] = useState('');

    const handleOpen = (mode) => {
        setIsOpen(true);
        setMode(mode);
    };

    const handleSelectedChecked = (value) => {
        const id = parseInt(value, 10)
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id);

            } else {
                return [...prevSelectedIds, id];
            }
        })
        console.log(selectedIds)
    }
    const handleDelete = async () => {
        for (const id of selectedIds) {
            await api.delete(`api/tools/${id}`)
                .then(result => {
                    console.log(result.data)
                    setSelectedIds([]);
                    getAlltools();

                })
                .catch(error => console.log(error.result?.message || error.message))
        }
    }
    const getAlltools = async () => {
        await api.get("/api/tools")
            .then(result => {
                console.log(result.data);
                setData(result.data.tools);
            })
            .catch(error => console.log(error.result?.message || error.message))
    }

    const filteredDevice = data.filter(device => {
        const value = termSearch.toLocaleLowerCase();
        return (
            device.name.toLocaleLowerCase().includes(value) ||
            device.statut.toLocaleLowerCase().includes(value)
        );

    })

    useEffect(() => {
        getAlltools();

    }, [])

    return (
        <div className="relative h-[100vh]">
            <Back href={"home"} title={"Device list"} />
            <div className="w-full flex justify-end items-center gap-2 pr-2">
                {
                    selectedIds.length !== 0 ? <div className="btn"><CiTrash className="text-xl text-red-500 hover:cursor-pointer active:text-red-700" onClick={() => { handleDelete() }} /></div> : null
                }
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Search ..."
                        value={termSearch}
                        onChange={(e) => setTermSearch(e.target.value)}
                    />
                    {termSearch && (
                        <button
                            onClick={() => setTermSearch('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <FiX className="text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn px-2">
                        <HiDotsVertical className="text-xl text-indigo-500 rounded-sm hover:text-indigo-700 hover:cursor-pointer active:text-indigo-700" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>A-Z</a></li>
                        <li><a>Z-A</a></li>
                    </ul>
                </div>
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
                        {filteredDevice.length === 0 ?
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-500">No device for moment</td>
                            </tr> :

                            filteredDevice.map((value) => (
                                <tr key={value.id}>
                                    <td>
                                        <label>
                                            <input type="checkbox" className="checkbox w-5 h-5"
                                                value={value.id}
                                                checked={selectedIds.includes(value.id)}
                                                onChange={() => { handleSelectedChecked(value.id) }}
                                            />
                                        </label>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={`http://localhost:3000/tools/${value.photo}`}
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
                                        <MdEditNote onClick={() => { handleOpen('edit'); setSelectedId(value.id) }} className="text-xl text-indigo-600 cursor-pointer active:text-indigo-700" />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* section modal */}
            <div className="absolute bottom-2 right-2 p-2 bg-indigo-500 rounded-full hover:cursor-pointer active:bg-indigo-700">
                <Add className="text-white text-2xl" onClick={() => { handleOpen('add') }} />
            </div>
            {isOpen ? <Modal mode={mode} id={selectedId} refresh={getAlltools} isOpen={isOpen} onClose={() => { setIsOpen(false) }} /> : null}
        </div>
    );
}