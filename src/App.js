


import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './components/JS/Cadastro'
import Login from './components/JS/Login'
import Home from './components/JS/Home'
import Quiz from './components/JS/Quiz'
import Configuracoes from './components/JS/Configuracoes'
import Perfil from './components/JS/Perfil'
import EditarPerfil from './components/JS/EditarPerfil'
import Chat from './components/JS/Chat'
import Aulas from './components/JS/Aulas'
import Videos from './components/JS/Videos'
import AlterarSenha from './components/JS/AlterarSenha'
import SobreNos from './components/JS/SobreNos';

import { AppProvider } from './context/AppContext'; // Importa o contexto

import React from 'react';

// Import the functions you need from the SDKs you need


function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Configuracoes" element={<Configuracoes />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/EditarPerfil" element={<EditarPerfil />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Aulas" element={<Aulas />} />
          <Route path="/Videos" element={<Videos />} />
          <Route path="/AlterarSenha" element={<AlterarSenha />} />
          <Route path="/SobreNos" element={<SobreNos />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>

  );
}

export default App;
