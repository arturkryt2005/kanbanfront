import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import taskService from '../services/TaskService';
import { Task } from '../models/Task';

interface TasksContextValue {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: number) => void;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

interface TasksProviderProps {
    children: ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await taskService.getAllTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = (newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(prevTasks =>
            prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const deleteTask = (taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = (): TasksContextValue => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
};
