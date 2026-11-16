import api from "./api"

const getFaculties = async () => {
    try {
        const res = await api.get(`/faculty/`);
        const msg = res?.data?.message;
        return res?.data
    } catch (e) {
        const err = e.response?.data?.message;
        console.log(err)
        throw new Error(err);
    }
}

const addFaculty = async (data) => {
    try {
        const res = await api.post(`/faculty/create/`, data);
        const msg = res?.data?.message;
        return res?.data

    } catch (e) {
        const err = e.response?.data?.message;
        console.log(err)
        throw new Error(err);
    }
}
export {
    getFaculties,
    addFaculty
}