import axiosInstance from '../api/axiosInstance';
import {Task, TaskCreation} from '../models/Task';

class TaskService {
    private baseUrl = 'api/task';

    async getAllTasks(): Promise<Task[]> {
        const response = await axiosInstance.get<Task[]>(this.baseUrl);
        return response.data;
    }

    async getTaskById(id: number): Promise<Task> {
        const response = await axiosInstance.get<Task>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async createTask(task: TaskCreation): Promise<Task> {
        const response = await axiosInstance.post<Task>(this.baseUrl, task);
        return response.data;
    }

    async updateTask(id: number, updatedTask: Partial<Task>): Promise<void> {
        await axiosInstance.put(`${this.baseUrl}/${id}`, updatedTask);
    }

    async deleteTask(id: number): Promise<void> {
        await axiosInstance.delete(`${this.baseUrl}/${id}`);
    }
}

const taskService = new TaskService();
export default taskService;
