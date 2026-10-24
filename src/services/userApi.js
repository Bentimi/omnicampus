import api from './api';

const change_Password = async (formData) => {
    try {
        const data = {
            password: formData.oldPassword,
            newPassword: formData.newPassword
        }
        const response = await api.put('/account/change-password', formData)
        return response.data
    } catch (e) {
        throw new Error(e.response?.data?.message)
        
    }
}

const deactivate_User = async (userId) => {
    try {
        const res = await api.delete(`/account/delete/${userId}`)
        return response.data
    } catch (e) {
        throw new Error(e.response?.data?.message)
    }
}

const get_Users = async (page=1, pageSize=10, search) => {
    try {
        // console.log(page)
        const res = await api.get(`/account/users?page=${page}&pageSize=${pageSize}&search=${search}`)
        // console.log(res?.data)
        return res?.data
    } catch (e) {
        throw new Error(e.response?.data?.message)
    }
}

const edit_User = async (formData, userId) => {
    try {
        const res = await api.patch(`/account/${userId}`, formData)
        return res?.data
    } catch (e) {
        throw new Error(e.response?.data?.message)
    }
} 

const user_Profile = async (userId) => {
    try {
        const res = await api.get(`/account/profile/${userId}`);
        return res?.data
    } catch (e) {
        console.log(e.response?.data?.message)
       throw new Error(e.response?.data?.message)
    }
}

const forget_password = async (data) => {
    try {
        const res = await api.post('/account/forget-password', data);
        console.log(res)
        return res?.data
    } catch (e) {
        throw new Error(e.response?.data?.message)
    }
}

const reset_password = async (data, token) => {
    try {
        const res = await api.patch(`/account/reset-password?token=${token}`, data)
        console.log(res)
        return res?.data
    } catch (e) {
        console.log(e.response?.data?.message)
        throw new Error(e.response?.data?.message)
    }
}

const personal_profile = async () => {
    try {
        const res = await api.get('/account/user-profile');
        console.log(res);
        return res?.data
    } catch (e) {
        console.log(e.response?.data?.message)
        throw new Error(e.response?.data?.message)
    }
}

export {
    change_Password,
    deactivate_User,
    get_Users,
    edit_User,
    user_Profile,
    forget_password,
    reset_password,
    personal_profile
}