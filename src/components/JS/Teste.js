import React, { useState, useEffect } from 'react';

function PerfilAluno() {
    const [aluno, setAluno] = useState(null); // Estado para armazenar os dados do aluno

    useEffect(() => {
        // Substitua a URL pela do seu backend que retorna os dados do aluno
        fetch('http://localhost:8080/v1/sinalibras/aluno/1') // ID de exemplo
            .then(response => response.json())
            .then(data => {
                setAluno(data); // Armazena os dados do aluno no estado
            })
            .catch(error => {
                console.error('Erro ao buscar os dados do aluno:', error);
            });
    }, []);

    if (!aluno) {
        return <div>Carregando...</div>; // Tela de carregamento enquanto os dados não chegam
    }

    return (
        <div>
            <h1>Perfil do Aluno</h1>
            <p><strong>ID:</strong> {aluno.id_aluno}</p>
            <p><strong>Nome:</strong> {aluno.nome}</p>
            <p><strong>Data de Cadastro:</strong> {aluno.data_cadastro}</p>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>Data de Nascimento:</strong> {aluno.data_nascimento}</p>
            {aluno.foto_perfil && (
                <div>
                    <strong>Foto de Perfil:</strong>
                    <img src={aluno.foto_perfil} alt="Foto de perfil" style={{ width: '150px', borderRadius: '50%' }} />
                </div>
            )}
        </div>
    );
}

export default PerfilAluno;