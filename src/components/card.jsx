import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const MemeCard = (props) =>{
    const Navigate = useNavigate();
    return (
        <Card style={{ width: '18rem', margin: "25px" }}>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.Title}</Card.Title>
        
        <Button onClick={e => Navigate(`/edit?url=${props.img}`)} variant="primary">Edit</Button>
      </Card.Body>
    </Card> 
        
    )

}

export default MemeCard;