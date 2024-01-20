import { DialogFooter } from '@/components/ui/dialog';
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
    FormControl,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { AddMoreListContext } from '@/contexts/AddMoreListContextProvider';

const listSchema = z.object({
    list_name: z.string().min(1, 'Input at least 1 character.'),
});

export default function AddMoreListForms({
    setOpen,
}: {
    setOpen: (open: boolean) => void;
}) {
    const { listOfTasks, setListOfTasks } = useContext(AddMoreListContext);
    const listForm = useForm<z.infer<typeof listSchema>>({
        resolver: zodResolver(listSchema),
        defaultValues: {
            list_name: '',
        },
    });

    const submit = (data: z.infer<typeof listSchema>) => {
        setListOfTasks([...listOfTasks, data.list_name]);
        setOpen(false);
    };

    return (
        <>
            <Form {...listForm}>
                <form
                    onSubmit={listForm.handleSubmit(submit)}
                    className="space-y-8"
                >
                    <FormField
                        control={listForm.control}
                        name="list_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter list name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Add</Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
}
