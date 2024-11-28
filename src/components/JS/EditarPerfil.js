import { FaArrowLeft, FaRegCalendarAlt, FaChevronRight } from "react-icons/fa";
import styles from "../CSS/EditarPerfil.module.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { format, parseISO, isValid } from "date-fns";

const EditarPerfil = () => {
  const BASE_URL = "http://localhost:8080/";
  const { setDados, dados } = useContext(AppContext);

  // Função para formatar a data no formato 'dd/MM/yyyy'
  const formatarData = (dataISO) => {
    if (!dataISO) return "";
    try {
      const data = parseISO(dataISO); // Converte string ISO para objeto Date
      return isValid(data) ? format(data, "dd/MM/yyyy") : ""; // Formato desejado: dd/MM/yyyy
    } catch {
      return "";
    }
  };

  console.log("Dados recebidos do contexto:", dados);

  const [nome, setNome] = useState(dados?.nome || "");
  const [email, setEmail] = useState(dados?.email || "");
  const [data_nasc, setDataNascimento] = useState(
    formatarData(dados?.data_nascimento)
  );
  const [fotoPerfil, setFotoPerfil] = useState(
    dados?.foto_perfil || "https://via.placeholder.com/100"
  );

  const navigate = useNavigate();

  // Verifica se os dados do usuário estão disponíveis
  useEffect(() => {
    if (!dados || !dados.id) {
      alert("Erro: Dados do usuário não foram carregados.");
      navigate("/login");
    }
  }, [dados, navigate]);

  const salvarAlteracoes = async () => {
    if (!dados || !dados.id) {
      alert("Erro: Dados do usuário não carregados corretamente.");
      return;
    }

    // Define os dados para envio
    const alunoDados = {
      nome: nome,
      email: email,
      data_nascimento: data_nasc,
      foto_perfil: fotoPerfil, // Apenas o URL ou null
    };

    console.log("Dados a serem enviados:", alunoDados);

    try {
      const response = await fetch(
        `${BASE_URL}v1/sinalibras/aluno/${dados?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alunoDados),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDados({ ...dados, ...alunoDados });
        alert("Perfil atualizado com sucesso!");
        navigate('/perfil')
      } else {
        alert(`Erro ao atualizar perfil: ${data.message || "Detalhes não fornecidos"}`);
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      alert("Erro ao salvar as alterações!");
    }
  };

  const iconNavegacaoPerfil = () => {
    navigate("/Perfil");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.editarPerfilContainer}>
      <header className={styles.editarPerfilHeader}>
        <button className={styles.voltarButton}>
          <FaArrowLeft size={20} onClick={iconNavegacaoPerfil} />
        </button>
        <h1>Editar Perfil</h1>
      </header>

      <div className={styles.fotoPerfil}>
        <img src={fotoPerfil} alt="Foto do Perfil" className={styles.foto} />
        <input
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          onChange={handleImageChange}
        />
      </div>

      <form className={styles.formulario}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="dataNasc">Data de Nascimento</label>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              id="dataNasc"
              name="dataNasc"
              value={data_nasc}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <FaRegCalendarAlt className={styles.inputIcon} size={20} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="button" className={styles.alterarSenhaButton}>
          Alterar Senha <FaChevronRight size={16} />
        </button>
      </form>

      <button className={styles.salvarButton} onClick={salvarAlteracoes}>
        Salvar Alterações
      </button>
    </div>
  );
};

export default EditarPerfil;
