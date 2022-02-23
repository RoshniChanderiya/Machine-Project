import React from 'react';
import {
  CardGroup, Card, CardImg, CardTitle, CardSubtitle, CardText
  , CardBody, Button, Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import BlogList from '../BlogList';
const Cards = ({ courseName, description, imgs, id }) => {
  return (
    <div className='container mt-3'>
      <Card>
        <CardImg
          alt="Card image cap"
          src={imgs}
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">
            {courseName}
          </CardTitle>
          <CardText className='text-muted'>
            {description}
          </CardText>
          <Link to={`/bloglist/${description}`}><Button className='btn btn-primary'>
            Button
          </Button></Link>
        </CardBody>
      </Card>
    </div>
  )
}

export default Cards;