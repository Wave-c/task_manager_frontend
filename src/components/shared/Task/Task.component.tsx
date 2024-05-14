import React, { useContext, useEffect, useState } from "react";
import "./Task.component.css";
import bootstrap from 'bootstrap'
import { ITask } from "../../../models/ITask";
import { Context } from "../../..";
import Modal from 'react-modal';
import EditModulWindow from "../EditModulWindow/EditModulWindow.component";
import { reaction, when } from "mobx";
import { observer } from "mobx-react-lite";

const Task = (props : ITask) => { 
  let id = props.id;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {store} = useContext(Context);

  when(() => !store.modalIsActive, () => {setModalIsOpen(false); store.setModalActive(true);})

  if(props.deadline == null)
  {
    return (
      <div className="Task row border rounded shadow p-3 mb-3 bg-white rounded p-2" key={props.id}>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-primary mx-2" onClick={() => setModalIsOpen(true)}>Edit</button>
            <div>
              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <EditModulWindow title={props.title} description={props.description} deadline={props.deadline} id={props.id} username={props.username}/>
              </Modal>
              <h1>{store.modalIsActive}</h1>
            </div>
            <button className="btn btn-danger mx-2" onClick={() => store.deleteTask(id)}>Delete</button>
          </div>
        </div>
      </div>
    ); 
  }
  else
  {
    var newDate = new Date(props.deadline);
    const days = newDate.getDate();
    const months = newDate.getMonth() + 1;
    const years = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    return (
      <div className="Task row border rounded shadow p-3 mb-3 bg-white rounded p-2">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
            <p>{days}.{months}.{years} {hours}:{minutes}</p>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-primary mx-2" onClick={() => setModalIsOpen(true)}>Edit</button>
            <div>
              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <EditModulWindow title={props.title} description={props.description} deadline={props.deadline} id={props.id} username={props.username}/>
              </Modal>
            </div>
            <button className="btn btn-danger mx-2" onClick={() => store.deleteTask(id)}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
};

export default observer(Task);