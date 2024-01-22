function TaskForm(props) {
  return (
    <>
      <div className="container-flex bg-light">
        <form>
          <div className="row py-5 px-5">
            <div className="col-lg-8">
              <input
                onChange={props.handleChange}
                className="form-control"
                type="text"
                name="message"
                id="message"
                value={props.message.msgText}
                placeholder="enter a message"
              />
            </div>
            <div className="col-lg-2">
              {props.editingTask.isEdit ? (
                <button
                  onClick={props.handleUpdate}
                  className="btn btn-primary"
                >
                  Update
                </button>
              ) : (
                <button onClick={props.handleAdd} className="btn btn-primary">
                  Add
                </button>
              )}
            </div>
            <button
              className="col-lg-2 btn btn-success"
              onClick={props.handleCompleteBtn}
            >
              Completed Tasks
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
