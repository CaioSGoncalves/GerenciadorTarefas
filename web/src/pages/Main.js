import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Main.css';

import api from '../services/api';

export default function Main() {
    const [ tasks, setTasks ] = useState([]);
    const [ reload, setReload ] = useState([true]);
    const [ titulo, setTitulo ] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const response = await api.get('/tarefas', {
                headers: {
                    todas: true,
                }
            });
            setTasks(response.data);
            setReload(false);
        }
        loadTasks();
    }, [reload]);

    useEffect(() => {

        async function handleSocket() {
            const socket = io('http://192.168.99.100:3000');
            socket.on('update', async () => {
                // const response = await api.get('/tarefas');
                // setTasks(response.data);
                setReload(true);
            });
        }
        handleSocket();
    }, []);

    async function handleCadastroTask(e) {
        e.preventDefault();

        await api.post('/tarefas', {
            titulo,
        });
        alert("Tarefa criada com sucesso!")
    }

    async function handleRowClick(e) {
        const photo = e.target;

        if (photo.style.height === "36px" || photo.style.height === "") {
            photo.style.height = "288px";
            photo.style.width = "288px";
        } else {
            photo.style.height = "36px";
            photo.style.width = "36px";
        }
    }

    return (
        <div className="main-container">
            <div className="lista">
                <h1>O que precisa ser feito?</h1>
                { tasks.length > 0 ? (
                    <ul>
                    {tasks.map(task => (
                        
                        <div className="item" key={task.id}>
                            { task.completada ?  <strong style={{textDecoration: "line-through"}}>{task.titulo}</strong> : <strong>{task.titulo}</strong>}
                            { task.completada && 
                                <div className="photo" style={{backgroundImage: `url(${task.image_url})`}} onClick={handleRowClick} />}                            
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

