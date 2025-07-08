import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loading from "@/components/utilities/loading"
import { cookies } from "@/lib/utils"
import AuthServices from "@/services/Auth.apis"
import loadingStore from "@/store/LoadingStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { z } from "zod"


const formSchema = z.object({
    username: z.string().nonempty('username required'),
    password: z.string().nonempty('password required'),
})


const Login = () => {
    const loading = loadingStore((state) => state.isLoading)
    const navigate = useNavigate()
    const setLoading = loadingStore((state) => state.setLoading)
    const [isError, setIsError] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        AuthServices.login(values).then((res) => {
            if (res.statusCode === 2110) {
                navigate("/todo")
            }
        }).catch(() => {
            setLoading(false)
            setIsError(true)
        })
    }

    useEffect(() => {
        setLoading(true)
        if (cookies.getCookie(import.meta.env.VITE_API_COOKIES_AUTH)) {
            navigate("/todo")
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <>
            {
                loading && <Loading />
            }
            <div className="flex w-full h-dvh">

                <div className="w-full  flex flex-col items-center justify-center h-screen">
                    <p className="text-5xl font-semibold text-center mb-3 text-brand-100">Welcome</p>
                    <div className="flex flex-col w-[80%] ">
                        <Alert variant="error" className={`${isError ? "block" : "hidden"} mb-8`}>
                            <AlertTitle>Username or Password wrong</AlertTitle>
                        </Alert>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-y-3">
                                            <FormLabel className="text-xl ">Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="input Username"  {...field} className="outline-none" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                       <FormItem className="flex flex-col gap-y-3">
                                            <FormLabel className="text-xl ">Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="input Password"  {...field} className="outline-none" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="text-white bg-brand-200 hover:bg-brand-100">Login</Button>
                            </form>
                            <div className="flex gap-x-3 mt-3">
                                <p>dont have account ? </p>
                                <Link to="/register" className="text-blue-600">register here</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login