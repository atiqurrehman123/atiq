import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import user from './user.png'

const ContactDetails = (props) => {
    console.log(props,"props")
    const {id,name,email}=props.location.state;
  return (
    <div>
      <Card style={{marginTop:"50px",marginLeft:"50px"}}>
        <CardImg style={{width:"200px",height:"200px"}} src={user} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{email}</CardSubtitle>
          <CardText>{name}</CardText>
          <Link to={"/"}>
          <Button>Fot going Back</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactDetails;