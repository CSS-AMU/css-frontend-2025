import axios from "axios"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";




const formSchema = z.object({
	email: z
        .string()
        .transform(val => val.toUpperCase())
        .refine(val => /^[A-Z]{2}[0-9]{4}$/.test(val), 'Invalid Enrollment number'),
	password: z.string().min(6, "Password must be atleast of 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {

    const navigate = useNavigate();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	})

	const onSubmit = async (data: FormValues) => {
		try {
		const response =  await axios.post("http://localhost:3000/api/v1/users/login",data,{
				withCredentials: true,
			})	
			console.log(response.data);
			navigate("/");
			alert("Login successful");
		} catch (error) {
			alert("Invalid credentials or something went wrong" );
			console.error("Error logging in:", error);
		}
		console.log(data);
	}
	



	return (
		<div className="min-h-screen pt-20 pb-20 md:pb-0 px-4">
            <Card className="max-w-md mx-auto p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-5">
					<h1 className="font-bold text-2xl text-center">Login to your account</h1>
					<h2 className="text-xs text-center pb-4">Welcome Back!</h2>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
						<FormItem className="text-left w-full">
							<FormLabel className="m-2">Enrollment Number</FormLabel>
							<FormControl>
							<Input
								type="text"
								placeholder="Enter Email address"
								{...field}
							/>
							</FormControl>
							<FormMessage className="text-xs"/>
						</FormItem>
						)}
					/>
					 <FormField
						control={form.control}
						name="password"
						render={({ field }) => (
						<FormItem className="text-left w-full">
							<FormLabel className="m-2">Password</FormLabel>
							<FormControl>
							<Input
								type="password"
								placeholder="Enter password"
								{...field}
							/>
							</FormControl>
							<FormMessage className="text-xs"/>
						</FormItem>
						)}
					/>
					<div className="flex flex-col justify-center p-2 gap-4">
						<Button type="submit" className="w-full">
						Sign in
						</Button>
						<Button className="text-sm font-light invert" onClick={() => navigate('/register')}>New user? Register</Button>
					</div>
				</form>
			</Form>
            </Card>
		</div>
	)
}

export default LoginPage
