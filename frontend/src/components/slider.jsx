import { useEffect, useState } from 'react';
import { api } from '../configApi/configs';
import '../styles/slider.css'
const Slider = ({ mode, close, ref, isOpen }) => {
    const [next, setNext] = useState(true);
    const [back, setBack] = useState(false);
    const [data, setData] = useState({ loaner: '', statut: '', start: '', end: '' });
    const [tools, setTools] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const handleNext = () => {
        setNext(!next);
        setBack(!back);
    }
    const handleChecked = (value) => {
        const id = parseInt(value, 10);
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelectedIds, id];
            }
        })
        console.log(selectedIds.length)
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const getToolsActive = async () => {
        await api.get('/api/tools')
            .then(result => {
                setTools(result.data.tools);
            })
            .catch(error => console.log(error.result?.message || error.message));

    }

    const getLoan = async () => {
        const loanId = ref;
        await api.get(`/api/loan/${loanId}`)
            .then(result => {
                console.log(result);
                setData({
                    ...data, loaner: result.data.loan.loaner,
                    statut: result.data.loan.statut, start: result.data.loan.start, end: result.data.loan.end
                });
            })
            .catch(error => error.result?.message || error.message);

    }

    const loanData = {
        ...data,
        toolsIds: selectedIds,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`${mode} loan device`)
        console.log(loanData);

        if (mode === 'new') {
            await api.post("api/loan", loanData)
                .then(result => {
                    console.log(result.data);
                    close();
                })
                .catch(error => console.log(error.result?.message || error.message))
        } else {
            const loanId = ref;
            await api.put(`api/loan/${loanId}`, loanData)
                .then(result => {
                    console.log(result.data);
                    close();
                })
                .catch(error => error.result?.message || error.message)
        }

    };
    const formatForDateTimeInput = (isoDate) => {
        const date = new Date(isoDate);
        
        // Compensation du décalage horaire (timezone)
        const timezoneOffset = date.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(date.getTime() - timezoneOffset);
        
        // Formatage YYYY-MM-DDTHH:MM
        return adjustedDate.toISOString().slice(0, 16);
    }

    useEffect(() => {
        getToolsActive();
        if (mode === 'edit') {
            getLoan();
        }
    }, [ref])

    return (
        <div className="fixed inset-0 flex">
            <div className="fixed inset-0 bg-gray-600 opacity-50" ></div>
            <div className={`ml-auto bg-white w-80 h-full shadow-lg rounded-sm ${isOpen ? 'slide-in' : 'slide-out'}`}>
                <div className='flex justify-end px-2 py-1 font-semibold'>
                    <button className='btn btn-xs' onClick={close}>x</button>
                </div>
                <h3 className='text-md font-semibold text-indigo-500 px-4 mb-2'>{mode === 'new' ? 'New Emprunts' : 'Edit Emprunts'}</h3>
                <form onSubmit={handleSubmit} className="relative overflow-hidden h-[100%]">
                    {/* 01 */}
                    <div className={next ? 'absolute left-2 px-2 duration-200' : 'absolute left-[-450px] duration-200'}>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="loaner" className='text-sm text-gray-700'>Loaner name:</label>
                            <input type="text" name="loaner" className="w-full border border-indigo-500 rounded-sm p-1 focus:outline-none"
                                value={data.loaner}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="date" className='text-sm text-gray-700'>Duration</label>
                            <input type="datetime-local" className='w-full border border-indigo-500 rounded-sm p-1 text-gray-400 focus:outline-none' name='start'
                                value={data.start ? formatForDateTimeInput(data.start) : ""}
                                onChange={handleChange}
                            />
                            <input type="datetime-local" className='w-full border border-indigo-500 rounded-sm p-1 text-gray-400 mt-2 focus:outline-none' name="end"
                                value={data.end ? formatForDateTimeInput(data.end) : ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="statut" className='text-sm text-gray-700'>Statut</label>
                            <input type="text" name="statut" className="w-full border border-indigo-500 rounded-sm p-1 focus:outline-none"
                                value={data.statut}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-5">
                            <button className="text-sm text-white bg-gray-400 rounded-sm px-3 py-1 hover:bg-gray-500 hover:cursor-pointer" onClick={() => { close(); }}>Cancel</button>
                            <button type="button" className="text-sm text-white bg-indigo-500 rounded-sm px-3 py-1 hover:bg-indigo-700  hover:cursor-pointer" onClick={() => { handleNext(); }}>Next</button>
                        </div>
                    </div>
                    {/* 02 */}
                    <div className={back ? 'absolute left-2 px-2 duration-200' : 'absolute left-[450px] duration-200'}>
                        <h3 className='text-md font-semibold mb-2'>Select tools:</h3>
                        {
                            tools.length === 0 ? <span>No device avalaible</span> :
                                tools.map((value) => (
                                    <div key={value.id} className='flex gap-3 mb-2' >
                                        <input type="checkbox" className='checkbox w-5 h-5'
                                            value={value.id}
                                            checked={selectedIds.includes(value.id)}
                                            onChange={() => handleChecked(value.id)}
                                        />
                                        <span>{value.name}</span>
                                    </div>
                                ))
                        }
                        {/*<div className="mb-4">
                            <h4 className="font-semibold">Matériels sélectionnés :</h4>
                            {selectedIds.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {tools
                                        .filter((tool) => selectedIds.includes(tool.id))
                                        .map((tool) => (
                                            <li key={tool.id}>{tool.name}</li>
                                        ))}
                                </ul>
                            ) : (
                                <p>Aucun matériel sélectionné.</p>
                            )}
                        </div>*/}
                        <div className="w-75 flex justify-end gap-2 mt-5">
                            <button type='button' className="text-sm text-white bg-gray-400 rounded-sm px-4 py-1 hover:bg-gray-500 hover:cursor-pointer" onClick={() => { handleNext() }}>Back</button>
                            <button type="submit" className="text-sm text-white bg-indigo-500 rounded-sm px-4 py-1 hover:bg-indigo-700  hover:cursor-pointer ">{mode === 'new' ? 'Save' : 'Update'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Slider;