import { useState } from "react";
import "./App.css";
import TaskForm from "./TaskForm";

function App() {
  const [tasksList, setTasksList] = useState([]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [message, setMessage] = useState({
    msgText: "",
    id: "",
  });

  const [editingTask, setEditingTask] = useState({
    id: "",
    isEdit: false,
  });

  const [showCompleteTask, setShowCompleteTask] = useState({
    id: "",
    isComplete: false,
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

    setMessage({
      ...message,
      msgText: "",
    });

    setEditingTask({
      isEdit: false,
    });

    event.preventDefault();
  };

  const handleComplete = (id) => {
    const completedTask = tasksList.find((task) => task.id === id);
    console.log("completed tasks", completedTask);
    setCompletedTasks([...completedTasks, completedTask]);
    const updatedtasks = tasksList.filter((eachTask) => {
      return eachTask.id !== id;
    });
    setTasksList(updatedtasks);
  };

  const showCompleted = (event) => {
    setShowCompleteTask({
      isComplete: true,
    });
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
        handleCompleteBtn={showCompleted}
      />

      {/* completed tasks code */}

      {showCompleteTask.isComplete ? (
        <div className="container mt-3">
          <ul>
            {completedTasks.length !== 0 && (
              <h3 className="text-success-emphasis fw-semibold mb-3">
                Completed Tasks
              </h3>
            )}

            {completedTasks.map((eachtask) => {
              const { msgText, id } = eachtask;
              return (
                <div className="alert alert-info">
                  <h4>{msgText}</h4>
                </div>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <div className="container mt-3">
            {tasksList.length === 0 && (
              <h4 className="text-success">No task is pending</h4>
            )}
            <ul>
              {tasksList.length !== 0 && (
                <h3 className="text-danger-emphasis fw-semibold">
                  Pending Tasks
                </h3>
              )}

              {tasksList.map((eachtask) => {
                const { msgText, id } = eachtask;
                return (
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
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => handleComplete(id)}
                    >
                      Completed
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
