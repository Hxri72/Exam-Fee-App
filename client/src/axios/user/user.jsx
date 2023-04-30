import { axiosInstanceUser } from '../axiosInstance';

export const signupUser = async (payload) => {
    try {
        const response = await axiosInstanceUser.post("/signup",(payload))
        return response.data;
    } catch (error) {
        return error.response
    }
}

export const loginUser = async (payload) => {
    try {
        const response = await axiosInstanceUser.post("/login",(payload))
        return response.data;
    } catch (error) {
        return error.response
    }
}

export const getNationalities = async (payload) => {
    try {
        const response = await axiosInstanceUser.post("/getNationalities",(payload))
        return response.data;
    } catch (error) {
        return error.response
    }
}

export const getFees = async () => {
    try {
        const response = await axiosInstanceUser.get("/getFees")
        return response.data;
    } catch (error) {
        return error.response
    }
}

export const fetchCourses = async (payload) => {
    try {
        const response = await axiosInstanceUser.post("/getCourses",(payload))
        return response.data;
    } catch (error) {
        return error.response
    }
}

export const getCourseLevels = async (payload) => {
    try {
        const response = await axiosInstanceUser.post("/getCourseLevels",(payload))
        return response.data;
    } catch (error) {
        return error.response
    }
}

export const getResultingamount = async (payload) => {
    try {
        const response = await axiosInstanceUser.post("/getResultingAmount",(payload))
        return response.data;
    } catch (error) {
        return error.response
    }
}