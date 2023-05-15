import { redirectEmployee } from "@/utils/redirectEmployee";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import SelectCampus from "../SelectCampus";
import Head from "next/head";
import { ClipLoader } from "react-spinners";
import { schoolName } from "@/utils/schoolName";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [employee, setEmployee] = useState({})
    const [togglesidebarondesktop, setTogglesidebarondesktop] = useState(false)
    const router = useRouter()
    const [localCampus, setLocalCampus] = useState('')
    const [campuses, setCampuses] = useState([])
    const [classes, setClasses] = useState([])
    const [fees, setFees] = useState([])
    const [total, setTotal] = useState({})


    const decodeEmployee = async (token) => {
        if (!token) return
        const res = await axios.post('/api/employee/decode', { token })
        return res.data
    }

    const handleLogout = () => {
        Cookies.remove('token')
        redirectEmployee('/login')
        localStorage.removeItem('campus')
        setEmployee({})
        setLocalCampus('')
    }

    useEffect(() => {
        setLocalCampus(localStorage.getItem('campus'))
        if (Cookies.get('token')) {
            decodeEmployee(Cookies.get('token'))
                .then((e) => {
                    setEmployee(e.employee)
                })
        }
    }, [])

    const fetchCampuses = async () => {
        const res = await axios.get('/api/campus/getall')
        setCampuses(res.data)
    }

    const fetchClasses = async (campus) => {
        if (campus) {
            const res = await axios.get('/api/classes/getall?campus=' + campus)
            setClasses(res.data)
        }
    }
    useEffect(() => {
        fetchCampuses()
        fetchClasses(localStorage.getItem('campus'))
    }, [])



    return (
        <AuthContext.Provider value={{
            employee, setEmployee, decodeEmployee,
            togglesidebarondesktop, setTogglesidebarondesktop, setLocalCampus, campuses, setCampuses, classes, setClasses,
            setFees, fees, total, setTotal, fetchClasses, handleLogout
        }}>

            {router.asPath === '/login' && children}
            {Object.keys(employee).length !== 0 && router.asPath !== '/login' && employee.isAdmin && !localCampus && (
                <SelectCampus localCampus={localCampus} setLocalCampus={setLocalCampus} employee={employee} setEmployee={setEmployee} />
            )}
            {Object.keys(employee).length !== 0 ? localCampus && children : router.asPath !== '/login' && (
                <>
                    <Head>
                        <title>loading...</title>
                    </Head>
                    <div className='p-5 w-full h-screen flex flex-1 justify-center items-center bg-slate-100 flex-col'>
                        <img className="w-28 h-28 animate-slow-popup scale-[1.8]" src='/logo.png' />
                        <h1 className="mt-8 text-xl md:text-4xl font-bold tracking-tighter text-gray-900">{schoolName}</h1>
                    </div>
                    {/* <div className='p-5 w-full h-screen flex flex-1 justify-center items-center '>
                        <ClipLoader
                            color="orange"
                            cssOverride={{}}
                            size={50}
                            speedMultiplier={1}
                        />
                    </div> */}
                </>

            )}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }