import { useState } from "react"; 
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
    <div className={darkMode ? "dark bg-gray-900 text-black min-h-screen" : "bg-blue-100 text-black-900 min-h-screen"}> 
      
     
      <header className="p-4 flex justify-between items-center shadow-md bg-white dark:bg-gray-800">
      
        <h1 className="text-xl font-bold">🌎GLOBE</h1>
        
        {/* Bouton pour changer de mode (sombre/clair) avec onclick et pour avoir le double sens je vais utiliser le toggle predefini plus haut */}
        <button
          onClick={toggleDarkMode}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="p-4">
        {/* Définition des routes pour les pages */}
        <Routes>
          {/* Route pour la page d'accueil component countries.jsx */}
          <Route path="/" element={<Home />} />
          
          {/* Route pour la page de détails d'un pays spécifique et là Max tu dois rajouter tes infos */}
          <Route path="/info/:countryName" element={<Info />} />
        </Routes>
      </main>
    </div>
  );
}
