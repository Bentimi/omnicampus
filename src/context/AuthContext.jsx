import { Children, createContext, useContext, useEffect, useRef, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import Loading from '../components/Spinner/Loading';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Handle refresh token
    const lastRefreshTimeRef = useRef(Date.now());
    const handleTokenRefresh = async () => {
        try {
            await api.post('/account/refresh');
            console.log('Refresh done')
            lastRefreshTimeRef.current = Date.now();
        } catch (e) {
            console.error("Token refresh failed: ", e);
            setUser(null);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get(`/account/user-profile`, {
                    validatedStatus: (status) => status < 500
                });


                if (res.status === 200) {
                    const response = res?.data?.data?.user
                    setUser(response)
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

    // Mouse activity tracker for 1-hour session window

    useEffect(() => {
        if (!user) return;

        const one_hr = 60 * 60 * 1000; 

        const handleUserActivity = () => {
            const now = Date.now();
            const timeSinceLastRefresh = now - lastRefreshTimeRef.current;

            // If user interacts and 1 full hr has elapsed since last refresh.

            if (timeSinceLastRefresh >= one_hr) {
                handleTokenRefresh();
                toast.success('Refresh done')
            }

            const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];

            activityEvents.forEach((event) => {
                window.addEventListener(event, handleUserActivity);
            });

            return () => {
                activityEvents.forEach((event) => {
                    window.removeEventListener(event, handleUserActivity);
                })
            }
        }
    }, [user])

     if (loading) {
        return (
            <Loading />
        )
    }

    const login = async (data) => {
        const response = await api.post('/account/login', data);
        const loggedUser = response.data.data.user
        setUser(loggedUser);
        // console.log(user)
        // console.log(response?.data)
        // const userId = response?.data?.data?.user?._id
        // console.log(userId)
        // setIsUserId(userId)
        // console.log(`User ${!!user}`)
        return response.data;
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