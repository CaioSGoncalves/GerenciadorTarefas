import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "./Main.css";
import api from "../services/api";
import TaskList from "../components/TaskList";

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState([true]);
  const [titulo, setTitulo] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const response = await api.get("/tarefas", {
        headers: {
          todas: true
        }
      });
      setTasks(response.data);
      setReload(false);
    }
    loadTasks();
  }, [reload]);

  useEffect(() => {
    async function handleSocket() {
      const socket = io(process.env.REACT_APP_API_HOST);
      socket.on("update", async () => {
        setReload(true);
      });
    }
    handleSocket();
  }, []);

  async function handleCadastroTask(e) {
    e.preventDefault();

    await api.post("/tarefas", {
      titulo
    });
    alert("Tarefa criada com sucesso!");
  }

  return (
    <div className="main-container">
      <div className="tabs-container">
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab>Todos</Tab>
            <Tab>Pendentes</Tab>
            <Tab>Feitos</Tab>
          </TabList>
          <TabPanel className="tab-panel">
            <TaskList tasks={tasks}></TaskList>
          </TabPanel>
          <TabPanel className="tab-panel">
            <TaskList
              tasks={tasks.filter(tasks => !tasks.completada)}
            ></TaskList>
          </TabPanel>
          <TabPanel className="tab-panel">
            <TaskList
              tasks={tasks.filter(tasks => tasks.completada)}
            ></TaskList>
          </TabPanel>
        </Tabs>
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
