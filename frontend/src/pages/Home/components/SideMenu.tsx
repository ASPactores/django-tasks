import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from './CustomScrollArea';
import { ListChecks, LayoutList, BookmarkCheck, LogOut } from 'lucide-react';
import { useContext } from 'react';
import AddMoreList from './AddMoreList';
import { AddMoreListContext } from '@/contexts/AddMoreListContextProvider';

export default function SideMenu() {
    const { listOfTasks } = useContext(AddMoreListContext);

    return (
        <div className="flex h-full w-[300px]">
            <div className="flex h-full w-full flex-col justify-between rounded-lg bg-white px-1 py-4">
                <div>
                    <div className="px-3 py-2">
                        <h2 className="mb-1 pr-4 text-sm font-bold tracking-tight">
                            TASKS
                        </h2>
                        <div className="space-y-1">
                            <Button
                                variant="ghost"
                                className="w-full justify-start py-1 pl-6"
                            >
                                <ListChecks className="mr-2 h-4 w-4" />
                                Today
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start py-1 pl-6"
                            >
                                <LayoutList className="mr-2 h-4 w-4" />
                                Upcoming
                            </Button>
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
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className="w-full justify-start py-1 pl-6"
                                    >
                                        <BookmarkCheck className="mr-2 h-4 w-4" />
                                        {list}
                                    </Button>
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
