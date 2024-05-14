import { AxiosResponse } from "axios";
import { $task_api } from "../http";
import { ITask } from "../models/ITask";

export default class TaskService
{
    static async fetchTasks(username : string) : Promise<AxiosResponse<ITask[]>>
    {
        return await $task_api.get<ITask[]>("/user-task-controller/get-all", {params:{username}});
    }

    static async addTask(title : string, description : string, deadline : string, username : string) : Promise<AxiosResponse>
    {
        let nullStr = '';
        return await $task_api.post("/user-task-controller/add", {nullStr, title, description, deadline, username});
    }

    static async editTask(id : string, title : string, description : string, deadline : string, username : string) : Promise<AxiosResponse>
    {
        return await $task_api.post("/user-task-controller/edit", {id, title, description, deadline, username});
    }

    static async deleteTask(id : string)
    {
        return await $task_api.post("/user-task-controller/delete", {id});
    }
}