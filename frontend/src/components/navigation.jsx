import React, { useEffect, useState } from "react";
import { FaList, FaHands } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoHelp } from "react-icons/io5";
import { GoRelFilePath } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";

const Navigation = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const navigate = useNavigate();
    const routeOptions = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <GoRelFilePath />,
            keywords: ["accueil", "tableau", "stats"]
        },
        {
            path: "/device",
            name: "Device",
            icon: <GoRelFilePath />,
            keywords: ["appareils", "add", "outils"]
        },
        {
            path: "/loan",
            name: "Emprunts",
            icon: <GoRelFilePath />,
            keywords: ["add", "emprunter", "reservation"]
        },
        {
            path: "/about",
            name: "Aide",
            icon: <GoRelFilePath />,
            keywords: ["aide", "support", "documentation", "help"]
        }
    ];

    const filtered = routeOptions.filter(option => 
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

        option.keywords.some(kw => 
            kw.toLowerCase().includes(searchTerm.toLowerCase()
        )
    ));

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSuggestions([]);
            return;
        }
        setSuggestions(filtered);
    }, [searchTerm]);

    const handleSuggestionClick = (path) => {
        navigate(path);
        setSearchTerm("");
        setShowSuggestions(false);
    };
    return (
        <div className="w-full h-[100vh] bg-base-100 flex flex-col">
            <Header />
            <div className="flex flex-col items-center gap-8 p-6 max-w-4xl mx-auto">
                <div className="relative w-full md:w-3/4 lg:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-500 text-lg" />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white shadow-xs focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700"
                        placeholder="Search ..."
                        onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true) }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <div className="w-full text-left">
                        {suggestions.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 hover:text-indigo-500 cursor-pointer"
                                onClick={() => handleSuggestionClick(item.path)}
                            >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mt-10">
                    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300
                        border border-gray-100 hover:border-blue-100 cursor-pointer group"
                        onClick={() => navigate('/dashboard')}>
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                                <MdDashboard className="text-blue-600 text-2xl" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                Dashboard
                            </h2>
                            <p className="text-sm text-gray-500">Overview</p>

                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300
                            border border-gray-100 hover:border-green-100 cursor-pointer group"
                        onClick={() => navigate('/device')}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                                <FaList className="text-green-600 text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                                Device
                            </h3>
                            <p className="text-sm text-gray-500">Device list</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300
                        border border-gray-100 hover:border-purple-100 cursor-pointer group"
                        onClick={() => navigate('/loan')}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                                <FaHands className="text-purple-600 text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                Emprunts
                            </h3>
                            <p className="text-sm text-gray-500">Emprunts list</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300
                            border border-gray-100 hover:border-orange-100 cursor-pointer group"
                        onClick={() => navigate('/about')}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                                <IoHelp className="text-orange-600 text-2xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                                Aide
                            </h3>
                            <p className="text-sm text-gray-500">Documentation</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigation;