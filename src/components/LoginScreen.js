"use client"
//style
import loginStyle from './LoginScreen.module.css';

//request
import axios from 'axios';

//logo
import cronologo from "../../public/Cronologo.png"
import Image from 'next/image';

//effect and state
import { useEffect, useState } from 'react';

const LoginScreen = () => {
    
    //testing ping route
    const ping = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/ping');
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
    }
 
    //ping the backend as soon as the page loads
    useEffect(() => {
        ping();
    }, [])

    //getting user input
    const [emailInput, setEmailInput] = useState('');

    const [passwordInput, setPasswordInput] = useState('');
 
    const handleLogin = () => {
        login();
    }

    //testing login route
    const login = async () => {
        try{
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                headers: {
                    'Content-type': 'application/json',
                    'Accept' : '*/*'
                },
                    email: emailInput,
                    password: passwordInput
            });
           console.log(res.data);
        }catch(err){
            //console.log(err);
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
                    <input className={loginStyle.btn} type="button" value="Login" onClick={handleLogin} />
                    <input className={loginStyle.btn} type="button" value="Registrar" />
                </div>
                <a href="/" className={loginStyle.forgetPassword}>Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default LoginScreen;
