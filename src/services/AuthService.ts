import { AxiosResponse } from "axios";
import { $auth_api } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";

export default class AuthService
{
    static async signIn(username : string, password : string) : Promise<AxiosResponse<AuthResponse>>
    {
        return await $auth_api.post<AuthResponse>('/auth/sign-in', {username, password})
    }

    static async signUp(username : string, password : string) : Promise<AxiosResponse<AuthResponse>>
    {
        return await $auth_api.post<AuthResponse>('/auth/sign-up', {username, password})
    }

    static async logout(user : IUser) : Promise<AxiosResponse<AuthResponse>>
    {
        let instance = localStorage.getItem("instance");
        return await $auth_api.post('/auth/logout', {user, instance})
    }
}