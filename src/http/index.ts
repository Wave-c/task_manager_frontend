import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const AUTH_API_URL = "http://localhost:8080"
export const TASK_API_URL = "http://localhost:8081"

export const $auth_api = axios.create({
    withCredentials: true,
    baseURL: AUTH_API_URL
})
export const $task_api = axios.create({
    withCredentials: true,
    baseURL: TASK_API_URL
})

$auth_api.interceptors.response.use((config) => {return config}, async (error) =>
    {
        const originalRequest = error.config;
        if(error.response.status !== 200 && error.config && !error.config._isRetry)
        {
            originalRequest._isRetry = true;
            try
            {
                const response = await axios.get<AuthResponse>(`${AUTH_API_URL}/jwt-controller/refresh`, {withCredentials:true});
                localStorage.setItem("token", response.data.accessToken)
                return $auth_api.request(originalRequest);
            }
            catch(e)
            {
                console.log("ne")
            }
        }    
        throw error;
    })


$task_api.interceptors.request.use((config) =>
{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})