import styles from '../CSS/Cadastro.module.css'
import logo from '../../img/Logo.png';
import professor from '../../img/Professor.png';
import aluno from '../../img/Aluno.png';

import { useState } from 'react'
import { useEffect } from 'react';


import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import React from 'react';



function Cadastro() {

    const BASE_URL='http://localhost:8080/'

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [conf_senha, setConfSenha] = useState()
    const [data_nasc, setDataNasc] = useState()
    const [emailProfessor, setEmailProfessor] = useState()
    const [isHiddenAluno, setisHiddenAluno] = useState(false)
    const [isHiddenProfessor, setisHiddenProfessor] = useState(true)
    const [erroNull, setErroNull] = useState(true)
    const [textoErro,setTextoErro]=useState('')

        const currentDate = new Date();    
const dateString = currentDate.toLocaleDateString('pt-BR');
const [dia, mes, ano] = dateString.split('/');
const data_atual=`${ano}-${mes}-${dia}`

const { setDados } = useContext(AppContext);

const navigate = useNavigate();



   async function irParaQuizProfessor() {
        if (emailProfessor == '' || emailProfessor == null || emailProfessor == undefined) {
            setErroNull(false)
            setTextoErro('preencha este campo primeiro')
        }//VERIFICAR SE O EMAIL EXISTE E PEGAR A DATA ATUAL PRA MANDAR NO CADASTRO
        else {
            try {

                
                // const apikey='17WSkBjvI05cpe6aZzGehsoJ366ifMF9'
                // const url = `https://api.captainverify.com/v2/verify?apikey=${apikey}&email=${emailProfessor}`
                // const response=await fetch(url)
                // const data=await response.json()
                // console.log(data);
                // // const dadoEmail=data.alunos        
                //       if (data) {

                const professorDados = {
                    email: emailProfessor,
                    data:data_atual
                };
                const res = await fetch(`${BASE_URL}v1/sinalibras/usuario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(professorDados),
                })
                .then(response => response.json())
.then(data => {
    console.log(data);
    if (data.status) {
        

                        const dadosParaEnviar = {
                            email: data.usuario.id,
                        };
        
                        setDados(dadosParaEnviar)
                        navigate('/Quiz')
    }
    else{
        setErroNull(false)
        setTextoErro('Ocorreu um erro por parte do servidor, tente novamente mais tarde')
    }
}) 
                        //   }

                
            } catch (error) {
                console.log(error);   
            }
          
        }
    }


    async function mandarAluno(e) {
        e.preventDefault()
        if (name == null || name == undefined || name == '' ||
        email == null || email == undefined || email == '' ||
            senha == null || senha == undefined || senha == '' ||
            conf_senha == null || conf_senha == undefined || conf_senha == '' ||
            data_nasc == null || data_nasc == undefined || data_nasc == ''
            ) {
                setErroNull(false)
                setTextoErro('Todos os campos devem ser preenchidos, favor verificar')
            }
            else if (senha!==conf_senha) {
                setErroNull(false)
                setTextoErro('Sua Senha não confere')
            }
            else if(senha.length>8){            
                setErroNull(false)
                setTextoErro('Sua senha deve conter apenas 8 caracteres')
            }
            else {
                
                try {
                const alunoDados = {
                    nome: name,
                    email: email,
                    senha: senha,
                    data_nascimento: data_nasc,
                    foto_perfil: "",
                    data_cadastro:data_atual
                };
                const res = await fetch(`${BASE_URL}v1/sinalibras/aluno`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(alunoDados),
                })
                .then(response => response.json())
.then(data => {
    console.log(data); 
    if (!data) {
                    
        setErroNull(false)
        setTextoErro('Ocorreu um erro, favor, verifique se preencheu tudo corretamente')
            }
            else{
                const dadosParaEnviar = {
                    id: data.aluno.id_aluno,
                };

                setDados(dadosParaEnviar)
                navigate('/Home');          
                  }
})
.catch(error => console.error('Erro:', error));
                

                

            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        }
    }

    return (

            <div className={styles.body}>
                <div className={styles.esquerda}>
                    {/* esquerda */}
                    <img src={logo}></img>
                    <h1 className={styles.texto}>Escolha Como Pretende Participar</h1>
                    <div className={styles.container}>
                        <div id='cardProfessor'
                            style={{
                                backgroundColor: isHiddenAluno ? 'rgba(113, 105, 228, 0.425)' : 'rgba(113, 105, 228, 0.144)',
                            }} className={styles.card} onClick={() => {
                                setisHiddenAluno(true)
                                setisHiddenProfessor(false)
                            }}>
                            <img src={professor}></img>
                            <h3 className={styles.texto}>Professor</h3>
                        </div>
                        <div id="cardAluno"
                            style={{
                                backgroundColor: isHiddenProfessor ? 'rgba(113, 105, 228, 0.425)' : 'rgba(113, 105, 228, 0.144)',
                            }} className={styles.card} onClick={() => {
                                setisHiddenAluno(false)
                                setisHiddenProfessor(true)
                                setErroNull(true)

                            }
                            }>
                            <img src={aluno}></img>
                            <h3 className={styles.texto}>Aluno</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.direita}>
                    {/* direita */}
                    <form className={styles.formulario} hidden={isHiddenAluno}>
                        <div hidden={isHiddenAluno}>
                            <h4 className={styles.texto_input} hidden={isHiddenAluno}>Nome Completo</h4>
                            <input type='text' className={styles.input} hidden={isHiddenAluno} id="input_name" name="input_name" onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div hidden={isHiddenAluno}>
                            <h4 className={styles.texto_input} hidden={isHiddenAluno}>Email</h4>
                            <input type='email' className={styles.input} hidden={isHiddenAluno} id="input_email" name="input_email" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div hidden={isHiddenAluno}>
                            <h4 className={styles.texto_input} hidden={isHiddenAluno}>Senha</h4>
                            <input type='password' className={styles.input} hidden={isHiddenAluno} id="input_senha" name="input_senha" onChange={(e) => setSenha(e.target.value)}></input>

                        </div>
                        <div hidden={isHiddenAluno}>
                            <h4 className={styles.texto_input} hidden={isHiddenAluno}>Confirmar Senha</h4>
                            <input type='password' className={styles.input} hidden={isHiddenAluno} id="input_conf_senha" name="input_conf_senha" onChange={(e) => setConfSenha(e.target.value)}></input>
                        </div>
                        <div hidden={isHiddenAluno}>
                            <h4 className={styles.texto_input} hidden={isHiddenAluno}>Data de Nascimento</h4>
                            <input type='date' className={styles.input} hidden={isHiddenAluno} id="input_data_nasc" name="input_data_nasc" onChange={(e) => setDataNasc(e.target.value)}></input>
                        </div>
                    </form>
                    <button className={styles.botao} onClick={mandarAluno} hidden={isHiddenAluno}>Cadastrar</button>
                    
                    <h3 className={styles.entrar} hidden={isHiddenAluno}>Já tem uma conta?</h3>
                    <h2 className={styles.entrar} onClick={()=>navigate('/Login')} hidden={isHiddenAluno}>Entrar</h2>
                    <div className={styles.direita_professor} hidden={isHiddenProfessor} >
                        {/* PROFESSOR */}
                        <h3 hidden={isHiddenProfessor} className={styles.texto_professor}>Para ser mentor em nosso aplicativo, precisamos validar seu nivel de conhecimento em Libras, para isso você precisará responder a 15 perguntas.</h3>
                        <h3 className={styles.negrito} hidden={isHiddenProfessor}>É necessário ter 70% de acerto, ou mais!</h3>
                        <h3 hidden={isHiddenProfessor} className={styles.texto_professor}>Mas antes, escreva seu endereço de email no campo a baixo </h3>
                        <input type='email' placeholder='Email' className={styles.input_email} hidden={isHiddenProfessor} id="input_email_professor" name="input_email_professor" onChange={(e) => setEmailProfessor(e.target.value)}></input>
                        <h4 className={styles.erro_null} hidden={erroNull}>{textoErro}</h4>
                        <button hidden={isHiddenProfessor} onClick={irParaQuizProfessor} className={styles.botao}>Responder</button>
                    </div>
                </div>

            </div>
    )
}

export default Cadastro;