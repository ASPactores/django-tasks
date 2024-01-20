import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

interface DeleteTaskDialogProps {
    taskId: number;
}

export default function DeleteTaskDialog({ taskId }: DeleteTaskDialogProps) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteTask = async (
        id: number,
        setOpenDeleteDialog: (open: boolean) => void,
    ) => {
        console.log(id, 'is deleted.');
        setOpenDeleteDialog(false);
    };
    return (
        <>
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogTrigger asChild>
                    <Button variant="ghost">
                        <Trash2 className="h-5 w-5" color="#932525" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Do you want to delete task?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenDeleteDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() =>
                                handleDeleteTask(taskId, setOpenDeleteDialog)
                            }
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
