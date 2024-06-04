"use client"
//style
import loginStyle from './LoginScreen.module.css';

//logo
import cronologo from "../../public/Cronologo.png"
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LoginScreen = () => {

    const [emailInput, setEmailInput] = useState('');

    const [passwordInput, setPasswordInput] = useState('');
 
    const handleButtonClick = () => {
        login();
    }

    const ping = async () => {
        try{
            const res = await fetch('http://localhost:3000/api/ping');
            console.log(await res.json());
        }catch(err){
            console.log(err)
        }
        
    }
 
    useEffect(() => {
        ping();
    }, [])

    const login = async () => {
        try{
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                })
            });
            const json = await res.json();
            console.log(json);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <div className={loginStyle.backgroundLogin}>
            <title>Cronolog</title>

            <h1>CronoLogin</h1>

            {/* fazer a imagem aparecer aqui */}
            <Image 
                src={cronologo}
                width={500}
                height={500}
                alt="Cronolog Logo"
                />            
            <form action="">
                {/* parte das informações do usuário */}

                <div className={loginStyle.userArea}>
                    <label htmlFor="User" className={loginStyle.label}>Usuário</label>
                    <input type="text" placeholder='Usuário' className={loginStyle.infoArea} name="user" id="User" value={emailInput} onChange={e => setEmailInput(e.target.value)}/>

                    <label htmlFor="Password" className={loginStyle.label}>Senha</label>
                    <input type="password" placeholder='Senha' className={loginStyle.infoArea} name="password" id="Password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
                </div>

                {/* parte dos botões */}
                <div className={loginStyle.logArea}>
                    <input className={loginStyle.btn} type="button" value="Login" onClick={handleButtonClick} />
                    <input className={loginStyle.btn} type="button" value="Registrar" />
                </div>
                <a href="/" className={loginStyle.forgetPassword}>Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default LoginScreen;
