import React, { FC, useContext, useState } from "react";
import "./EditModulWindow.component.css";
import { ITask } from "../../../models/ITask";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const EditModulWindow : FC<ITask> = (props : ITask) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [deadline, setDeadline] = useState(props.deadline);

  const id = props.id;

  const {store} = useContext(Context)

  const onClickHandler = () =>
    {
      // let newDate = new Date(deadline);
      // newDate.setHours(newDate.getHours() + 3);
      // newDate.setMinutes(newDate.getMinutes());
      store.editTask(id, title, description, deadline);
      store.setModalActive(false);
    }

  return (
    <div className="EditModulWindow">
      <div className="d-flex justify-content-center p-3 mb-5 bg-white rounded my-5">
        <div className="row">
          <div className="text-center">
            <h2>Edit Task</h2>
          </div>
          <div className="col-12 p-2">
            <label htmlFor="title" className="my-2">Enter Title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" name="title" id="title" placeholder="Title" className="w-100 my-1 p-2" required/>
            <label className="my-2" htmlFor="description">Enter Description</label>
            <input value={description} onChange={(event) => setDescription(event.target.value)} type="text" name="description" id="description" placeholder="Description" className="w-100 my-1 p-2" required/>
            <label className="my-2" htmlFor="deadline">Enter Deadline</label>
            <input value={deadline} onChange={(event) => setDeadline(event.target.value)} type="datetime-local" name="deadline" id="deadline" placeholder="Deadline" className="w-100 my-1 p-2"/>
            <button className="btn btn-primary my-2" id="save" onClick={onClickHandler}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(EditModulWindow);