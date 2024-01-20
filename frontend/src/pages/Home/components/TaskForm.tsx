import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@/components/ui/date-picker';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

export default function TaskForm({
    setOpen,
}: {
    setOpen: (open: boolean) => void;
}) {
    const taskFormSchema = z.object({
        task_name: z.string().min(3, { message: 'Task name is required' }),
        task_notes: z.string().optional(),
        task_due_date: z.coerce.date().optional(),
    });

    type TaskFormInputs = z.infer<typeof taskFormSchema>;

    const taskForm = useForm<TaskFormInputs>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            task_name: '',
            task_notes: '',
            task_due_date: undefined,
        },
    });

    const submit = (data: TaskFormInputs) => {
        console.log(data);

        // TODO: When data is succesfully sent, close the dialog
        setTimeout(() => {
            setOpen(false);
        }, 1000);
    };

    return (
        <>
            <Form {...taskForm}>
                <form
                    onSubmit={taskForm.handleSubmit(submit)}
                    className="space-y-8"
                >
                    <FormField
                        control={taskForm.control}
                        name="task_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your task name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={taskForm.control}
                        name="task_notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Notes</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={taskForm.control}
                        name="task_due_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Due Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        className="bg-white"
                                        value={field.value}
                                        onChange={(newDate) =>
                                            taskForm.setValue(
                                                'task_due_date',
                                                newDate!,
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit">Add Task</Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
}
