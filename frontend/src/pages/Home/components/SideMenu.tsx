import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from './CustomScrollArea';
import {
    ListChecks,
    LayoutList,
    BookmarkCheck,
    LogOut,
    List,
} from 'lucide-react';
import { useContext, useEffect } from 'react';
import AddMoreList from './AddMoreList';
import { AddMoreListContext } from '@/contexts/AddMoreListContextProvider';
import { useQuery } from 'react-query';
import { getTaskGroups } from '@/api/taskApiService';
import { NavLink } from 'react-router-dom';

const main_butons = [
    {
        name: 'Today',
        icon: <ListChecks className="mr-2 h-4 w-4" />,
        path: '/',
    },
    {
        name: 'Upcoming',
        icon: <LayoutList className="mr-2 h-4 w-4" />,
        path: '/upcoming',
    },
    {
        name: 'All Tasks',
        icon: <List className="mr-2 h-4 w-4" />,
        path: '/all',
    },
];

export default function SideMenu() {
    const { listOfTasks, setListOfTasks } = useContext(AddMoreListContext);
    const { data } = useQuery('taskGroups', getTaskGroups);

    useEffect(() => {
        if (data) {
            const group_list = data.map((taskGroup) => ({
                group_name: taskGroup.group_name,
                group_id: taskGroup.group_id,
            }));
            console.log(group_list);
            setListOfTasks(group_list);
        }
    }, [data, setListOfTasks]);

    return (
        <div className="hidden h-full w-[300px] sm:flex">
            <div className="flex h-full w-full flex-col justify-between rounded-lg bg-white px-1 py-4">
                <div>
                    <div className="px-3 py-2">
                        <h2 className="mb-1 pr-4 text-sm font-bold tracking-tight">
                            TASKS
                        </h2>
                        <div className="space-y-1">
                            {main_butons.map((button, index) => (
                                <NavLink key={index} to={button.path} end>
                                    {({ isActive }) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className={`w-full justify-start py-1 pl-6 ${isActive ? 'bg-gray-200' : ''}`}
                                        >
                                            {button.icon}
                                            {button.name}
                                        </Button>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Separator
                            orientation="horizontal"
                            className="my-3 w-[80%]"
                        />
                    </div>
                    <div className="px-3 py-2">
                        <h2 className="mb-1 pr-4 text-sm font-bold tracking-tight">
                            LISTS
                        </h2>
                        <div className="space-y-1">
                            <ScrollArea>
                                {listOfTasks.map((list, index) => (
                                    <NavLink
                                        key={index}
                                        to={`group/${list.group_id}`}
                                        end
                                    >
                                        {({ isActive }) => (
                                            <Button
                                                key={index}
                                                variant="ghost"
                                                className={`w-full justify-start py-1 pl-6 ${isActive ? 'bg-gray-200' : ''}`}
                                            >
                                                <BookmarkCheck className="mr-2 h-4 w-4" />
                                                {list.group_name}
                                            </Button>
                                        )}
                                    </NavLink>
                                ))}
                            </ScrollArea>
                            {/*  */}
                            <AddMoreList />
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start pl-6"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Signout
                    </Button>
                </div>
            </div>
            <div>
                <Separator orientation="vertical" className="h-full" />
            </div>
        </div>
    );
}
