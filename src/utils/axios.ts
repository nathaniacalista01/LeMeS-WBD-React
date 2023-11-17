import axios from "axios";

const BACKEND_REST_API_URL = process.env.REST_URL;

const axiosInstance = axios.create({
    baseURL: BACKEND_REST_API_URL,
    headers: {
        "X-API-KEY":"ReactApp",
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
});

const axiosConfig = () => {
    return {
        baseURL: BACKEND_REST_API_URL,
        headers: {
            "X-API-KEY" : "ReactApp",
            'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
    }
}

export { axiosInstance, axiosConfig };