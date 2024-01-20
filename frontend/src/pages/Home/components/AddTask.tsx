import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import TaskForm from './TaskForm';

export default function AddTask() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="my-4 w-full justify-start border-2 pl-4"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Task
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogDescription>
                            Fill out the fields below.
                        </DialogDescription>
                    </DialogHeader>
                    <TaskForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    );
}
