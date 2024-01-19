import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// shadcn components
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
    username: z.string().min(3, { message: 'Username is required' }).max(20),
    password: z.string().min(8, { message: 'Password is required' }).max(30),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function Login() {
    const loginForm = useForm<LoginInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const submit = (data: LoginInputs) => {
        console.log(data);
    };

    return (
        <>
            <Form {...loginForm}>
                <form
                    onSubmit={loginForm.handleSubmit(submit)}
                    className="space-y-8"
                >
                    <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                </form>
            </Form>
        </>
    );
}
