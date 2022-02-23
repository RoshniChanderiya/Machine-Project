import React from 'react';
import { Routes, Route } from "react-router-dom";
import BlogCard from '../Blog';
import BlogList from '../BlogList';
import LoginPage from '../LoginPage';
import SignUp from '../SignUp';

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/dashboard" element={<BlogCard />} />
        <Route path="/bloglist/:description" element={<BlogList />} />
      </Routes>
    </div>
  );
};

export default Routing;
