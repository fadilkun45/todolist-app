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
import { toast } from "react-toastify"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().nonempty('username required'),
    email: z.string().email('email invalid').nonempty('email required'),
    password: z.string().nonempty('password required'),
})

const Register = () => {
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
        AuthServices.postRegister(values).then(() => {
            // if (res.success) {
                navigate("/")
                toast.success("register success")
            // }
        }).catch(() => {
            setLoading(false)
            setIsError(true)
        })
    }

    useEffect(() => {
        setLoading(true)
        if (cookies.getCookie(import.meta.env.VITE_API_COOKIES_AUTH)) {
            navigate("/dashboard")
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
                <div className="w-5/6 mx-auto flex flex-col items-center justify-center h-screen">
                    <p className="text-5xl font-semibold text-center mb-3 text-brand-100">Register</p>
                    <p className="text-xl font-semibold text-center mb-3 text-brand-100">create new account</p>
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-y-3">
                                            <FormLabel className="text-xl ">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="input email"  {...field} className="outline-none" />
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
                                                <Input type="password"  placeholder="input password"  {...field} className="outline-none" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="text-white bg-brand-200 hover:bg-brand-100">submit</Button>
                            </form>
                        </Form>
                         <div className="flex gap-x-3 mt-3">
                                <p> have account ? </p>
                                <Link to="/" className="text-blue-600">Login here</Link>
                            </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register