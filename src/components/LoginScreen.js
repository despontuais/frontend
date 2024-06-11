import loginStyle from './LoginScreen.module.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import cronologo from "../../public/CronoLogo.png";

const LoginScreen = () => {
    const router = useRouter();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email: emailInput,
                password: passwordInput
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                withCredentials: true // Permite o envio de cookies
            });

            if (res.data.status) {
                router.push('/home');
            } else {
                console.log('Login failed: ', res.data.error);
            }
        } catch (err) {
            console.error('Error during login: ', err);
        }
    };

    return (
        <div className={loginStyle.backgroundLogin}>
            <title>Cronolog</title>
            <Image src={cronologo} width={260} height={180} alt="Cronolog Logo" />
            <br /><br />
            <form action="">
                <div className={loginStyle.userArea}>
                    <label htmlFor="User" className={loginStyle.label}>Usuário</label>
                    <input 
                        type="text" 
                        placeholder='Usuário' 
                        className={loginStyle.infoArea} 
                        name="user" 
                        id="User" 
                        value={emailInput} 
                        onChange={e => setEmailInput(e.target.value)} 
                    />

                    <label htmlFor="Password" className={loginStyle.label}>Senha</label>
                    <input 
                        type="password" 
                        placeholder='Senha' 
                        className={loginStyle.infoArea} 
                        name="password" 
                        id="Password" 
                        value={passwordInput} 
                        onChange={e => setPasswordInput(e.target.value)} 
                    />
                </div>

                <div className={loginStyle.logArea}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleLogin} 
                        className={loginStyle.btn}
                    >
                        Login
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        className={loginStyle.btn}
                    >
                        Registrar
                    </Button>
                </div>
                <br />
                <a href="/" className={loginStyle.forgetPassword}>Esqueci minha senha</a>
            </form>
        </div>
    );
}

export default LoginScreen;

