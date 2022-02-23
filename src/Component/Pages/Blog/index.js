import React, { useEffect } from 'react'
import styles from "./styles.module.scss"
import { Link, useNavigate } from 'react-router-dom';
import Cards from './Cards';
import blogData from './data';
import {
  Card, Button, CardTitle, CardText, Row, Col, CardBody,
  CardImg, CardGroup, ButtonGroup
} from 'reactstrap';
import Cookies from 'js-cookie';
const BlogCard = () => {
  const navigate = useNavigate();
  const cheakCookie = Cookies.get("POCusers")
  useEffect(() => {
    if (!cheakCookie) {
      navigate("/")
    }
  })
  const cheakUser = () => {
    Cookies.remove('POCusers')
    navigate("/")
  }
  return (
    <div>
      <div className='d-flex justify-content-end pr-2 pt-2'>
        <Link to="/login">
          <Button classname="btn btn-primary" onClick={cheakUser}>LogOut</Button>
        </Link>
      </div>
      <CardGroup>
        <Row>
          {blogData.map((element, index) => {
            return (
              <>
                <Col sm="4">
                  <Cards key={index} courseName={element.courseName} description={element.description} imgs={element.imgs} />
                </Col>
              </>
            )
          })
          }
        </Row>
      </CardGroup>
    </div>
  )
}
export default BlogCard;