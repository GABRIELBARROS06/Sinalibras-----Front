
import styles from '../CSS/Quiz.module.css'
import logo from '../../img/logoGrande.png';


import { useState } from 'react'
import { useEffect } from 'react';

import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

//EU TENHO QUE PEGAR A FUNCAO QUE VAI TRAZER AS PERGUNTAS,
// DAI EU VOU CRIAR CARDS NA TELA CONFORME O RETORNO DA API,
// A CADA RESPOSTA QUE A PESSOA DER, 
//EU VOU VERIFICAR SE A AUTERNATIVA ESTÁ CORRETA,
//E GUARDAR OS DADOS COMO ID DA PERGUNTA E ID DA RESPOSTA FORNECIDA,
//PARA NO FINAL, VERIFICAR A QUANTIDADE DE ACERTOS,
// SE ACERTOU 70%, EU VOU REDIRECIONAR PARA A TELA DE PARABENS, QUE VAI REDIRECIONAR PARA A TELA DE CADASTRO(LEVANDO CONSIGO O EMAIL, PARA DEIXAR O CAMPO AUTOCOMPLETADO), 
//MAS CASO NN, VOU ENVIAR O EMAIL DA PESSOA PARA O BACK, PARA BLOQUEAR SEU ACESSO, E REDIRECIONAR PARA A TELA DE FALHA


import React from 'react';



// function Quiz() {
//     const [erroNull, setErroNull] = useState(true)
//     const [textoErro, setTextoErro] = useState('')
//     // const [perguntaAPI, setPerguntaAPI] = useState()
//     // const [videoAPI, setVideoAPI] = useState()
//     const [respostaAPI, setRespostaAPI] = useState([])


//     //no set dados eu vou enviar o email para a tela de login, para q o campo seja preenchido automaticamente
//     const { setDados } = useContext(AppContext);

//     const BASE_URL = 'http://localhost:8080/'

//     // const [respostas, setRespostas] = useState([])

//     //async function validarResposta(e) {




//     //  const navigate = useNavigate();
//     function gerarNumeroAleatorio() {
//         return Math.floor(Math.random() * 20) + 1; // Gera um número entre 1 e 20
//     }

//     //tudo certo, o return ta sendo assim
//     // Pergunta: Qual é a capital da França?
//     // Vídeo: video1.mp4
//     // Respostas: [
//     //     { alternativa: "Paris", status: 1 },
//     //     { alternativa: "Londres", status: 0 },
//     //     { alternativa: "Berlim", status: 0 }
//     // ]
//     async function pegarQuestoes() {
//         //const numeroAleatorio = gerarNumeroAleatorio();
//         const numeroAleatorio = 1;//pq até ent só tem uma pergunta no banco
//         // const url = `${BASE_URL}v1/sinalibras/questao/${numeroAleatorio}`
//         const url = `${BASE_URL}v1/sinalibras/questoes`
//         const response = await fetch(url)
//         const data = await response.json()
//         if (data) {

//             // Extrair a pergunta e as respostas
//             const questao = data.questao[0];
//             const pergunta = questao.pergunta;
//             const video = questao.video;

//             // Separar as respostas
//             const respostas = data.questao.map(q => ({
//                 alternativa: q.alternativa,
//                 status: q.status
//             }));

//             setPerguntaAPI(pergunta)
//             const videoTeste='https://drive.google.com/file/d/1edg8abnZZFzEvMZlErMdQiJWURADnV0S/view?usp=drive_link'
//             setVideoAPI(videoTeste)
//             setRespostaAPI(respostas)
//             criarCard()
//         }
//         else {
//             setErroNull(false)
//             setTextoErro('Ocorreu um erro, contate o administrador')
//         }

//     }
//     function criarCard() {
//         // respostas.forEach(element => {
//         //     const cont=+
//         //     <h3 onClick={setRespostas([true])}>{respostas[cont].alternativa}</h3>
//         // });
//         // if () {

//         // }
//     }

//     //   const navigate = useNavigate();

//     // const url = `${BASE_URL}v1/sinalibras/alunosemail/${email}`//MUDAR URL PARA A DO ENDPOINT 
//     // const response=await fetch(url)
//     // const data=await response.json()
//     // if (data.alternativa) {
//     ///const dadosParaEnviar = {
//     //            id: dadoEmail.id_aluno,
//     //      };
//     //
//     //     setDados(dadosParaEnviar)
//     //        navigate('/Home');



//     // const novoItem = `Item ${itens.length + 1}`;
//     // Atualiza o estado com o novo item
//     // setRespostas(prevRespostas => [...prevRespostas, novoItem]);

