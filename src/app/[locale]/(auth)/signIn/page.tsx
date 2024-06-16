import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Login"

}

const Page = () => {
    return (
        <div className="bg-gradient-to-r from-stone-600 to-stone-950 h-screen w-full flex justify-center items-center">
            <LoginForm></LoginForm>
        </div>
    )
}

export default Page;