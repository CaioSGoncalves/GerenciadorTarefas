import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Main.css';

import api from '../services/api';

export default function Main() {
    const [ tasks, setTasks ] = useState([]);
    const [ titulo, setTitulo ] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            // const response = await api.get('/tarefas', {
            //     headers: {
            //         todas: true,
            //     }
            // });
            const response = await api.get('/tarefas');

            setTasks(response.data);
        }
        loadTasks();
    }, []);

    useEffect(() => {

        async function handleSocket() {
            const socket = io('http://localhost:3333');
            socket.on('update', async () => {
                const response = await api.get('/tarefas');
                setTasks(response.data);
            });
        }
        handleSocket();
    }, []);

    async function handleCadastroTask(e) {
        e.preventDefault();

        const response = await api.post('/tarefas', {
            titulo,
        });
        alert("Tarefa criada com sucesso!")
    }

    async function handleRowClick(e) {
        e.preventDefault();
        console.log("CLickou");
    }

    return (
        <div className="main-container">
            <div className="lista">
                <h1>O que precisa ser feito?</h1>
                { tasks.length > 0 ? (
                    <ul>
                    {tasks.map(task => (
                        
                        <div className="item" key={task.id} onClick={handleRowClick}>
                            {/* <li onClick={handleRowClick}> */}
                            {/* <img src={task.avatar} alt="" /> */}
                            <strong>{task.titulo}</strong>

                            {/* <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>      */}
                        {/* </li> */}
                        </div>
                    ))}
                    </ul>
                ) : (
                    <div className="empty">Acabou :)</div>
                )}
                
            </div>

            <div className="cadastro">
                <h1>Cadastrar nova Tarefa</h1>
                <form onSubmit={handleCadastroTask}>
                    <input
                    placeholder="Digite o titulo da Tarefa"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    />
                    <button type="submit">Cadastrar</button>
                </form>

        </div>
        </div>
    );
}

