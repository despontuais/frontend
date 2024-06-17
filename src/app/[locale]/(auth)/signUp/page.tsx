import { RegisterForm } from "@/components/register-form";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Sing Up"

}

const Page = () => {
    return (
        <div className="bg-gradient-to-r from-stone-600 to-stone-950 h-screen w-full flex justify-center items-center">
              
            <RegisterForm>
                
            </RegisterForm>
        </div>
    )
}

export default Page;