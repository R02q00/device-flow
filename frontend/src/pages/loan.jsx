import { useEffect, useState } from 'react';
import Back from '../components/back.jsx';
import Slider from '../components/slider.jsx';
import { IoIosAdd as Add } from 'react-icons/io';
import { CiTrash, CiEdit } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import { api } from '../configApi/configs.js';
import { FiClock, FiUser, FiHardDrive, FiActivity, FiSearch, FiX } from 'react-icons/fi';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import fr from 'javascript-time-ago/locale/fr';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fr);

export default function Loan({ }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('new');
    const [loans, setLoans] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [termSearch, setTermSearch] = useState('');

    const filteredLoan = loans.filter(loan => {
        const search = termSearch.toLocaleLowerCase();
        return (
            loan.loaner.toLowerCase().includes(search) ||
            loan.statut.toLowerCase().includes(search) ||
            loan.tools.some(tool => tool.name.toLowerCase().includes(search))
        );

    })

    const handleOpen = (mode) => {
        setIsOpen(!isOpen);
        setMode(mode);

    }
    const getLoan = async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/api/loan");
            setLoans(response.data.loans);
        } catch (error) {
            console.error("Error fetching loans:", error);
            console.log(error.result?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }
    const handleDelete = async (ref) => {
        await api.delete(`/api/loan/${ref}`)
            .then(result => {
                console.log(result.data.message);
                getLoan();
            })
            .catch(error => {
                console.log(error.result?.message || error.message)
            })
    };

    useEffect(() => {
        getLoan();

    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }
    return (
        <div className="h-[100vh] relative">
            <Back href={"home"} title={"Loan List"} />
            <div className="flex justify-end items-center space-x-2 mb-3 px-3">
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
                    <div tabIndex={0} role="button" className="p-2 border border-gray-200 rounded-sm">
                        <HiDotsVertical className="text-xl text-indigo-500" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 ounded-box w-52">
                        <li className='hover:bg-gray-200 rounded-sm'><a>A-Z</a></li>
                        <li className='hover:bg-gray-200 rounded-sm'><a>Z-A</a></li>
                    </ul>
                </div>
            </div>
            <div className='overflow-x-auto mt-5 px-3'>
                <table className='table'>
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">
                                <div className="flex items-center gap-2">
                                    <FiUser className="text-gray-500" />
                                    <span>Loaner</span>
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left">
                                <div className="flex items-center gap-2">
                                    <FiHardDrive className="text-gray-500" />
                                    <span>Device</span>
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left">
                                <div className="flex items-center gap-2">
                                    <FiClock className="text-gray-500" />
                                    <span>Delay</span>
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left">
                                <div className="flex items-center gap-2">
                                    <FiActivity className="text-gray-500" />
                                    <span>Status</span>
                                </div>
                            </th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLoan.length > 0 ? (
                            filteredLoan.map((loan) => (
                                <tr key={loan.id} className="border-b border-gray-100">
                                    <td className="py-4 px-4 font-medium text-gray-800">
                                        {loan.loaner}
                                    </td>
                                    <td className="py-4 px-4">
                                        {loan.tools.length > 0 ? (
                                            <ul className="flex flex-wrap gap-1">
                                                {loan.tools.map(tool => (
                                                    <li key={tool.id} className="badge badge-outline">
                                                        {tool.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-gray-400">No device loaned</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500">
                                                {new Date(loan.start).toLocaleDateString('fr-FR')}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                <ReactTimeAgo date={new Date(loan.end)} locale="fr-FR" />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${loan.statut === 'actif' ? 'bg-green-100 text-green-800' :
                                            loan.statut === 'en retard' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {loan.statut}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => { handleOpen('edit'); setSelectedId(loan.id); }}
                                                className="btn btn-ghost btn-xs text-indigo-600 hover:bg-indigo-50"
                                            >
                                                <CiEdit className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(loan.id)}
                                                className="btn btn-ghost btn-xs text-red-600 hover:bg-red-50"
                                            >
                                                <CiTrash className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500">
                                    No loan for a moment
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='absolute bottom-2 right-2 rounded-full bg-indigo-500 flex items-center justify-center p-2 mr-2'>
                <Add className="text-white text-2xl cursor-pointer" onClick={() => { handleOpen('new') }} />
            </div>
            {isOpen && (
                <Slider
                    mode={mode}
                    isOpen={isOpen}
                    close={() => setIsOpen(false)}
                    ref={selectedId}
                    onSuccess={getLoan}
                />
            )}
        </div>

    );
}