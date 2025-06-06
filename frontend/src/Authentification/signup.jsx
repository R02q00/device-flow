import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Validate from "./validate";
import { api } from "../configApi/configs";

export default function Signup() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});

    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors(Validate(data));
        if (errors.username==="" && errors.email==="" && errors.password==="") {
            console.log(data);
            await api.post("/api/auth/signup", data)
                .then(result => {
                    console.log(result.data.message);
                    navigate('/');
                })
                .catch(error =>{
                    console.log(error.result?.message || error.message)
                })
        }

    }
    return(
        <div className="mt-5">
            <div className="max-w-md mx-auto p-10">
                <div className="mb-2">
                    <p className="font-bold text-center mb-2">
                        <span className="text-red-500">DEVICE</span>
                        <span className="text-gray-800">-FLOW</span>
                    </p>
                    <h1 className="text-gray-700 font-semibold">Create account</h1>
                </div>
                <form onSubmit={handleSubmit}>

                    {/*Username*/}
                    <div className="mb-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md
                            focus:outline-none "
                        />
                        {errors.username && <span className="text-sm text-red-400">{errors.username}</span>}
                    </div>

                    {/*email*/}

                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md
                            focus:outline-none"
                        />
                        {errors.email && <span className="text-sm text-red-400">{errors.email}</span>}
                    </div>
                    
                    {/* Password*/}
                    <div className="">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md
                            focus:outline-none"
                        />
                        {errors.password && <span className="text-sm text-red-400">{errors.password}</span>}
                    </div>
                    <div className="mb-4 mt-1 flex justify-end gap-2 px-1">
                        <input 
                            type="checkbox"
                            id="showPassword"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                            Afficher mot de passe ?
                        </label>
                    </div>

                    {/*button submit*/}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 
                        focus:outline-none"
                    >
                        Signup
                    </button>

                </form>
                <p className="text-sm text-gray-500 mt-4">
                    Have an account !
                    <button 
                        className="text-sm text-indigo-500  ml-1"
                        onClick={()=> navigate('/')}
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    )
}