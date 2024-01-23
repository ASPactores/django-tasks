import TasksPage from './components/TasksPage';
import SideMenu from './components/SideMenu';

export default function ViewTasks() {
    return (
        <section className="flex h-full w-full flex-row">
            <TasksPage />
        </section>
    );
}
