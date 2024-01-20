import { Card, CardContent } from '@/components/ui/card';
import moment from 'moment';
import { CalendarClock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import DeleteTaskDialog from './DeleteTaskDialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const data = [
    {
        id: 1,
        task_name: 'Task 1',
        task_notes: 'Task 1 notes',
        task_due_date: new Date(),
        group: 'List #1',
    },
    {
        id: 2,
        task_name: 'Task 2',
        task_notes: 'Task 2 notes',
        task_due_date: new Date(),
    },
    {
        id: 3,
        task_name: 'Task 3',
        task_notes: 'Task 3 notes',
        task_due_date: new Date(),
    },
    {
        id: 4,
        task_name: 'Task 4',
        task_notes: 'Task 4 notes',
        task_due_date: new Date(),
    },
    {
        id: 5,
        task_name: 'Task 5',
        task_notes: 'Task 5 notes',
        task_due_date: new Date(),
    },
];

// export default function Tasks() {
//     return (
//         <>
//             <div className="flex h-full w-full flex-col space-y-2">
//                 {data.map((task) => (
//                     <Card className="pt-4">
//                         <CardContent className="flex flex-row items-center">
//                             <>
//                                 <Checkbox />
//                                 <div className="ml-6">
//                                     <p className="text-base font-semibold leading-none">
//                                         {task.task_name}
//                                     </p>
//                                     <div className="mt-2 flex flex-row items-center text-sm">
//                                         {task.task_due_date && (
//                                             <>
//                                                 <CalendarClock className="mr-2 h-5 w-5" />
//                                                 {moment(
//                                                     task.task_due_date,
//                                                 ).format('ll')}
//                                             </>
//                                         )}
//                                     </div>
//                                 </div>
//                             </>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </>
//     );
// }

export default function Tasks() {
    // State to track the checked status of each task
    const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

    const handleCheckboxChange = (taskId: number) => {
        setCheckedTasks((prevCheckedTasks) => {
            if (prevCheckedTasks.includes(taskId)) {
                return prevCheckedTasks.filter((id) => id !== taskId);
            } else {
                return [...prevCheckedTasks, taskId];
            }
        });
    };

    return (
        <>
            <div className="flex flex-col space-y-2">
                {/* TODO: Add Scroll Area */}
                {data.map((task) => (
                    <Card
                        key={task.id}
                        className={`pt-4 hover:cursor-pointer hover:bg-slate-50 ${checkedTasks.includes(task.id) ? 'bg-slate-200' : ''}`}
                        onClick={() => console.log('Hello')}
                    >
                        <CardContent>
                            <div className="flex flex-row items-center justify-between">
                                <Checkbox
                                    checked={checkedTasks.includes(task.id)}
                                    onCheckedChange={() =>
                                        handleCheckboxChange(task.id)
                                    }
                                />
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <div
                                            className={`ml-6 grow ${checkedTasks.includes(task.id) ? 'line-through' : ''}`}
                                        >
                                            <p className="text-base font-semibold leading-none">
                                                {task.task_name}
                                            </p>
                                            <div className="mt-2 flex flex-row items-center text-sm">
                                                {task.task_due_date && (
                                                    <>
                                                        <CalendarClock className="mr-2 h-5 w-5" />
                                                        {moment(
                                                            task.task_due_date,
                                                        ).format('ll')}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </SheetTrigger>
                                    <SheetContent className="flex flex-col gap-y-3">
                                        <p className="text-base font-semibold underline">
                                            TASK DETAILS
                                        </p>
                                        <p className="text-3xl font-bold leading-none">
                                            {task.task_name}
                                        </p>
                                        {task.group && (
                                            <div>
                                                <Badge>{task.group}</Badge>
                                            </div>
                                        )}
                                        {task.task_due_date && (
                                            <Card className="py-4">
                                                <CardContent className="mt-2 flex flex-col items-center justify-center gap-y-2 text-base font-semibold">
                                                    {task.task_due_date && (
                                                        <>
                                                            <CalendarClock className="h-10 w-10" />
                                                            {moment(
                                                                task.task_due_date,
                                                            ).format('LL')}
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        )}

                                        <div className="mt-5">
                                            <p className="mt-2 text-base font-semibold">
                                                NOTES
                                            </p>
                                            {task.task_notes && (
                                                <Card className="mt-2 py-4">
                                                    <CardContent className="py-1 text-base">
                                                        {task.task_notes ||
                                                            'No notes available.'}
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                                <div>
                                    <DeleteTaskDialog taskId={task.id} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
