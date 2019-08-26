import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

import "./TaskList.css";

export default function TaskList(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

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
    <div className="lista">
      <h1>O que precisa ser feito?</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <div className="item" key={task.id}>
              {task.completada ? (
                <strong style={{ textDecoration: "line-through" }}>
                  {task.titulo}
                </strong>
              ) : (
                <strong>{task.titulo}</strong>
              )}
              {task.completada && (
                <div
                  className="photo"
                  style={{ backgroundImage: `url(${task.image_url})` }}
                  onClick={handleRowClick}
                />
              )}
            </div>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :)</div>
      )}
    </div>
  );
}
