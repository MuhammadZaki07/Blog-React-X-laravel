import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import axios from "axios";

export default function AuthProvider({children}){
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState(null);
    const [errors,setErrors] = useState(null);

    const getUser = async () => {
        if (!token) return;
    
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        const data = response.data;
        if (response.status === 200) {
            setUser(data);
        } else {
            setUser(null);
            localStorage.removeItem("token");
            setToken(null);
            setErrors(data.errors || { error: data.error }); 
        }
    };
    

    useEffect(() => {
        if(token){
            localStorage.setItem("token",token);
            getUser();
        }else{
            localStorage.removeItem("token");
        }
    },[token]);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, errors }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
