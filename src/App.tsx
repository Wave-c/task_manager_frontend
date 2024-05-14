import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import CustomHeader from './components/shared/CustomHeader/CustomHeader.component';
import AddTasks from './components/shared/AddTasks/AddTasks.component';
import Task from './components/shared/Task/Task.component';
import { ITask } from './models/ITask';

const App: FC = () => {
  const {store} = useContext(Context);
  
  useEffect(() =>
  {
    if(localStorage.getItem('token'))
    {
      store.checkAuth().then(()=>{
              store.featchTasks();
      });
    }
  },[])

  if(store.isLoading)
  {
    return (
      <div></div>
    )
  }

  if(!store.isAuth)
  {
    window.location.replace("/auth/sign-in");
  }

  return (
    <div className='App'>
      <CustomHeader/>
      <AddTasks/>
      {store.tasks.map((task, index) =>
      {
        return (
          <Task id={task.id} title={task.title} description={task.description} deadline={task.deadline} username={task.username}/>
        )
      })}
    </div>
  );
}

export default observer(App);
