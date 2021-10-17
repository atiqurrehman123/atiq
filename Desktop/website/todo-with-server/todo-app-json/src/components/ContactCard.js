import React from "react";
import { Link } from "react-router-dom";
import user from './user.png'
const ContactCard = (props) => {
  const {id,name,email}=props.contact
  return (
    <div className="item">
        <img className="ui avatar image" src={user} alt="user"/>
      <div className="content">
        <Link to={{pathname:`/contactdetails:${id}`,state:{contact:props.contact}}}>
        <div className="header">{name}</div>
        <div>{email}</div>
        </Link>
      </div> 
      <i className="trash alternate outline icon " style={{color:"red" ,float:"right",marginLeft:"10px"}}
      onClick={()=>props.handleremove(id)}></i>
          <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue",float:"right"  }}
        ></i>
      </Link>
    </div>
  );
};
export default ContactCard;
