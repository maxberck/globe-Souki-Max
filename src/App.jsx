import { useState } from 'react';
import '../src/App.css';
import '../src/index.css';

import { Routes, Route } from "react-router-dom";
import Home from './components/page/Countries';
import Info from './components/Info';
import axios from "axios";

function App() {
  // Déclaration du state pour le mode sombre
  const [darkMode, setDarkMode] = useState(false);

  // Fonction pour basculer entre les modes sombre et clair
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Application du mode sombre si darkMode est true */}
      <div className={darkMode ? 'dark' : ''}>
        {/* Bouton pour changer le mode */}
        <button onClick={toggleDarkMode}>Switch Mode</button>
        
        {/* Définition des routes pour votre application */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
