import { RegisterForm } from "@/app/components/register-form";
import {unstable_setRequestLocale} from 'next-intl/server';
import { Metadata } from "next";
import IPage from '@/IPage';
import { useTranslations } from "next-intl";

export const metadata : Metadata = {
    title: "Sing Up"

}

const Page = ({params: {locale}}: IPage) => {
    unstable_setRequestLocale(locale);
    return (
        <div className="bg-gradient-to-r from-stone-600 to-stone-950 h-screen w-full flex justify-center items-center">
              
            <RegisterForm params={{locale}}>
                
            </RegisterForm>
        </div>
    )
}

export default Page;