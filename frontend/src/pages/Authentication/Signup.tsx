import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// shadcn components
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: 'Username must be at least 3 characters' })
            .max(20),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(30),
        confirmPassword: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(30),
        email: z.string().email({ message: 'Invalid email address' }),
        firstName: z
            .string()
            .min(1, { message: 'This is a required field.' })
            .max(30),
        lastName: z
            .string()
            .min(1, { message: 'This is a required field.' })
            .max(30),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'The passwords did not match',
                path: ['confirmPassword'],
            });
        }
    });

type SignupInputs = z.infer<typeof signupSchema>;

export default function Signup() {
    const signupForm = useForm<SignupInputs>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            firstName: '',
            lastName: '',
        },
    });

    const submit = (data: SignupInputs) => {
        console.log(data);
    };

    return (
        <>
            <Form {...signupForm}>
                <form
                    onSubmit={signupForm.handleSubmit(submit)}
                    className="space-y-8"
                >
                    <FormField
                        control={signupForm.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your first name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signupForm.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your last name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This will be used to recover your account in
                                    case you forget your credentials.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signupForm.control}
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
                                <FormDescription>
                                    Enter a cool-sounding username
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signupForm.control}
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
                    <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                        Signup
                    </Button>
                </form>
            </Form>
        </>
    );
}
