import './App.css';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import {uuid} from 'uuidv4'
import Header from'./components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import api from "./api/contacts"

function App(props) {
  const LOCA_STORAGE_KEY="contacts";
  const [contacts, setcontacts] = useState([])
  // retirvive contact
  const retrivecontact= async ()=>{
    const response=await api.get("contacts")
    return response.data;
  }
  const addContactHandler = async(contact)=>{
    console.log(contact ,"addcontacthander")
    // for posting data into json server
    const request={
      id:uuid(),
      ...contact
    }
    const response=await api.post('contacts',request);


    setcontacts([...contacts, response.data])
  }
    //for retriving data
    const removeContact=(id)=>{
      const copycontact=contacts.filter(contact=>{
        return contact.id !== id;
      }

        )
        setcontacts(copycontact)

    }
  useEffect( async()=>{
    // const retrivedata=JSON.parse(localStorage.getItem(LOCA_STORAGE_KEY))
    // if(retrivedata) setcontacts(retrivedata)
    // it for api calls
    const retrivedata= await retrivecontact();
    if(retrivedata) setcontacts(retrivedata)
  },[])
    //for setting data

  useEffect(()=>{
    // localStorage.setItem(LOCA_STORAGE_KEY,JSON.stringify(contacts))

  },[])

  return (
    <div className="ui-container">
      
      <Router>
      <Header/>
      {/* switch use for match */}
      <Switch>
        {/* WHEN WE NOT USE exact it only render / path not other for that use exact with */}
      <Route path="/" exact render={(props)=>( <ContactList {...props} contacts={contacts} removeContact={removeContact}/> )}/>
      <Route path={"/add"}  render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler}/>)}/>
      <Route path={"/contactdetails:id"} component={ContactDetails}/> 
      </Switch>
      
        
      </Router>
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} removeContact={removeContact}/>     */}
    </div>
  );
}

export default App;
