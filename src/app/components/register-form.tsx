"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";

import axios from "axios";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { ptBR } from "date-fns/locale";
import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
import IPage from "@/IPage";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";



export const RegisterForm = ({ params: { locale } }: IPage) => {

    const t = useTranslations();

    const FormSchema = z.object({
        username: z.string(
            { required_error: t("Validation.usernameRequired") }
        ).min(3, t("Validation.usernameLength")).max(15, t("Validation.usernameLength")).regex(/^[a-zA-Z0-9_]{3,15}$/, t("Validation.usernameSpecial")),


        password: z.string(
            { required_error: t("Validation.passwordRequired") }
        ).min(6, t("Validation.passwordLength")).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/, t("Validation.passwordSpecial")),


        confirmPassword: z.string({
            required_error: t("Validation.confirmPasswordRequired")
        }),


        email: z.string(
            { required_error: t("Validation.emailRequired") }
        ).email(t("Validation.emailInvalid")).toLowerCase(),
        birthDate: z.date({ required_error: t("Validation.birthdateRequired") })


    })
        .superRefine((data, ctx) => {
            if (data.password !== data.confirmPassword) {
                ctx.addIssue({
                    code: "custom",
                    path: ["confirmPassword"],
                    message: t("Validation.passwordMismatch"),
                });
            }
        }).superRefine((data, ctx) => {
            if (moment().diff(moment(data.birthDate), 'years', true) < 18) {
                ctx.addIssue({
                    code: "invalid_date",
                    path: ["birthDate"],
                    message: t("Validation.birthdateTooYoung")
                })
            }
        });







    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            //change localhost to http://IP_ADDRESS/ when testing on phone

            const res = await axios.post('https://cronolog.duckdns.org/api/auth/signUp', {
                username: values.username,
                email: values.email,
                password: values.password,
                birthDate: values.birthDate
            }, {
                withCredentials: true, // Permite o envio de cookies
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
            });

            if (res.status == 201) {
                router.push('/signIn');
            } else {
                console.log('SingUp failed: ', res.data.error);
            }
        } catch (err) {
            console.error('Error during login: ', err);
        }

    }

    // const t = useTranslations();

    return (

        <Card className="mt-5 lg:min-w-96 max-w-[420px] ">
            <CardHeader>
                <CardTitle>{t("Form.cardTitle")}</CardTitle>
                <CardDescription>{t("Form.cardDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("Form.usernameLabel")}</FormLabel>
                                    <FormControl>
                                        <Input className="" placeholder={t("Form.usernamePlaceholder")} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("Form.emailLabel")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: cronologger@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("Form.dateLabel")}</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full h-10 justify-start text-left font-normal px-3 py-2",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>{t("Form.datePlaceholder")}</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar captionLayout="dropdown-buttons" fromYear={new Date(Date.now()).getFullYear() - 100} toMonth={new Date(Date.now())}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("Form.confirmPasswordLabel")}</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder={t("Form.confirmPasswordPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter className="flex justify-around">
                            <Button type="submit" variant={"default"} className="w-52">{t("Form.singUpButtonText")}</Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )

}
