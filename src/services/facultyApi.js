import api from "./api"

const getFaculties = async () => {
    try {
        const res = await api.get(`/faculty/`);
        const msg = res?.data?.message;
        // console.log(res?.data)
        return res?.data
    } catch (e) {
        const err = e.response?.data?.message;
        console.log(err)
        throw new Error(err);
    }
}

const addFaculty = async (formData) => {
    try {
        const res = await api.post(`/faculty/create/`, formData);
        const msg = res?.data?.message;
        return res?.data

    } catch (e) {
        const err = e.response?.data?.message;
        // console.log(err)
        throw new Error(err);
    }
}

const editFaculty = async (facultyId, formData) => {
    try {
        // console.log(facultyId)
        const res = await api.put(`/faculty/${facultyId}`, formData);
        const msg = res?.data?.message;
        return res?.data
    } catch (e) {
        const err = e.response?.data?.message;
        // console.log(err)
        throw new Error(err);
    }
}

const facultyStatus = async (facultyId) => {
    try {
        const res = await api.patch(`/faculty/status/${facultyId}`)
        const msg = res?.data?.message;
        return res?.data
    } catch (e) {
        const err = e.response?.data?.message;
        // console.log(err)
        throw new Error(err);
    }
}

export {
    getFaculties,
    addFaculty,
    editFaculty,
    facultyStatus
}