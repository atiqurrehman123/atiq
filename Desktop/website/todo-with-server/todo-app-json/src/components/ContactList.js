import React,{useRef} from 'react'
import { Link } from 'react-router-dom'
import ContactCard from './ContactCard'
 const ContactList = (props) => {
     console.log(props)
    
     const renderlist=props.contacts.map(contact=>{
        return <ContactCard contact={contact} key={contact.id} handleremove={props.removeContact}/>
     }

)
// inputref
const getsearchterm=(e)=>{
// console.log(e.target.value)
props.searchcontacthandler(e.target.value)


}
    return (
        <div className='ui celled list' style={{marginTop:"54px"}}>
            <h1>
                Contact List
                <Link to={"/add"}>
                <button className='ui button blue right'>Add Contact</button>
                </Link>
            </h1>
            <input type="text"   value={props.term} onChange={getsearchterm}/>
            {renderlist.length>0?renderlist :"No contact found"}            
        </div>
    )
}
export default ContactList;