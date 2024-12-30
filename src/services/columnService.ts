import axiosInstance from '../api/axiosInstance';
import { Column } from '../models/Column'; // Создай интерфейс модели Column

export const getColumns = async (): Promise<Column[]> => {
    const response = await axiosInstance.get<Column[]>('/api/column');
    return response.data;
};

export const getColumnById = async (id: number): Promise<Column> => {
    const response = await axiosInstance.get<Column>(`/api/column/${id}`);
    return response.data;
};

export const createColumn = async (column: Column): Promise<Column> => {
    const response = await axiosInstance.post<Column>('/api/column', column);
    return response.data;
};

export const updateColumn = async (id: number, column: Column): Promise<void> => {
    await axiosInstance.put(`/api/column/${id}`, column);
};

export const deleteColumn = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/column/${id}`);
};
