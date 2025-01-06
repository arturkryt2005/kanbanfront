import React, { useEffect, useState } from 'react';
import taskService from './services/TaskService';
import { Task } from './models/Task';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await taskService.getAllTasks();
        setTasks(data);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            await taskService.deleteTask(id);
            fetchTasks();
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleUpdate = async () => {
        if (editingTask && editingTask.id) {
            await taskService.updateTask(editingTask.id, editingTask);
            setEditingTask(null);
            fetchTasks();
        }
    };

    return (
        <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => handleEdit(task)}>Редактировать</button>
                    <button onClick={() => handleDelete(task.id)}>Удалить</button>
                </div>
            ))}
            {editingTask && (
                <div>
                    <input
                        type="text"
                        value={editingTask.title || ''}
                        onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                    />
                    <textarea
                        value={editingTask.description || ''}
                        onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Сохранить</button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
