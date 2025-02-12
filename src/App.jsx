import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Info from './components/Info';
import axios from "axios";


function App() {

  return (
   <>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/info" element={<Info />} />
       </Routes>
   </>
  );
}

export default App;
