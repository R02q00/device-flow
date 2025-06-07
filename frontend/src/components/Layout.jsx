import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Signin from '../Authentification/signin.jsx'
import { api } from "../configApi/configs";
import Navigation from "./navigation.jsx";

const Layout = () => {
    const navigate = useNavigate();
    const [tokenStatus, setTokenStatus]= useState(false);
    const token = localStorage.getItem("token");
    const getAcces = async() =>{
        await api.get("/api/test/admin", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(result => {
                console.log(result.data)
                setTokenStatus(!tokenStatus);
                navigate("/home")
            })
            .catch(error => {
                console.log(error.result?.message || error.message);
                navigate('/')
            })
    }
    useEffect(()=>{
        getAcces();
        
    }, [])

    return(
        <>
            {
                tokenStatus ? <Navigation/>  : navigate('/home')
            }
        </> 
    )
}
export default Layout