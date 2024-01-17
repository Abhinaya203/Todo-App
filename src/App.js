import { useState } from "react";
import "./App.css";
import TaskForm from "./TaskForm";

function App() {
  const [tasksList, setTasksList] = useState([]);

  const [message, setMessage] = useState({
    msgText: "",
    id: "",
  });

  const [editingTask, setEditingTask] = useState({
    id: "",
    isEdit: false,
  });

  const handleChange = (event) => {
    setMessage({
      ...message,
      msgText: event.target.value,
      id: new Date().getTime().toString(),
    });
  };

  const handleAdd = (event) => {
    setTasksList([...tasksList, message]);
    setMessage({
      ...message,
      msgText: "",
    });
    console.log(message);
    event.preventDefault();
  };

  const handleDelete = (id) => {
    // Filter all tasks that are not matchng with given id
    const updatedtasks = tasksList.filter((eachTask) => {
      return eachTask.id !== id;
    });

    // Set all the updatedTasksList to tasksList
    setTasksList(updatedtasks);
  };

  const handleEdit = (id) => {
    setEditingTask({
      ...editingTask,
      id: id,
      isEdit: true,
    });
    const currenttask = tasksList.find((eachTask) => {
      return eachTask.id === id;
    });

    setMessage({
      ...message,
      msgText: currenttask.msgText,
    });
  };

  const handleUpdate = (event) => {
    const updatedList = tasksList.map((eachTask) => {
      if (editingTask.id === eachTask.id) {
        return {
          msgText: message.msgText,
          id: editingTask.id,
        };
      } else {
        return eachTask;
      }
    });

    setTasksList(updatedList);

    event.preventDefault();
  };

  return (
    <div className="App">
      <TaskForm
        message={message}
        handleChange={handleChange}
        handleAdd={handleAdd}
        editingTask={editingTask}
        handleUpdate={handleUpdate}
      />
      <div className="container mt-5">
        {tasksList.length === 0 && (
          <h4 className="text-success">No task is pending</h4>
        )}
        <ul>
          {tasksList.map((eachtask) => {
            const { msgText, id } = eachtask;
            return (
              <li>
                <div className="alert alert-info">
                  <h4>{msgText}</h4>
                  <button
                    onClick={() => handleDelete(id)}
                    className="btn btn-danger mx-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(id)}
                    className="btn btn-primary mx-2"
                  >
                    Edit
                  </button>
                  <button className="btn btn-success mx-2">Completed</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
