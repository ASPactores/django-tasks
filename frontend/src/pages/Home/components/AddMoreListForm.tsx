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
import { useMutation } from 'react-query';
import { createTaskGroup } from '@/api/taskApiService';
import { toast } from 'sonner';
import { CircleSlash, XCircle } from 'lucide-react';

const listSchema = z.object({
    group_name: z.string().min(1, 'Input at least 1 character.'),
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
            group_name: '',
        },
    });

    const { mutate, isLoading } = useMutation(createTaskGroup, {
        onSuccess: async (response) => {
            toast(
                <>
                    <CircleSlash className="mr-2 h-6 w-6" color="#32d27f" />
                    {response?.data.group_name} has been created successfully!
                </>,
            );
            setListOfTasks([...listOfTasks, response!.data.group_name]);
        },
        onError: () => {
            toast(
                <>
                    <XCircle className="mr-2 h-6 w-6" color="#932525" />
                    Error in creating group!
                </>,
            );

            return;
        },
    });

    const submit = (data: z.infer<typeof listSchema>) => {
        mutate(data);
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
                        name="group_name"
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
                        {isLoading ? (
                            <Button type="submit" disabled>
                                Adding...
                            </Button>
                        ) : (
                            <Button type="submit">Add</Button>
                        )}
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
}
