import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { AUTH_API_URL } from "../http";
import TaskService from "../services/TaskService";
import { ITask } from "../models/ITask";

export default class Store 
{
    user = {} as IUser;
    isAuth = false;
    isLoading = true;
    modalIsActive = false;
    tasks = [] as Array<ITask>;

    constructor()
    {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean)
    {
        this.isAuth = bool;
    }

    setUser(user : IUser)
    {
        this.user = user;
    }

    setLoading(bool: boolean)
    {
        this.isLoading = bool;
    }

    setModalActive(bool : boolean)
    {
        console.log("net");
        this.modalIsActive = bool;
    }

    setTasks(tasks: Array<ITask>)
    {
        this.tasks = tasks;
    }



    async signIn(username: string, password: string)
    {
        try
        {
            const response = await AuthService.signIn(username, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("instance", response.data.instance);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch(e)
        {
            console.log(e)
        }
    }

    async signUp(username: string, password: string)
    {
        try
        {
            const response = await AuthService.signUp(username, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("instance", response.data.instance);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch(e)
        {
            console.log(e)
        }
    }

    async logout()
    {
        try
        {
            const response = await AuthService.logout(this.user);
            console.log(response);
            localStorage.removeItem("token");
            localStorage.removeItem("instance");
            this.setAuth(false);
            this.setUser({} as IUser);
            window.location.replace("/auth/sign-in");
        }
        catch(e)
        {
            console.log(e);
        }
    }

    async checkAuth()
    {
        this.isLoading = true;
        try 
        {
            const response = await axios.get<AuthResponse>(`${AUTH_API_URL}/jwt-controller/token`, {withCredentials:true, params:{instance:localStorage.getItem("instance")}});
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("instance", response.data.instance);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch(e)
        {
            console.log(e);
        }
        finally
        {
            this.setLoading(false);
        }
    }

    async featchTasks()
    {
        try
        {
            const response = await TaskService.fetchTasks(this.user.username);
            console.log(response);
            this.setTasks(response.data);
        }
        catch(e)
        {
            console.log(e);
        }
    }
    
    async addTask(title : string, description : string, deadline : string)
    {
        try
        {
            const response = await TaskService.addTask(title, description, deadline, this.user.username);
            console.log(response);
            await this.featchTasks();
        }
        catch(e)
        {
            console.log(e);
        }
    }

    async deleteTask(id : string)
    {
        try
        {
            const response = await TaskService.deleteTask(id);
            console.log(response);
            await this.featchTasks();
        }
        catch(e)
        {
            console.log(e);
        }
    }

    async editTask(id : string, title : string, description : string, deadline : string)
    {
        try
        {
            const response = await TaskService.editTask(id, title, description, deadline, this.user.username)
            console.log(response);
            await this.featchTasks();
        }
        catch(e)
        {
            console.log(e);
        }
    }
}