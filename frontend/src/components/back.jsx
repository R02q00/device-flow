import React from "react";
import {useNavigate} from "react-router-dom"
import { FaArrowLeft as Preview } from "react-icons/fa";

const Back = ({href, title}) =>{
    const navigate = useNavigate();
    return(
        <div className="px-3 py-2 flex items-center gap-3"> 
            <Preview className="cursor-pointer" onClick={()=>navigate(`/${href}`)}/>
            <h3 className="text-xl">{title}</h3>
        </div>
    );
}
export default Back;