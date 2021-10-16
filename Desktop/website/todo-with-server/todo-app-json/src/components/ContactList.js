import React from 'react'
import { Link } from 'react-router-dom'
import ContactCard from './ContactCard'
 const ContactList = (props) => {
     console.log(props)
    
     const renderlist=props.contacts.map(contact=>{
        return <ContactCard contact={contact} key={contact.id} handleremove={props.removeContact}/>
     }
)
    return (
        <div className='ui celled list' style={{marginTop:"54px"}}>
            <h1>
                Contact List
                <Link to={"/add"}>
                <button className='ui button blue right'>Add Contact</button>
                </Link>
            </h1>
            {renderlist}            
        </div>
    )
}
export default ContactList;