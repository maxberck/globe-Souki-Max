import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./components/page/Countries"; 
import Info from "./components/Info"; 
import "./App.css"; 
import "./index.css"; 

// Définition du composant principal App
export default function App() {
  // Création d'un état pour le mode sombre (false = mode clair par défaut)
  const [darkMode, setDarkMode] = useState(false);

  // Fonction pour basculer entre mode clair et sombre
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    // La div principale change de classe selon le mode (sombre ou clair) avec condition ternaire si oui alors fond noir sinon fond bleu terne
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-blue-100 text-black"}`}
    >
      
     
      <header className={`p-4 flex gap-[80%] justify-center items-center shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      
        <h1 className="text-xl font-bold">🌎 GLOBE</h1>
        
        {/* Bouton pour changer de mode (sombre/clair) avec onclick et pour avoir le double sens je vais utiliser le toggle predefini plus haut */}
        <button
          onClick={toggleDarkMode}
          className="py-2 px-4 bg-[#6c757d] text-white rounded hover:bg-blue-600"
        >
          {darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
      </header>

      <main >
        {/* Définition des routes pour les pages */}
        <Routes>
          {/* Route pour la page d'accueil component countries.jsx */}
          <Route path="/" element={<Home darkMode={darkMode} className="p-4"/>} />
          
          {/* Route pour la page de détails d'un pays spécifique et là Max tu dois rajouter tes infos */}
          <Route path="/info/:name" element={<Info darkMode={darkMode}/>} />
        </Routes>
      </main>
    </div>
  );
}
