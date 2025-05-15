import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Validate from "./validate";

export default function Signin() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        userName: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});

    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrors(Validate(data));
        if(errors.userName === "" && errors.password === ""){
            console.log(data);
            navigate('/home')
        }
        //send data to api
    }
    return(
        <section className="max-w-md mx-auto mt-5 p-10 bg-white shadow-sm rounded-lg">
            
            <div className="">
                <div className="relative h-25 flex justify-center rounded-t-lg pt-5
                bg-linear-to-t from-white to-gray-950 blur-[0.5px]">
                    <h3 className="text-red-600 font-bold">DEVICE</h3>
                    <h3 className="text-white font-bold">-FLOW</h3>
                    <h1 className="absolute top-15 text-center">CONNEXION</h1>
                </div>
                <form onSubmit={handleSubmit}>

                    {/*Username*/}
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="userName"
                            value={data.userName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.userName && <span className="text-sm text-red-400">{errors.userName}</span>}
                    </div>
                    
                    {/* Password*/}
                    <div className="mb-2">
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
                    <div className="mb-6 flex justify-end px-1">
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm text-gray-600 hover:text-gray-800"
                        >
                            {showPassword ? "hide" : "show"}
                        </button>
                    </div>
                    {/*button submit*/}
                    <button
                        type="submit"
                        className="w-full bg-gray-950 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Signin
                    </button>

                </form>
                <p className=" text-gray-500 mt-4">
                    Don't have a account ?
                    <button
                        className="text-blue-500 text-semibold ml-1"
                        onClick={()=> navigate('/signup')}
                    >
                        Create account
                    </button>
                </p>
            </div>
        </section>
    )
}