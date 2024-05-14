import { IUser } from "../IUser";

export interface AuthResponse
{
    accessToken : string;
    refresh : string;
    user : IUser;
    instance : string;
}