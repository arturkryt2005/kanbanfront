export interface Task {
    id: number;
    title: string;
    description: string;
    columnId: number;
    assignee: string;
    isCompleted: boolean;
    createdAt: string;
}

export type TaskCreation = Omit<Task, 'id' | 'createdAt'>
