import styles from "../CSS/Home.module.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { FaEye } from "react-icons/fa";

function App() {
  return (
    <div className={styles.container}>
      <header>
        <MdOutlineKeyboardArrowLeft className='icon' />
        <h2>Alterar Senha</h2>
      </header>

      <div className={styles.mesage}>
        <span>
          <p>
            Um código de verificação foi enviado ao seu email.
            Por favor, insira-o no campo abaixo
          </p>
        </span>

        <div className={styles.mesage-input}>
          <input className={styles.code} disabled placeholder='AH293HN' />
          <button className={styles.send}>
            <IoMdSend />
          </button>
        </div>
      </div>

      <p className={styles.text}>
        Sua senha precisa ter pelo menos seis caracteres e
        incluir uma combinação de números, letras e caracteres especiais
        !@#$
      </p>

      <div className={styles.passwords}>
        <input className={styles.pass} type="password" />
        <input className={styles.pass1} type="password" />
        <FaEye className={styles.eye} />
        <button>
          <p>Confirmar</p>
        </button>
      </div>
    </div>
  );
}

export default App;