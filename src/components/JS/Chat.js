import React from 'react';
import styles from '../CSS/Chat.module.css'
import { BiSolidPhoneCall } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


const users = [
  { id: 1, name: 'nome do usuário' },
  { id: 2, name: 'nome do usuário' },
  { id: 3, name: 'nome do usuário' },
  { id: 4, name: 'nome do usuário' },
  { id: 5, name: 'nome do usuário' },
];

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      {/* Sidebar com lista de usuários */}
      <div className={styles.sidebar}>
        <div className={styles.searchBar}>
        <IoSearch />
          <input type="text" placeholder="Pesquisar por usuários..." />
        </div>

        <div class={styles.contactsContainer}>
  <div class={styles.contact}><FaUserCircle className={styles.cont}/></div>
  <div class={styles.contact}><FaUserCircle className={styles.cont}/></div>
  <div class={styles.contact}><FaUserCircle className={styles.cont}/></div>
  <div class={styles.contact}><FaUserCircle className={styles.cont}/></div>
</div>

        <div className={styles.userList}>
          {users.map((user) => (
            <div className={styles.userItem} key={user.id}>
              <div className={styles.userAvatar}></div>
              <div className={styles.userInfo}>
                <span>{user.name}</span>
                <div className={styles.statusDot}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área do Chat */}
      <div className={styles.chatArea}>
        <div className={styles.chatHeader}>
          <div className={styles.chatheaderInfo}>
            <div className={styles.selecteduserAvatar}></div>
            <div className={styles.selecteduserName}>JAMES SMITH</div>
          </div>
          <div className={styles.chatheaderActions}>
            <button><BiSolidPhoneCall /></button>
            <button><CiMenuKebab /></button>
          </div>
        </div>

        <div className={styles.messages}>
          <div className={styles.messageReceived}>
            <p>Oi, como vai?</p>
          </div>
          <div className={styles.messageSent}>
            <p>Tudo bem, e você?</p>
          </div>
        </div>

        {/* Input para enviar mensagens */}
        <div className={styles.messageInput}>
          <input type="text" placeholder="Mensagem..." />
          <button className={styles.sendButton}><IoSend />
</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;