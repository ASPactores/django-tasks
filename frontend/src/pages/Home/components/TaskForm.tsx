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
import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { CircleSlash, XCircle } from 'lucide-react';
import { createTask } from '@/api/taskApiService';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { Task } from '@/model';

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

    const { group_id } = useParams<{ group_id: string }>();

    type TaskFormInputs = z.infer<typeof taskFormSchema>;

    const taskForm = useForm<TaskFormInputs>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            task_name: '',
            task_notes: '',
            task_due_date: undefined,
        },
    });

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(createTask, {
        onSuccess: async (response) => {
            toast(
                <>
                    <CircleSlash className="mr-2 h-6 w-6" color="#32d27f" />
                    {response?.data.task_name} has been created successfully!
                </>,
            );
            queryClient.invalidateQueries();
            setOpen(false);
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

    const submit = (data: TaskFormInputs) => {
        const { task_due_date, ...rest } = data;
        const formatted_date = moment(data.task_due_date).format('YYYY-MM-DD');
        const new_data:
            | Task
            | (Omit<Task, 'task_group'> & {
                  task_group?: string | undefined;
              }) = {
            ...rest,
            task_due_date: formatted_date,
            ...(group_id && { task_group: group_id! }),
        };
        mutate(new_data as Task);
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
