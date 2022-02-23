import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import blogData from '../Blog/data.js';
const BlogList = () => {
  const { description } = useParams();
  const userDescription = blogData.map(({ description }) => {
    return (description)
  })
  const exactData = userDescription.indexOf(description);
  const finalData = blogData[exactData]
  return (
    <>
     <div className={styles.main}>
        <h1 align="center">Details of Programming language</h1>
        <Link to="/dashboard">
          <button className={`name designbtn ${styles.buttons}`}>Back Home</button>
        </Link>
        <table id={styles["languages"]} className="shadow">
        <tr>
            <td>Id</td>
            <td>{finalData.id}</td>
          </tr>
          <tr>
            <td>CourseName</td>
            <td>{finalData.courseName}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{finalData.version}</td>
          </tr>
          <tr>
            <td>Used</td>
            <td>As a Front End Liberary</td>
          </tr>
          <tr>
            <td>Introduces Year</td>
            <td>{finalData.Introduced_year}</td>
          </tr>
          <tr>
            <td>Used Application</td>
            <td>{finalData.used_app}</td>
          </tr>
      </table>
      </div>
    </>
  )
}
export default BlogList;