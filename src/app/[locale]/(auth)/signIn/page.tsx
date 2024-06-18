import { LoginForm } from "@/app/components/login-form";
import { Metadata } from "next";
import {unstable_setRequestLocale} from 'next-intl/server';
import IPage from '@/IPage';

export const metadata : Metadata = {
    title: "Login"

}

const Page = ({params: {locale}}: IPage) => {
    unstable_setRequestLocale(locale);
    return (
        <div className="bg-gradient-to-r from-stone-600 to-stone-950 h-screen w-full flex justify-center items-center">
            <LoginForm params={{locale}}></LoginForm>
        </div>
    )
}

export default Page;