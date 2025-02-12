import { useState, useEffect } from "react";

// Le composant Countries est utilisé pour afficher la liste des pays avec des fonctionnalités de recherche et de filtrage.
export default function Countries() {
  // Déclaration de l'état 'countries' pour stocker les pays récupérés de l'API
  const [countries, setCountries] = useState([]);
  // Déclaration de l'état 'searchText' pour gérer le texte de recherche de l'utilisateur
  const [searchText, setSearchText] = useState("");
  // Liste des régions que nous utiliserons pour filtrer les pays
  const regions = ["Europe", "Asia", "Africa", "Oceania", "Americas", "Antarctic"];

  // Utilisation de useEffect pour définir le titre du document lorsque le composant est monté
  useEffect(() => {
    document.title = `Showing All Countries`; // Met à jour le titre de l'onglet du navigateur
  }, []); // [] signifie que l'effet sera exécuté une seule fois lors du montage du composant

  // Utilisation de useEffect pour récupérer la liste des pays à partir de l'API lorsqu'on charge la page
  useEffect(() => {
    const getCountries = async () => {
      try {
        // Effectue une requête GET pour récupérer tous les pays de l'API RestCountries
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json(); // Parse la réponse JSON
        setCountries(data); // Met à jour l'état 'countries' avec les données récupérées
      } catch (error) {
        console.error(error); // Affiche une erreur en cas de problème de récupération des données
      }
    };

    getCountries(); // Appel de la fonction pour récupérer les pays
  }, []); // [] signifie que cette fonction s'exécutera une seule fois lors du montage du composant

  // Fonction pour effectuer la recherche d'un pays en fonction du texte fourni par l'utilisateur
  async function searchCountry() {
    try {
      // Effectue une requête GET pour récupérer un pays correspondant à 'searchText'
      const res = await fetch(`https://restcountries.com/v3.1/name/${searchText}`);
      const data = await res.json(); // Parse la réponse JSON
      setCountries(data); // Met à jour l'état 'countries' avec les résultats de la recherche
    } catch (error) {
      console.error(error); // Affiche une erreur si la recherche échoue
    }
  }

  // Fonction pour filtrer les pays par région
  async function filterByRegion(region) {
    try {
      // Effectue une requête GET pour récupérer les pays appartenant à la région spécifiée
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await res.json(); // Parse la réponse JSON
      setCountries(data); // Met à jour l'état 'countries' avec les pays filtrés par région
    } catch (error) {
      console.error(error); // Affiche une erreur si le filtrage échoue
    }
  }

  return (
    <section className="container mx-auto p-8">
      {/* Conteneur principal qui contient le champ de recherche et les options de filtrage */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        {/* Champ de recherche pour que l'utilisateur puisse rechercher un pays */}
        <input
          type="text"
          placeholder="Search for a country..." // Texte de l'espace réservé
          value={searchText} // Valeur de l'input liée à l'état 'searchText'
          onChange={(e) => setSearchText(e.target.value)} // Mise à jour de 'searchText' lors de la saisie
          className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none dark:bg-gray-800 dark:text-gray-400"
        />
        {/* Bouton pour lancer la recherche en utilisant le texte saisi */}
        <button
          onClick={searchCountry} // Appel de la fonction 'searchCountry' lorsqu'on clique sur le bouton
          className="py-3 px-6 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Search
        </button>
        {/* Sélecteur de région pour filtrer les pays en fonction de la région choisie */}
        <select
          className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          onChange={(e) => filterByRegion(e.target.value)} // Appel de 'filterByRegion' lors du changement de la sélection
        >
          <option value="">Filter by Region</option> {/* Option par défaut */}
          {regions.map((region) => (
            // Création des options de région à partir du tableau 'regions'
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Section pour afficher la liste des pays sous forme de cartes */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {/* Boucle à travers la liste des pays et création d'une carte pour chaque pays */}
        {countries.map((country) => (
          <div key={country.cca3} className="bg-white shadow rounded-lg overflow-hidden dark:bg-gray-800">
            {/* Affichage du drapeau du pays */}
            <img src={country.flags.png} alt={country.name.common} className="w-full h-40 object-cover" />
            <div className="p-4">
              {/* Affichage du nom du pays */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{country.name.common}</h2>
              {/* Affichage de la population du pays */}
              <p className="text-gray-600 dark:text-gray-400">Population: {country.population.toLocaleString()}</p>
              {/* Affichage de la région du pays */}
              <p className="text-gray-600 dark:text-gray-400">Region: {country.region}</p>
              {/* Affichage de la capitale, avec une valeur par défaut "N/A" si elle est absente */}
              <p className="text-gray-600 dark:text-gray-400">Capital: {country.capital?.[0] || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
