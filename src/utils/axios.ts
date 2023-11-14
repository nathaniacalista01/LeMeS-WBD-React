import axios from "axios";

const BACKEND_REST_API_URL = process.env.REST_URL;

const axiosInstance = axios.create({
    baseURL: BACKEND_REST_API_URL,
    headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        // 'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: false,
});

const axiosConfig = () => {
    return {
        baseURL: BACKEND_REST_API_URL,
        headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            // 'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
        },
        withCredentials: false,
    }
}

export { axiosInstance, axiosConfig };