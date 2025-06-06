import { useState } from 'react';
import Back from '../components/back.jsx'
import Slider from '../components/slider.jsx';
import { IoIosAdd as Add } from 'react-icons/io';
import { CiTrash } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
export default function Loan({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('new');
    const handleOpen = (mode) => {
        setIsOpen(!isOpen);
        setMode(mode);
    }
    return(
        <div className="h-[100vh] relative">
            <Back href={"home"} title={"Loan a device"}/>
            <div className="w-full flex justify-end items-center gap-3 pr-3">
            
            <HiDotsVertical className="text-xl text-indigo-500 rounded-sm hover:bg-gray-100 hover:cursor-pointer active:text-indigo-500"/>
        </div>
            <div className='absolute bottom-2 right-2 rounded-full bg-indigo-500 flex items-center justify-center p-2 mr-2'>
                <Add className="text-white text-2xl cursor-pointer" onClick={()=>{handleOpen('new')}}/>
            </div>
            {isOpen ? <Slider mode={mode} close={() => setIsOpen(!isOpen)}/> : null}
        </div>

    );
}