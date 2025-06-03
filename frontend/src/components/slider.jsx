import { useState } from 'react';
const Slider = ({close}) => {
    const [data, setData] = useState({
        name: '',
        tools: [],
        statut: '',
        start: '',
        end: '',
    });
    const handleSubmit = (event) => {
        event.preventDefault();

    }
    
    return(
        <div className="fixed inset-0 flex">
            <div className="fixed inset-0 bg-gray-600 opacity-50" ></div>
            <div className="ml-auto bg-white sm:w-64 md:w-[40%] lg:w-[35%] h-full shadow-lg transition-transform transform translate-x-0">
                <h3 className='text-md font-semibold text-indigo-500'>New Loan</h3>
                <form onSubmit={handleSubmit} className="p-2">
                    <div className="">
                        <label htmlFor="loaner">Name:</label>
                        <input type="text" name="loaner" className="w-full border border-indigo-500 rounded-sm p-1 focus:outline-none"/>
                    </div>
                    <div>
                        <label htmlFor="">Select tools</label>
                        <select name="" id="">
                            <option value="">Projector</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Statut</label>
                        <input type="text" name="statut" className="w-full border border-indigo-500 rounded-sm p-1 focus:outline-none"/>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button className="text-sm text-white bg-gray-400 rounded-sm px-2 hover:bg-gray-500 hover:cursor-pointer" onClick={close}>Cancel</button>
                        <button type="submit" className="text-sm text-white bg-indigo-500 rounded-sm px-2 hover:bg-indigo-700  hover:cursor-pointer ">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Slider;