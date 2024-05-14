import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/Store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInForm from './components/shared/SignInForm/SignInForm.component';
import SignUpForm from './components/shared/SignUpForm/SignUpForm.component';

interface State {
  store : Store
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    store
  }}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/auth/sign-in' element={<SignInForm/>}/>
        <Route path='/auth/sign-up' element={<SignUpForm/>}/>
      </Routes>
    </BrowserRouter>
  </Context.Provider>
);