import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Validate from "./validate";
export default function Signup() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        userName: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});

    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrors(Validate(data));
        if (errors.userName==="" && errors.email==="" && errors.password==="") {
            console.log(data);
            navigate("/")
        }
    }
    return(
        <div className="mt-5">
            <div className="max-w-md mx-auto p-10 bg-white rounded-lg shadow-md">
                <div className="relative h-20 flex justify-center rounded-t-lg pt-5
                bg-linear-to-t from-white to-gray-950 blur-[0.5px]">
                    <h3 className="text-red-600 font-bold">DEVICE</h3>
                    <h3 className="text-white font-bold">-FLOW</h3>
                    <h1 className="absolute top-15 text-center">INSCRIPTION</h1>
                </div>
                <form onSubmit={handleSubmit}>

                    {/*Username*/}
                    <div className="mb-2">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={data.userName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.userName && <span className="text-sm text-red-400">{errors.userName}</span>}
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
                            focus:outline-none focus:ring-2 focus:ring-gray-400"
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
                            focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.password && <span className="text-sm text-red-400">{errors.password}</span>}
                    </div>
                    <div className="mb-4 mt-1 flex justify-end gap-2 px-1">
                        <input 
                            type="checkbox"
                            id="showPassword"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-600 hover:text-gray-800">
                            Afficher mot de passe ?
                        </label>
                    </div>

                    {/*button submit*/}
                    <button
                        type="submit"
                        className="w-full bg-gray-950 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Signup
                    </button>

                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Have an account !
                    <button 
                        className="text-blue-500 font-semibold ml-1"
                        onClick={()=> navigate('/')}
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    )
}