import { useNavigate } from "react-router-dom";

export default function Device({}) {
    const navigate = useNavigate();
    return(
        <div className="px-3">
            <div className="">
                <button className="text-blue-500 text-2xl" onClick={()=>navigate('/home')}>&larr;</button>
            </div>
            <div>
                <h3>Device</h3>
            </div>
        </div>

    );
}