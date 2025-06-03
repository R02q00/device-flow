import { useState } from 'react';
import Back from '../components/back.jsx'
import Slider from '../components/slider.jsx';
export default function Loan({}) {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    return(
        <div className="">
            <Back href={"home"} title={"Loan a tools"}/>
            <div className='flex justify-end px-2'>
                <button className='text-xs text-white bg-indigo-500 rounded-sm px-2 py-1 hover:bg-indigo-600 cursor-pointer'
                    onClick={()=> handleOpen()}
                >New loan</button>
            </div>
            {isOpen ? <Slider close={() => setIsOpen(!isOpen)}/> : null}
        </div>

    );
}