import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from '../CSS/Perfil.module.css';
import pessoinha from '../../img/pessoinha.png';
import imagem from '../../img/perfil.png';
import { IoMdSettings } from "react-icons/io";
import { HiArrowLeft } from "react-icons/hi";

function Perfil() {
    const BASE_URL = 'http://localhost:8080/';
    const navigate = useNavigate();
    const { setDados } = useContext(AppContext);
    const { dados } = useContext(AppContext);

    // Estados para dados do perfil
    const [nome, setNome] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');

    useEffect(() => {
        async function buscarAlunoLogado() {
            try {
                const response = await fetch(`${BASE_URL}v1/sinalibras/aluno/${dados.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();

                console.log('Dados retornados da API:', data);

                if (data.status_code === 200) {
                    setNome(data.aluno.nome || 'Nome não informado');
                    setTipoUsuario(dados.tipoUsuario || 'Usuário não informado');
                    setDataNascimento(data.aluno.data_nascimento || 'Data de nascimento não informada');
                    setFotoPerfil(data.aluno.foto_perfil || imagem); // Fallback para imagem padrão
                } else {
                    setNome('Aluno não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar o aluno:', error);
                setNome('Erro ao carregar o nome');
            }
        }
        buscarAlunoLogado();
    }, [dados.id, dados.tipoUsuario]);

    const iconNavegacaoPerfil = () => {
        const dadosParaEnviar = {
            id: dados.id,
            tipoUsuario: dados.tipoUsuario,
            nome: nome,
            data_nascimento: dataNascimento,
            email: dados.email,
            foto_perfil: fotoPerfil,
        };
        setDados(dadosParaEnviar);
        navigate('/EditarPerfil');
    };

    const iconNavegacaoHome = () => navigate('/Home');
    const iconNavegacaoConfig = () => navigate('/Configuracoes');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <HiArrowLeft className={styles.iconBack} onClick={iconNavegacaoHome} />
                <h1>Perfil</h1>
                <IoMdSettings className={styles.iconSettings} onClick={iconNavegacaoConfig} />
            </header>

            <main className={styles.main}>
                <div className={styles.perfil}>
                    <img className={styles.perfilImg} src={fotoPerfil} alt="Foto do perfil" />
                    <div className={styles.info}>
                        <h2>{nome || 'Carregando...'}</h2>
                        <span className={styles.userType}>{tipoUsuario || 'Carregando...'}</span>
                        {/*<p>Data de Nascimento: {dataNascimento}</p>*/}
                    </div>
                    <button className={styles.editButton} onClick={iconNavegacaoPerfil}>Editar Perfil</button>
                </div>

                <div className={styles.sections}>
                    <button className={styles.sectionButton}>Postagens</button>
                    <button className={styles.sectionButton}>Aulas</button>
                </div>

                <div className={styles.posts}>
                    {[1, 2].map((item) => (
                        <div key={item} className={styles.post}>
                            <img src={pessoinha} alt="Imagem do usuário" />
                            <div className={styles.postContent}>
                                <h3>José Silva</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Perfil;
