import React from 'react';
import styles from '../CSS/Configuracoes.module.css'
import voltar from '../../img/Voltar.png'
import logo from '../../img/logoGrande.png'
import lixo from '../../img/Lixeira.png'
import suporte from '../../img/suporte.png'
import nivel from '../../img/nivel.png'
import sobre from '../../img/sobreNos.png'
import pesquisar from '../../img/pesquisar.png'
import perfil from '../../img/perfil.png'

import { useEffect } from 'react';

import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';



function Configuracoes() {
  const BASE_URL = 'http://localhost:8080/'
  const { dados } = useContext(AppContext);
  const { setDados } = useContext(AppContext);

  const navigate = useNavigate();

  async function excluirConta() {
    //coloqueei esses dois comentarios pra poder utilizar o confirm, futuramente, caso tenha tempo, volta aq e ve outro jeito
    // eslint-disable-next-line no-restricted-globals
    const confirmou1= confirm("Tem certeza de que deseja excluir a sua conta?")
    if (confirmou1) {
      // eslint-disable-next-line no-restricted-globals
      const confirmou2=confirm("Esta ação é irreversivel, tem certeza de que deseja excluir sua conta?")
      if (confirmou2) {
    const url = `${BASE_URL}v1/sinalibras/aluno/${dados.id}`
    const options={
      method:`DELETE`
  }
  const response=await fetch(url,options)
if (response) {
  alert('operação realizada com sucesso')
  navigate('/Cadastro');

}
else{
  alert('Ocorreu um erro, tente novamente mais tarde')
}

  
      }
      
    }
    }

    function myPerfilNavigation() {
      navigate("/Perfil")
    }
    function sobreNoslNavigation() {
      navigate("/SobreNos")
    }
  return (
    <div className={styles.configuracoes} onClick={()=>{
        const dadosParaEnviar = {
            // id: dadoEmail.id_aluno,
                                id: 1,
        };

        setDados(dadosParaEnviar)
    }}>
      {/* Cabeçalho */}
      <header>
        <img className={styles.voltar} src={voltar} onClick={()=>navigate('/Home')}></img>
        <h2>Configurações</h2>
        <img className={styles.logo} src={logo}></img>
      </header>

      {/* Barra de Pesquisa */}
      <div className={styles.search_bar}>
        <div>
        <img src={pesquisar}></img>
          <input type="text" placeholder="Pesquisar..." />
        </div>
      </div>

      {/* Lista de Opções */}

      <div className={styles.options_list}>
        <div className={styles.card}>
          <div onClick={myPerfilNavigation}>
          <img src={perfil}></img>
          <p>Meu perfil</p>
          </div>
          <img src={voltar} className={styles.btn}></img>
        </div>
        <div className={styles.card}>
          <div>
          <img src={suporte}></img>
          <p>Suporte/Denuncia</p>
          </div>
          <img src={voltar} className={styles.btn}></img>
        </div>
        <div className={styles.card}>
          <div>
          <img src={sobre} onClick={navigate('/SobreNos')}></img>
          <p>Sobre Nós</p>
          </div>
          <img src={voltar} className={styles.btn}></img>
        </div>
        <div className={styles.card}>
          <div>
          <img src={nivel}></img>
          <p>Verificar Nivel</p>
          </div>
          <img src={voltar} className={styles.btn}></img>
        </div>
        <div className={styles.excluir} onClick={excluirConta}>
        <img src={lixo}></img>
          <p>Excluir Conta</p>
        </div>
      </div>

      {/* Botão Excluir Conta */}

    </div>
  );
}

export default Configuracoes;


