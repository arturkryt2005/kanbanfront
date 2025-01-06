import { TasksProvider } from './context/TaskContext';
import TaskList from './TaskList';

function App() {
    return (
        <TasksProvider>
            <TaskList />
        </TasksProvider>
    );
}

export default App;
