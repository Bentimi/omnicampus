import api from "./api";


const addDepartment = async (formData) => {
    try {
        const res = await api.post('/department/add', formData);
        const msg = res?.data?.message;
        return res?.data;
    } catch (e) {
        const err = e.response?.data?.message;
        console.log(err);
        throw new Error(err);
    }
}
export {
    addDepartment
}