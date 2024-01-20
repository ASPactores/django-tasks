import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import AddMoreListForms from './AddMoreListForm';

export default function AddMoreList() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="w-full justify-start py-1 pl-6"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add More List
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter List Name</DialogTitle>
                    </DialogHeader>
                    <AddMoreListForms setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    );
}
