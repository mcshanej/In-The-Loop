import React from "react";
import Base64 from './components/EncodeBase64';
import './App.css';
import Footer from './Footer';
import Logo from './images/logo.png';

export default function  App(){

  return (
    <div className='appContainer'>
      <img className='logo' src={Logo} alt=''/>
      <Base64/>
      <Footer/>
    </div>
  );
};