//     return (
//         <div className={styles.body} onLoad={pegarQuestoes} >
//             <img className={styles.logo} src={logo}></img>
//             <div className={styles.tela}>
//                 <div className={styles.pergunta}>
//                     <h3 className={styles.textoPergunta}>{perguntaAPI}</h3>
//                     <h5 className={styles.textoAuxilio}>(escolha a alternativa correta)</h5>
//                         <video autoPlay loop muted>
//                             <source src={videoAPI} type="video/mp4"></source>{/*AQ PEGA UM VIDEO ACREDITO Q LOCAL, POR ESQUANTO TA UM VIDEO FICTICIO, MAS PRA PEGAR O DE VDD, É SÓ EXCLUIR A CRIACAO DA CONST DA LINHA 4, Q DAI VAI SER SUBSTITUIDO PELO DA FUNCAO ACIMA*/}
//                             Seu navegador não suporta o elemento de vídeo.
//                         </video>
//                     <div className={styles.divVideo}>


//                         {/* esse iframe pega do youtube ou outra plataforma, um video */}
//                         {/* <iframe className={styles.videos} onClick={<AcertouQuiz/>} src="https://www.youtube.com/embed/pDbcC-xSat4?si=9ez3eckh1rHsTmGK" title="EXEMPLO DE VIDEO VINDO DO BACK" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" notallowfullscreen autoPlay></iframe> */}
//                     </div>

//                 </div>
//             </div>
//             <h2 color='red'>{textoErro}</h2>
//         </div>
//     );
// }



function Quiz() {
    
        const { dados } = useContext(AppContext);
        console.log(dados);
    
    const BASE_URL = 'http://localhost:8080/'

    // const [erroNull, setErroNull] = useState(true)
    // const [textoErro, setTextoErro] = useState('')
    const [respostasUsuario, setRespostas] = useState([])

    async function pegarQuestoes() {
        const body=document.getElementById('body')
        const divGeral = document.getElementById('div')
        try {
        const url = `${BASE_URL}v1/sinalibras/questoes`
        const response = await fetch(url)
        const data = await response.json()
        const questoes = data.questoes

        if (questoes) {
            body.style.height='100%'
            questoes.forEach(element => {
                const divPergunta = document.createElement('div')
                divPergunta.className=styles.pergunta

                const textoPergunta = document.createElement('h3')
                textoPergunta.textContent = element.pergunta
                textoPergunta.className=styles.textoPergunta
                
                const textoAuxilio = document.createElement('h5')
                textoAuxilio.textContent  = '(escolha a alternativa correta)'
                textoAuxilio.className=styles.textoAuxilio

                const video = document.createElement('video');
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                const source = document.createElement('source');
                source.src = element.video
                source.type = 'video/mp4';
                video.appendChild(source);
                video.innerHTML = "Seu navegador não suporta o elemento de vídeo.";
                const divRespostas=document.createElement('div')
                divRespostas.className=styles.divRespostas

                
                
                        divPergunta.appendChild(textoPergunta);
                        divPergunta.appendChild(textoAuxilio);
                        divPergunta.appendChild(video);
                const atividades = element.alternativas;
                atividades.forEach(atividade => {
                    
                    const resposta=document.createElement('h3')
                    resposta.textContent=atividade.alternativa
                    resposta.className=styles.respostas

                    resposta.addEventListener('click', ()=>{
                        console.log(atividade);
                            // setRespostas({id_alternativa:atividade.id_alternativa, id_professor:id_professor}) 
                            resposta.style.backgroundColor="#7FA1C3"
                            resposta.style.borderRadius="32px"
                            resposta.className=styles.respostaSelecionada



                            //COMO DEVE SER O RETORNO
                            // const dadosUsuario = [
                            //     { id_alternativa: 1, id_usuario_teste: 1 },
                            //     { id_alternativa: 2, id_usuario_teste: 1 },
                            //     { id_alternativa: 3, id_usuario_teste: 1 }
                            // ];
                        
                        console.log(resposta);
                        console.log(respostasUsuario);
                    })
                    divRespostas.appendChild(resposta);
                    divPergunta.appendChild(divRespostas);
                });

                
                // Adiciona a pergunta à div geral
                divGeral.appendChild(divPergunta);
            });
            const button=document.createElement('button')
                button.className=styles.btn
                button.textContent='ENVIAR'
            divGeral.appendChild(button);

         

        }
        else {
            const erro = document.createElement('h5')
            erro.textContent  = 'Ocorreu um erro, contate o administrador'
            erro.className=styles.textoErro
            body.style.height="100vh"

        }
    } catch (error) {
        const erro = document.createElement('h5')
        erro.textContent  = 'Ocorreu um erro, contate o administrador'
        erro.className=styles.textoErro  
        body.style.height="100vh"

                   divGeral.appendChild(erro);

    }
    }

    return (
        <div className={styles.body} id='body' onLoad={pegarQuestoes} >
            <img className={styles.logo} src={logo}></img>
            <div className={styles.tela} id="div">
                <div className={styles.pergunta} >
                    <h3 className={styles.textoPergunta}>{perguntaAPI}</h3>
                    <h5 className={styles.textoAuxilio}>(escolha a alternativa correta)</h5>
                    <video autoPlay loop muted>
                        <source src={videoAPI} type="video/mp4"></source>
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                    

                </div> 
            
            </div>
        </div>
    );
}
export default Quiz