import React, { FC, useContext } from "react";
import "./SignInForm.component.css";
import { Context } from "../../..";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const SignInForm : FC = () => { 
  const inputRefs = new Array();

  const {store} = useContext(Context)

  var pwShown = 0;

  for(let i = 0; i < 2; i++)
  {
    inputRefs.push(React.createRef());
  }

  const show = ()=> 
  {
    var p = inputRefs[1].current;
    p.setAttribute('type', 'text');
  }
  const hide = ()=> 
  {
    var p = inputRefs[1].current;
    p.setAttribute('type', 'password');
  }

  const onEyeClick = ()=>
  {
    if (pwShown == 0) 
    {
      pwShown = 1;
      show();
    } 
    else 
    {
      pwShown = 0;
      hide();
    }
  }
  
  const onClickHandler = async () =>
  {
    await store.signIn(inputRefs[0].current.value, inputRefs[1].current.value); 
    window.location.replace("/");
  }

  return (
    <div className="SignInForm">
      <div id="form">
        <div className="con">
          <header className="head-form">
            <h2>Sign In</h2>
            <p>SignIn here using your username and password</p>
          </header>
          <br/>
          <div className="field-set">
            <span className="input-item">
              <i className="fa fa-user-circle"></i>
            </span>
            <input className="form-input" id="txt-input" ref={inputRefs[0]} type="text" placeholder="UserName" required/>
            <br/>
            <span className="input-item">
              <i className="fa fa-key"></i>
            </span>
            <input className="form-input" type="password" placeholder="Password" id="pwd" ref={inputRefs[1]}  name="password" required/>
            <span>
               <i className="fa fa-eye" aria-hidden="true"  datatype="button" id="eye" onClick={onEyeClick}></i>
               {/* TODO: Надо бы глаз пофиксить */}
            </span>
            <br/>
            <button className="log-in" onClick={onClickHandler}> Sign In </button>
          </div>
          <div className="other">
            <button className="btn submits frgt-pass">Forgot Password</button>
            <Link to={"/auth/sign-up"}>
              <button className="btn submits sign-up"> Sign Up 
                <i className="fa fa-user-plus" aria-hidden="true"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default observer(SignInForm);