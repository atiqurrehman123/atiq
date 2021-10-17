
  
import React from "react";

class EditContact extends React.Component {
  constructor(props){
    super(props)
    const {id,name,email}=this.props.location.state.contact;
    this.state={
      id,
      name,
      email
    }
  }
    update =(e)=>{
        e.preventDefault()
        const {name,email}=this.state;
        if(name==="" ||  email===""){
            alert("plz fill these fields")
            return;
        }
        console.log(this.state);
        this.props.editContactHandler(this.state)
        this.setState({name:"",email:""})
        this.props.history.push("/")
    }
  render() {
    console.log(this.props,"props-edit")
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.update} >
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e)=>{this.setState({name:e.target.value})}}
            
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e)=>{this.setState({email:e.target.value})}}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
