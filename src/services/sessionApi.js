import { toast } from "react-toastify";
import api from "./api"

const delay = async (t = 1000) => {
    setTimeout(t)
}

const create_Session = async (formData) => {
    try {
        const res = await api.post('/session/create/', formData);
        // console.log(res)
        return res.data
    } catch (e) {
        // console.log(e)
        throw new Error(e.response?.data?.message)
    }
}

const all_Session = async (page=1, pageSize=5, search='') => {
    try {
        const res = await api.get(`/session?page=${page}&pageSize=${pageSize}&session=${encodeURIComponent(search)}`);
        // console.log(res?.data)
        return res?.data
    } catch (e) {
        // console.log(e)
        throw new Error(e.response?.data?.message)
    }
}

const update_Session = async (sessionId, formData) => {
    try {
        // console.log(sessionId)
        await delay(5000)
        const res = await api.put(`/session/${sessionId}/`, formData);
        // console.log(res)
        return res?.data
    } catch (e) {
        // console.log(e)
        throw new Error(e.response?.data?.message)
    }
}

const session_Status = async (sessionId) => {
    try {
        await delay(5000)
        const res = await api.patch(`/session/${sessionId}`);
        const msg = res?.data?.message;
        return res?.data
    } catch (e) {
        const err = e.response?.data.message
        throw new Error(err)
    }
}

const session_verification = async (sessionId, data) => {
    try {
        // console.log(data)
        await delay(5000);
        const res = await api.put(`/session/verify/${sessionId}`, data);
        const msg = res?.data?.message;
        return res?.data
    } catch (e) {
        const err = e.response?.data?.message;
        console.log(e)
        throw new Error(err);
    } 
}

export {
    create_Session,
    all_Session,
    update_Session,
    session_Status,
    session_verification
}