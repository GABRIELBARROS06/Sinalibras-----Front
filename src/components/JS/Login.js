import styles from '../CSS/Login.module.css';
import logo from '../../img/Logo.png';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';
import React from 'react';

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function Login() {
    const { setDados } = useContext(AppContext);
    const BASE_URL = 'http://localhost:8080/';

    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [erroNull, setErroNull] = useState(true);
    const [textoErro, setTextoErro] = useState('');
    const [loginValido, setLoginValido] = useState(false);

    const navigate = useNavigate();

    async function ValidarEntrada(e) {
        e.preventDefault();

        if (!email || !senha) {
            setErroNull(false);
            setTextoErro('Todos os campos devem ser preenchidos, favor verificar');
        } else if (!validarEmail(email)) {
            setErroNull(false);
            setTextoErro('Digite um e-mail válido.');
        } else if (senha.length < 6 || senha.length > 8) {
            setErroNull(false);
            setTextoErro('A senha deve conter entre 6 e 8 caracteres.');
        } else {
            try {
                const alunoDados = {
                    email: email,
                    senha: senha,
                };

                const response = await fetch(`${BASE_URL}v1/sinalibras/aluno/validacao`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(alunoDados),
                });

                const data = await response.json();
                if (data.status) {
                    const dadosParaEnviar = {
                        nome: data.aluno.nome,
                        id: data.aluno.id_aluno,
                        email: data.aluno.email,
                        tipoUsuario: 'Aluno',
                        data_nascimento:data.aluno.data_nascimento,
                        foto_perfil: data.aluno.fotoerfil,
                    };


                    console.log(data.aluno.data_nascimento, data.aluno.foto_perfil);

                    setDados(dadosParaEnviar);
                    setLoginValido(true); // Define o login como válido
                    setTimeout(() => navigate('/Home'), 3000); // Redireciona após 3 segundos
                } else {
                    setErroNull(false);
                    setTextoErro('Seus dados não conferem.');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                setErroNull(false);
                setTextoErro('Ocorreu um erro no servidor, tente novamente mais tarde.');
            }
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.esquerda}>
                <img src={logo} alt="Logo" />
                <h3 className={styles.slogan}>Conectando Pessoas</h3>
                <h3 className={styles.slogan}>Transformando Sinais</h3>
                <h1 className={styles.nome_aplicacao}>SinaLibras</h1>
            </div>
            <div className={styles.direita}>
                <h1 className={styles.texto_acesse}>Acesse a sua conta</h1>

                {loginValido && (
    <div className={`${styles.cardValidado} ${styles.animacaoEntrada}`}>
        <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png" // Ícone de sucesso
            alt="Sucesso"
            className={styles.iconSucesso}
        />
        <h3>Login realizado com sucesso!</h3>
    </div>
)}

{!erroNull && (
    <div className={`${styles.cardErro} ${styles.animacaoEntrada}`}>
        <img
            src="https://cdn-icons-png.flaticon.com/512/594/594846.png" // Ícone de erro
            alt="Erro"
            className={styles.iconErro}
        />
        <h3>{textoErro}</h3>
    </div>
)}

                <form className={styles.formulario}>
                    <div>
                        <h4 className={styles.texto_input}>Email</h4>
                        <input
                            type="email"
                            className={styles.input}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loginValido} // Desativa o input após o login
                        />
                    </div>
                    <div>
                        <h4 className={styles.texto_input}>Senha</h4>
                        <input
                            type="password"
                            className={styles.input}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={loginValido} // Desativa o input após o login
                        />
                    </div>
                </form>
                <h3 className={styles.esqueciASenha}>Esqueci a senha</h3>
                <h4 className={styles.erro_null} hidden={erroNull}>
                    {textoErro}
                </h4>
                <button
                    className={styles.botao}
                    onClick={ValidarEntrada}
                    disabled={loginValido} // Desativa o botão após o login
                >
                    Entrar
                </button>
                <h3 className={styles.texto}>Não tem uma conta? </h3>
                <h2 className={styles.texto} onClick={() => navigate('/Cadastro')}>
                    Criar Conta
                </h2>
            </div>
        </div>
    );
}

export default Login;
