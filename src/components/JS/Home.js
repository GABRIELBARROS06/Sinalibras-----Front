import styles from '../CSS/Home.module.css';
import logo from '../../img/logoGrande.png';
import chat from '../../img/chat.png';
import atividades from '../../img/atividades.png';
import aulas from '../../img/videoAula.png';
import ranking from '../../img/Rank.png';
import pesquisar from '../../img/pesquisar.png';
import comentario from '../../img/chat.png';

import videoAPI from '../../img/video1.mp4';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import React from 'react';
import { FiSettings, FiBell, FiChevronDown } from 'react-icons/fi'; // Ícones do react-icons

function Home() {
    const { dados } = useContext(AppContext);
    console.log(dados)
    const navigate = useNavigate();

    const [transitioning, setTransitioning] = useState(false); // Estado de transição
    const [isCardVisible, setCardVisible] = useState(false); // Estado para o card

    // Navegação com animação para Configurações
    function iconNavegacaoConfig() {
        setTransitioning(true); // Ativa a classe de animação
        setTimeout(() => {
            navigate('/Configuracoes'); // Navega após a animação
        }, 500); // Tempo deve coincidir com a duração da animação
    }

   

    // Função para alternar a visibilidade do card
    function toggleCardVisibility() {
        setCardVisible((prevState) => !prevState);
    }

    function iconNavegacaoPerfil() {
        navigate('/Perfil');
    }

    return (
        <div className={`${styles.body} ${transitioning ? styles.fadeOut : ''}`}>
            {/* HEADER */}
            <div className={styles.header}>
                <img src={logo} alt="Logo SinaLibras" className={styles.logo} />
                <div className={styles.headerRight}>
                    <FiSettings className={styles.icon} onClick={iconNavegacaoConfig} title="Configurações" />
                    <FiBell className={styles.icon} title="Notificações" />
                    <span className={styles.userName}>{dados?.nome || 'Usuário'}</span>
                    <FiChevronDown className={styles.arrowDown} onClick={toggleCardVisibility}title="Menu do Usuário" />
                </div>
            </div>

            {isCardVisible && (
    <div
        className={`${styles.dropdownCard} ${
            isCardVisible ? styles.dropdownCardVisible : ''
        }`}
    >
        <div className={styles.cardOption} onClick={() => navigate('/Perfil')}>
            <FiSettings className={styles.cardIcon} />
            <span>Perfil</span>
        </div>
        <div className={styles.cardOption} onClick={() => navigate('/Configuracoes')}>
            <FiSettings className={styles.cardIcon} />
            <span>Configurações</span>
        </div>
        <div
  className={styles.cardOption}
  onClick={() => {
    alert("Você está saindo da sua conta, obrigado!!!");
    navigate('/Login');
  }}
>
  <FiSettings className={styles.cardIcon} />
  <span>Sair</span>
</div>
    </div>
)}


            {/* BARRA LATERAL */}
            <div className={styles.esquerda}>
                <img src={logo} alt="Logo" />
                <div className={styles.nav}>
                    <div className={styles.divzinha} onClick={iconNavegacaoPerfil}>
                        <img src={chat} alt="Chat" />
                        <h4>Perfil</h4>
                    </div>
                    <div className={styles.divzinha} onClick={() => navigate('/Chat')}>
                        <img src={atividades} alt="Atividades" />
                        <h4>Chat</h4>
                    </div>
                    <div className={styles.divzinha} onClick={() => navigate('/Aulas')}>
                        <img src={aulas} alt="Aulas" />
                        <h4>Aulas</h4>
                    </div>
                    <div className={styles.divzinha}>
                        <img src={ranking} alt="Ranking" />
                        <h4>Ranking</h4>
                    </div>
                </div>
            </div>

            {/* CONTEÚDO CENTRAL */}
            <div className={styles.centro}>
                <div className={styles.search_bar}>
                    <div>
                        <img src={pesquisar} alt="Pesquisar" />
                        <input type="text" placeholder="Pesquisar..." />
                    </div>
                </div>

                <div className={styles.cardPublicacaoTipoVideo}>
                    <div className={styles.infoEVideo}>
                        <video muted onClick={() => {}} className={styles.video}>
                            <source src={videoAPI} type="video/mp4" />
                            Seu navegador não suporta o elemento de vídeo.
                        </video>
                        <div className={styles.informacoesDoVideo}>
                            <h3 className={styles.infoVideo}>Título</h3>
                            <h3 className={styles.infoVideo}>Data e hora de postagem</h3>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.divComentar} onClick={() => {}}>
                        <div>
                            <button>
                                <img src={comentario} alt="Comentar" />
                            </button>
                            <h4>Comentar...</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
