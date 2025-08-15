import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Validate from "./validate";
import { api } from "../configApi/configs";
import {MdDeviceHub} from "react-icons/md";
import loginImage from '../assets/photo.png';

export default function Signin() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});

    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors(Validate(data));
        if(errors.username === "" && errors.password === ""){
            await api.post("/api/auth/signin", data)
                .then(result => {
                    localStorage.setItem("token", result.data.accessToken);
                    localStorage.setItem("email", result.data.email);
                    navigate('/home');
                })
                .catch(error =>{
                    console.log(error.result?.message || error.message)
                })
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:w-1/2 flex flex- items-center justify-center p-8">
                        <img 
                            src={loginImage} 
                            alt="image connexion" 
                            className="sm:max-w-xs lg:max-w-sm object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-8 space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Log in</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/*Username*/}
                        <div className="mb-4">
                            <label htmlFor="username" className="text-sm font-medium mb-1 ">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                            />
                            {errors.username && <span className="text-sm text-red-400">{errors.username}</span>}
                        </div>
                        
                        {/* Password*/}
                        <div className="mb-2">
                            <label htmlFor="password" className="text-sm font-medium mb-1">
                                Password
                            </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                />
                            {errors.password && <span className="text-sm text-red-400">{errors.password}</span>}
                        </div>
                        <div className="mb-4 mt-1 flex justify-end gap-2 px-1">
                            <input 
                                type="checkbox"
                                id="showPassword"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPassword" className="text-sm hover:text-gray-800 cursor-pointer">
                                Afficher mot de passe ?
                            </label>
                        </div>
                        {/*button submit*/}
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Signin
                        </button>

                    </form>
                    <p className="text-sm text-gray-500 mt-4 text-gray-500">
                        Don't have a account ?
                        <button
                            className="text-blue-500 text-sm ml-1 cursor-pointer"
                            onClick={()=> navigate('/signup')}
                        >
                            Create account
                        </button>
                    </p>
                    </div>
                </div>
        </div>
    )
}
