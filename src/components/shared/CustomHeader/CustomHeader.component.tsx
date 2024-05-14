import React, { FC, useContext } from "react";
import "./CustomHeader.component.css";
import { Context } from "../../..";

const CustomHeader : FC = () => { 
  const {store} = useContext(Context);

  return (
    <div className="CustomHeader">
      <img id="logout" src="/images/logout.jpg" onClick={() => store.logout()}/>
    </div>
  ); 
};

export default CustomHeader;