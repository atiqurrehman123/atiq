import './App.css';
import { useState,useEffect, useRef } from 'react';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import {uuid} from 'uuidv4'
import Header from'./components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import api from "./api/contacts"
import EditContact from './components/EditContact';
function App(props) {
  const LOCA_STORAGE_KEY="contacts";
  const [contacts, setcontacts] = useState([])
  const [searchTerm,setSearchTerm]=useState("");
  const [searchResults,setsearchResult]=useState([])
 
  // searchcontacthandler
  const searchcontacthandler=(contactvalues)=>{
    console.log(contactvalues)
    setSearchTerm(contactvalues)
    if(searchTerm !==""){
      const newContactList=contacts.filter(contact=>{
      return Object.values(contact).join(" ").toLowerCase().includes(contactvalues.toLowerCase())
      })
      setsearchResult(newContactList)
    }else{
      setsearchResult(contacts)
    }


    

  }
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
    const removeContact=async(id)=>{
      // removing data from app with id
     await api.delete(`contacts/${id}`)
      const copycontact=contacts.filter(contact=>{
        return contact.id !== id;
      }
        )
        setcontacts(copycontact)

    }
    // eidt contact handler
    const editContactHandler=async (contact)=>{

      const response=await api.put(`contacts/${contact.id}`,contact)
      const{id,name,email}=response.data;
      setcontacts(contacts.map(contact=>{
        return contact.id ===id ?{...response.data}:contact;
      }))

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
      <Route path="/" exact render={(props)=>( <ContactList {...props} contacts={searchTerm.length<1? contacts : searchResults} removeContact={removeContact} term={searchTerm} 
     searchcontacthandler={searchcontacthandler} />  )}/>
      <Route path={"/add"}  render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler}/>)}/>
      <Route path={"/edit"}  render={(props)=>(<EditContact {...props} editContactHandler={editContactHandler}/>)}/>

      <Route path={"/contactdetails:id"} component={ContactDetails}/> 
      </Switch>
      
        
      </Router>
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} removeContact={removeContact}/>     */}
    </div>
  );
}

export default App;
