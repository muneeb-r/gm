import { redirectEmployee } from "@/utils/redirectEmployee";
import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [employee, setEmployee] = useState({})
    const [togglesidebarondesktop, setTogglesidebarondesktop] = useState(false)


    const decodeEmployee = async (token) => {
        if (!token) return
        const res = await axios.post('/api/employee/decode', { token })
        return res.data
    }


    useEffect(() => {
        if (Cookies.get('token')) {
            decodeEmployee(Cookies.get('token'))
                .then((e) => {
                    setEmployee(e.employee)
                })
        }

    }, [])


    return (
        <AuthContext.Provider value={{ employee, setEmployee, decodeEmployee, togglesidebarondesktop, setTogglesidebarondesktop }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext }