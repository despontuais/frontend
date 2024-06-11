"use client";
import React, { useState } from 'react';
import registerStyle from './Register.module.css';
import axios from 'axios';
import Image from 'next/image';
import cronologo from "../../public/CronoLogo.png";
import { useRouter } from 'next/navigation';

const RegisterScreen = () => {
  const router = useRouter();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setconfirmPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [birthdateInput, setBirthdateInput] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      register();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validação de nome de usuário
    if (!usernameInput) {
      errors.username = 'Usuário é obrigatório';
    } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(usernameInput)) {
      errors.username = 'Usuário deve ter entre 3 e 15 caracteres e não pode conter caracteres especiais';
    }

    if (!passwordInput) {
      errors.password = 'Senha é obrigatória';
    } else if (passwordInput.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
    } else if (!/[A-Z]/.test(passwordInput) || !/[a-z]/.test(passwordInput) || !/[0-9]/.test(passwordInput) || !/[^A-Za-z0-9]/.test(passwordInput)) {
      errors.password = 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial';
    }

    // Confirmação de senha
    if (passwordInput !== confirmPasswordInput) {
      errors.confirmPassword = 'As senhas não correspondem';
    }

    // Confirmação de email
    if (!emailInput) errors.email = 'Email é obrigatório';
    if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) errors.email = 'Formato de email inválido';

    // Confirmação de nascimento
    if (!birthdateInput) errors.birthdate = 'Data de nascimento é obrigatória';
    if (birthdateInput && new Date(birthdateInput) >= new Date()) errors.birthdate = 'Data de nascimento inválida';

    // Aceite obrigatório dos termos
    if (!termsAccepted) errors.terms = ' \n\nVocê deve aceitar os termos e condições';

    return errors;
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        headers: {
          'Content-type': 'application/json',
          'Accept': '*/*'
        },
        email: emailInput,
        password: passwordInput,
        name: usernameInput,
        birthDate: birthdateInput
      });
      console.log(res.data);
      // Redirecionar para a página de login após o registro bem-sucedido
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={registerStyle.backgroundRegister}>
      <title>Cronolog</title>

     <Image src={cronologo} width={270} height={170} alt="Cronolog Logo"></Image>
     <br></br><br></br>

      <form action="/api/register" method="POST">
        <div className={registerStyle.userArea}>
          <label htmlFor="User" className={registerStyle.label}>Usuário</label>
          <input
            type="text"
            required
            placeholder='Nome de Usuário'
            className={registerStyle.infoArea}
            name="user"
            id="User"
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
          />
          {errors.username && <span className={registerStyle.error}>{errors.username}</span>}

          <label htmlFor="Password" className={registerStyle.label}>Senha</label>
          <input
            type="password"
            required
            placeholder='Senha'
            className={registerStyle.infoArea}
            name="password"
            id="Password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
          />
          {errors.password && <span className={registerStyle.error}>{errors.password}</span>}

          <label htmlFor="PasswordConfirmation" className={registerStyle.label}>Confirme a senha</label>
          <input
            type="password"
            required
            placeholder='Confirme a Senha'
            className={registerStyle.infoArea}
            name="PasswordConfirmation"
            id="PasswordConfirmation"
            value={confirmPasswordInput}
            onChange={e => setconfirmPasswordInput(e.target.value)}
          />
          {errors.confirmPassword && <span className={registerStyle.error}>{errors.confirmPassword}</span>}

          <label htmlFor="email" className={registerStyle.label}>Email</label>
          <input
            type="email"
            placeholder='Email'
            className={registerStyle.infoArea}
            name="email"
            id='email'
            required
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
          />
          {errors.email && <span className={registerStyle.error}>{errors.email}</span>}

          <label htmlFor="birthDate" className={registerStyle.label}>Data de nascimento</label>
          <input
            type="date"
            placeholder='Data de Nascimento'
            className={registerStyle.infoArea}
            name="birthDate"
            id="birthDate"
            value={birthdateInput}
            onChange={e => setBirthdateInput(e.target.value)}
          />
          {errors.birthdate && <span className={registerStyle.error}>{errors.birthdate}</span>}
        </div>

        <div className={registerStyle.termos}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            required
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
          /> Declaro que li e aceito os termos e condições <br></br><br></br>
          {errors.terms && <span className={registerStyle.error}> <br/> {errors.terms}</span>}
          
          <input
            className={registerStyle.btn}
            type="button"
            value="Registrar"
            onClick={handleRegister}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
