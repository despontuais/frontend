import React from 'react'
import register from './Register.module.css';

const Register = () => {
  return (
    <div className={register.backgroundRegister}>
      <title>Cronolog</title>

      <h1>Área de Registro</h1>

      {/* fazer a imagem aparecer aqui */}

      <form action="/api/register" method="POST">
        {/* parte das informações do usuário */}

        <div className={register.userArea}>
          {/* usuario */}
          <label htmlFor="User" className={register.label}>Usuário</label>
          <input type="text" placeholder='Nome de Usuário' className={register.infoArea} name="user" id="User" />


          {/* senha */}
          <label htmlFor="Password" className={register.label}>Senha</label>
          <input type="password" placeholder='Senha' className={register.infoArea} name="password" id="Password" />

          <label htmlFor="PasswordConfirmation" className={register.label}>Confirme a senha</label>
          <input type="password" placeholder='Confirme a Senha' className={register.infoArea} name="PasswordConfirmation" id="PasswordConfirmation" />
          

          {/* email */}
          <label htmlFor="email" className={register.label}>Email</label>
          <input type="email" placeholder='Email' className={register.infoArea} name="email" id='email' required />


          {/* data de nasc */}
          <label htmlFor="birthDate" className={register.label}>Data de nascimento</label>
          <input type="date" placeholder='Data de Nascimento' className={register.infoArea} name="birthDate" id="birthDate" />


        </div>

        {/* parte dos botões */}
        <div>
          <input type="checkbox" name="terms" id="terms" required/> Declaro que li e aceito os termos e condições
          <input className={register.btn} type="button" value="Registrar"/>
        </div>
      
      </form>
    </div>
  )
}

export default Register