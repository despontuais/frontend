"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import axios from "axios";
import { useTranslations } from "next-intl";
import {useRouter} from '@/navigation';

const formSchema = z.object({
    login: z.string({required_error: "Login é obrigatório"}),
    password: z.string({required_error: "Senha é obrigatória"})
});

export const LoginForm = () => {
    const t = useTranslations();

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
            const res = await axios.post('http://localhost:4000/api/auth/login', {
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

  return(
        <Card className="mt-10 w-96">
            <CardHeader>
                <CardTitle>{t("Form.cardLoginTitle")}</CardTitle>
                <CardDescription>{t("Form.cardLoginDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField 
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("Form.loginLabel")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("Form.loginPlaceholder")} {...field} />
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
                                    <FormLabel>{t("Form.passwordLabel")}</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder={t("Form.passwordPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                <CardFooter className="flex justify-around">
                    <Button type="submit">{t("Form.singInButtonText")}</Button>
                    <Button variant={"secondary"} onClick={handleClick}>{t("Form.singUpButtonText")}</Button>
                </CardFooter> 
                 </form>
                </Form>
            </CardContent>
        </Card>
  )

}
