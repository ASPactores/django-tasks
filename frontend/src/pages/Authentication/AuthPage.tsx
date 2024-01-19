import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from './Login';
import Signup from './Signup';

export function Authentication() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Login</TabsTrigger>
                <TabsTrigger value="password">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Login to the app by entering your username and
                            password below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Login />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Signup</CardTitle>
                        <CardDescription>
                            Create an account by filling up the fields below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Signup />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

export default function AuthPage() {
    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center p-8">
            <Authentication />
        </div>
    );
}
