import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    axios.defaults.withCredentials = true;
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    async function fetchUserData() {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data')

            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    async function getAuthState() {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth')
            if (data.success) {
                setIsLoggedIn(true)
                fetchUserData()
            }

        } catch(err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
      
        getAuthState()
      
    }, [])
    

    const value = {
        backendUrl,
        userData, setUserData,
        isLoggedIn, setIsLoggedIn,
        fetchUserData
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider