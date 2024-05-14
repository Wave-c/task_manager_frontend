import React, { FC, useContext, useEffect, useState } from "react";
import "./AddTasks.component.css";
import bootstrap from 'bootstrap'
import { Context } from "../../..";
const { DateTime } = require("luxon")

const AddTasks : FC = () => { 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const inputRefs = new Array();

  const {store} = useContext(Context)

  for(let i = 0; i < 3; i++)
  {
    inputRefs.push(React.createRef());
  }

  const onClickHandler = async () =>
  {
    //let datetime = DateTime.fromISO(deadline)
    // let newDate = new Date(deadline);
    // newDate.setHours(newDate.getHours() + 3);
    // newDate.setMinutes(newDate.getMinutes());
    await store.addTask(title, description, deadline);
    setTitle(""); setDescription(""); setDeadline("");
    
  }

  return (
    <div className="AddTasks">
      <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded my-5">
        <div className="row">
          <div className="text-center">
            <h2>Add New Task</h2>
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
  ); 
};

export default AddTasks;