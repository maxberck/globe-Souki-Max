/* eslint-disable react/prop-types */
import "../page/Countries.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Countries({darkMode}) {
  const [countries, setCountries] = useState([]); // Liste des pays
  const [searchText, setSearchText] = useState(""); // Texte de recherche
  const [loading, setLoading] = useState(true); // État de chargement

  // Liste des régions disponibles pour le filtre
  const regions = ["Europe", "Asia", "Africa", "Oceania", "Americas", "Antarctic"];
  // useEffect s'exécute quand le composant est chargé
  useEffect(() => {
    // Titre de la page
    document.title = "All Countries";

    // Création d'un controller pour pouvoir annuler la requête si nécessaire
    const controller = new AbortController();

    // Fonction pour récupérer tous les pays// JE N AI PAS UTILISE TON API.JSX CAR JE TROUVE QUE C EST PLUS SIMPLE DE L APPELER AINSI DANS TRY CATCH
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all", { signal: controller.signal });
        const data = await res.json();
        setCountries(data); // Stocke les pays dans l'état
      } catch (error) {
        if (error.name !== "AbortError") console.error(error);
      } finally {
        setLoading(false); // arrete le chhargement
      }
    }

    fetchCountries();
    // Nettoie la requête si le composant est démonté
    return () => controller.abort();
  }, []);

  // Fonction pour chercher un pays spécifique
  async function handleSearch() {
    if (!searchText.trim()) return; // Si la recherche est vide, on ne fait rien
    setLoading(true);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${searchText}`);
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Fonction pour filtrer par région
  async function handleFilter(region) {
    setLoading(true);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container mx-auto p-6">
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
       
        <input
          type="text"
          placeholder="🔍 Search for a country..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={`py-3 px-4 w-full shadow rounded ${darkMode ?'bg-gray-800 text-gray-400':'border-[#adb5bd] bg-white'}
          `}/>
        {/* Bouton de recherche */}
        <button
          onClick={handleSearch}
          className="py-3 px-6 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Search
        </button>
        {/* Sélecteur de région j ai rajouté des emojis car c est plus stylé et puisque les donnee de l api sont en anglais je garde les infos en anglais*/}
        <select
          className="py-3 px-4 shadow rounded dark:bg-gray-800 dark:text-gray-400"
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">🌍 Filter by Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des pays */}
      {loading ? (
        // Si chargement en cours, affiche un message
        <p className="text-center text-gray-600 dark:text-gray-400">Loading countries...</p>
      ) : (
        // Sinon, affiche la grille des pays
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {countries.map((country) => (
            <Link key={country.cca3} to={`/info/${country.name.common}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all">
                {/* Image du drapeau */}
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                {/* Informations du pays */}
                <div className="p-4">
                  <h2 className="text-lg font-bold">{country.name.common}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Population: {country.population.toLocaleString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Region: {country.region}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Capital: {country.capital?.[0] || "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
