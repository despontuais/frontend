"use client"

import React from 'react'
import registerStyle from './Register.module.css';
import { useState } from 'react';
import axios from 'axios';

const RegisterScreen = () => {
  //getting user input
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setconfirmPasswordInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [birthdateInput, setBirthdateInput] = useState('');

    const handleRegister = () => {
        register();
    }
  
    
    //testing login route
    const register = async () => {
      try{
          const res = await axios.post('http://localhost:3000/api/auth/register', {
              headers: {
                  'Content-type': 'application/json',
                  'Accept' : '*/*'
              },
                  email: emailInput,
                  password: passwordInput,
                  name: usernameInput,
                  birthDate: birthdateInput
          });
         console.log(res.data);
      }catch(err){
          console.log(err);
      }
  }

  
  return (
    <div className={registerStyle.backgroundRegister}>
      <title>Cronolog</title>

      <h1>Área de Registro</h1>

      {/* fazer a imagem aparecer aqui */}

      <form action="/api/register" method="POST">
        {/* parte das informações do usuário */}

        <div className={registerStyle.userArea}>
          {/* usuario */}
          <label htmlFor="User" className={registerStyle.label}>Usuário</label>
          <input type="text" placeholder='Nome de Usuário' className={registerStyle.infoArea} name="user" id="User" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />


          {/* senha */}
          <label htmlFor="Password" className={registerStyle.label}>Senha</label>
          <input type="password" placeholder='Senha' className={registerStyle.infoArea} name="password" id="Password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />

          <label htmlFor="PasswordConfirmation" className={registerStyle.label}>Confirme a senha</label>
          <input type="password" placeholder='Confirme a Senha' className={registerStyle.infoArea} name="PasswordConfirmation" id="PasswordConfirmation" value={confirmPasswordInput} onChange={e => setconfirmPasswordInput(e.target.value)} />
          

          {/* email */}
          <label htmlFor="email" className={registerStyle.label}>Email</label>
          <input type="email" placeholder='Email' className={registerStyle.infoArea} name="email" id='email' required value={emailInput} onChange={e => setEmailInput(e.target.value)} />


          {/* data de nasc */}
          <label htmlFor="birthDate" className={registerStyle.label}>Data de nascimento</label>
          <input type="date" placeholder='Data de Nascimento' className={registerStyle.infoArea} name="birthDate" id="birthDate" value={birthdateInput} onChange={e => setBirthdateInput(e.target.value)}/>


        </div>

        {/* parte dos botões */}
        <div>
          <input type="checkbox" name="terms" id="terms" required/> Declaro que li e aceito os termos e condições
          <input className={registerStyle.btn} type="button" value="Registrar" onClick={handleRegister}/>
        </div>
      
      </form>
    </div>
  )
}

export default RegisterScreen