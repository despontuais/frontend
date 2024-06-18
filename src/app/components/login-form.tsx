"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import axios from "axios";
import IPage from "@/IPage";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

const formSchema = z.object({
    login: z.string({ required_error: "Login é obrigatório" }),
    password: z.string({ required_error: "Senha é obrigatória" })
});

export const LoginForm = ({ params: { locale } }: IPage) => {
    const t = useTranslations('Form');

    const router = useRouter();
    const handleClick = (event: React.BaseSyntheticEvent | undefined) => {
        event?.preventDefault();
        router.push('/signUp');
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            //change localhost to http://IP_ADDRESS/ when testing on phone
            const res = await axios.post('http://localhost:4001/api/auth/login', {
                login: values.login,
                password: values.password
            }, {
                withCredentials: true, // Permite o envio de cookies
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
            });

            if (res.data.status) {
                console.log(res)
                router.push('/');
            } else {
                console.log('Login failed: ', res.data.error);
            }
        } catch (err) {
            console.error('Error during login: ', err);
        }
    }

    return (
        <Card className="mt-10 w-96">
            <CardHeader>
                <CardTitle>{t("cardLoginTitle")}</CardTitle>
                <CardDescription>{t("cardLoginDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{ }</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("loginPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{ }</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder={t("passwordPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter className="flex justify-around">
                            <Button type="submit">{t("singInButtonText")}</Button>
                            <Button variant={"secondary"} onClick={handleClick}>{t("singUpButtonText")}</Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )

}
