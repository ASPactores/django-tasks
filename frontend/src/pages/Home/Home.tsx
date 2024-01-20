import TasksPage from './components/TasksPage';
import SideMenu from './components/SideMenu';

export default function Home() {
    return (
        <section className="flex h-full w-full flex-row">
            <SideMenu />
            <TasksPage />
        </section>
    );
}
