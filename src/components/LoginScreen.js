//style
import login from './LoginScreen.module.css';

//logo
import cronologo from "../../public/Cronologo.png"

const LoginScreen = () => {

    return (
        <div className={login.backgroundLogin}>
            <title>Cronolog</title>

            <h1>CronoLogin</h1>

            {/* fazer a imagem aparecer aqui */}
            <img src={cronologo} alt="nao ta funcionando imagem"/>
            
            <form action="">
                {/* parte das informações do usuário */}

                <div className={login.userArea}>
                    <label htmlFor="User" className={login.label}>Usuário</label>
                    <input type="text" placeholder='Usuário' className={login.infoArea} name="user" id="User" />

                    <label htmlFor="Password" className={login.label}>Senha</label>
                    <input type="password" placeholder='Senha' className={login.infoArea} name="password" id="Password" />
                </div>

                {/* parte dos botões */}
                <div className={login.logArea}>
                    <input className={login.btn} type="button" value="Login" />
                    <input className={login.btn} type="button" value="Registrar" />
                </div>
                <a href="/" className={login.forgetPassword}>Esqueci minha senha</a>
            </form>
        </div>
    )
}

export default LoginScreen;
