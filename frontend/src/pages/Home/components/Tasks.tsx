import { Card, CardContent } from '@/components/ui/card';
import moment from 'moment';
import { CalendarClock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import DeleteTaskDialog from './DeleteTaskDialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
    getTodayTasks,
    getUpcomingTasks,
    getAllTasks,
    getTaskByGroupId,
    updateTaskStatus,
} from '@/api/taskApiService';
import { useLocation, useParams } from 'react-router-dom';
import { Task } from '@/model';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    const { pathname } = useLocation();
    const { group_id } = useParams<{ group_id: string }>();
    const queryClient = useQueryClient();

    let query: any;

    // Fetch tasks based on the current path
    switch (pathname) {
        case '/':
            query = useQuery('todayTasks', getTodayTasks);
            break;
        case '/upcoming':
            query = useQuery('upcomingTasks', getUpcomingTasks);
            break;
        case '/all':
            query = useQuery('allTasks', getAllTasks);
            break;
        default:
            query = useQuery(group_id!, () => getTaskByGroupId(group_id!));
            break;
    }

    const [checkedTasks, setCheckedTasks] = useState<string[]>([]);

    useEffect(() => {
        setCheckedTasks(
            () =>
                query?.data
                    ?.filter((task: Task) => task.task_done)
                    ?.map((task: Task) => task.task_id) || [],
        );
    }, [query?.data]);

    const { mutate, isLoading } = useMutation(updateTaskStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const handleCheckboxChange = (taskId: string) => {
        setCheckedTasks((prevCheckedTasks) => {
            if (prevCheckedTasks.includes(taskId)) {
                mutate({ task_id: taskId, task_done: false });
                return prevCheckedTasks.filter((id) => id !== taskId);
            } else {
                mutate({ task_id: taskId, task_done: true });
                return [...prevCheckedTasks, taskId];
            }
        });
    };

    console.log(checkedTasks);
    console.log(query?.data);

    return (
        <>
            <div className="flex flex-col ">
                <ScrollArea className="h-[85vh]">
                    {/* TODO: Add Scroll Area */}
                    {query?.data &&
                        query.data.length !== 0 &&
                        query?.data!.map((task: Task) => (
                            <Card
                                key={task.task_id}
                                className={`mb-2 pt-4 hover:cursor-pointer hover:bg-slate-50 ${checkedTasks.includes(task.task_id!) ? 'bg-slate-200' : ''}`}
                            >
                                <CardContent>
                                    <div className="flex flex-row items-center justify-between">
                                        <Checkbox
                                            checked={checkedTasks.includes(
                                                task.task_id!,
                                            )}
                                            onCheckedChange={() =>
                                                handleCheckboxChange(
                                                    task.task_id!,
                                                )
                                            }
                                        />
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <div
                                                    className={`ml-6 grow ${checkedTasks.includes(task.task_id!) ? 'line-through' : ''}`}
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
                                                {task.task_group
                                                    ?.group_name && (
                                                    <div>
                                                        <Badge>
                                                            {
                                                                task.task_group
                                                                    .group_name
                                                            }
                                                        </Badge>
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
                                                                    ).format(
                                                                        'LL',
                                                                    )}
                                                                </>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                )}
                                                <div className="mt-5">
                                                    <p className="mt-2 text-base font-semibold">
                                                        NOTES
                                                    </p>
                                                    <Card className="mt-2 py-4">
                                                        <CardContent className="py-1 text-base">
                                                            {task.task_notes ||
                                                                'No notes available.'}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </SheetContent>
                                        </Sheet>
                                        <div>
                                            <DeleteTaskDialog
                                                taskId={task.task_id!}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </ScrollArea>
            </div>
        </>
    );
}
