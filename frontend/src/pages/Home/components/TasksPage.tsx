import Tasks from './Tasks';
import AddTask from './AddTask';

export default function TasksPage() {
    return (
        <>
            <div className="h-full w-full p-4">
                <AddTask />
                <Tasks />
            </div>
        </>
    );
}
