import { Children, createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get('/account/user-profile', {
                    validatedStatus: (status) => status < 500
                });

                if (res.status === 200) {
                    const response = res?.data?.data?.user
                    setUser(response)
                    // console.log(response)
                } else {
                    setUser(null)
                }
                
            } catch (e) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (data) => {
        const response = await api.post('/account/login', data);
        const loggedUser = response.data.data.user
        setUser(loggedUser);
        // console.log(loggedUser)
        // console.log(`User ${!!user}`)
        return loggedUser;
    };

    const logout = async () => {
        try {
            await api.post('/account/logout');
        } catch (err) {
            console.log(err)
        } finally {
            setUser(null);
            toast.success("Logged out successfully")
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, loading, logout, isAuth: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);