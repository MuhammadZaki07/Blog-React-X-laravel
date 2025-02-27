import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: null,
    user: null,
    setToken: () => {},
    setUser: () => {},
    register: () => {},
});

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [errors,setErrors] = useState(null);

    const getUser = async () => {
        if (!token) return;
    
        const response = await fetch('http://127.0.0.1:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    
        const data = await response.json();
        if (response.ok) {
            setUser(data);
        } else {
            setUser(null);
            localStorage.removeItem("token");
            setToken(null);
            setErrors(data.errors || { error: data.error });
        }
    };
    
    
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            getUser();
        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
    }, [token]);


    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, errors }}>
            {children}
        </AuthContext.Provider>
    );
}
