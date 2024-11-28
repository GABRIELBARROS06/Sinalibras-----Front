import styles from '../CSS/Quiz.module.css'
import logo from '../../img/Logo.png'
function AcertouQuiz() {
    const resultado='70%'
    return(
        <div className={styles.bodyAcerto}>
            <img src={logo}></img>
            <h1 className={styles.textoGrandeAcerto}>Total de Acertos: {resultado}</h1>
<div className={styles.card}>
<h2 className={styles.textoParabens}>PARABÉNS!</h2>
<h3 className={styles.resumoResultado}>
Você passou no teste, pode ensinar Lingua de Sinais aos estudantes.
</h3>
<button className={styles.btns}>Criar Conta</button>
</div>
        </div>
    )
}
export default AcertouQuiz