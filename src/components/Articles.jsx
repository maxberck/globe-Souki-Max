/* eslint-disable react/prop-types */
// Désactive la règle ESLint pour les "prop-types" (si tu ne veux pas utiliser PropTypes pour valider les props passées au composant).

import { Link } from "react-router-dom";
// Importation du composant Link depuis react-router-dom, qui permet de créer des liens de navigation entre différentes pages de l'application.

export default function Article({ flags, name, population, region, subregion }) {
  // Le composant Article reçoit plusieurs props : flags, name, population, region, subregion.
  // Ces props sont utilisées pour afficher les informations détaillées d'un pays.

  return (
    <Link to={`/${name.common}`} className="block">
      {/* Le composant Link permet de créer un lien. Le 'to' indique l'URL vers laquelle le lien doit rediriger. Ici, 'name.common' représente le nom du pays. */}
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Le composant 'article' est utilisé pour contenir les informations sur un pays. Les classes Tailwind sont utilisées pour styliser l'élément.
            - 'bg-white' et 'dark:bg-gray-800' permettent de changer le fond selon le thème (clair ou sombre).
            - 'rounded-xl' donne des bords arrondis.
            - 'shadow-lg' ajoute une ombre plus grande pour un effet de profondeur.
            - 'hover:shadow-2xl' augmente l'ombre au survol de l'élément.
            - 'transition-all duration-300' permet de rendre les transitions douces et rapides. */}
        
        <img
          src={flags.svg}
          alt={`Drapeau de ${name.common}`}
          className="h-48 w-full object-cover rounded-t-xl"
        />
        {/* Affichage du drapeau du pays avec l'image correspondante.
            - 'flags.svg' est la source de l'image du drapeau.
            - 'alt' est le texte alternatif pour l'image, ici cela montre le nom du pays dans le message.
            - 'h-48' et 'w-full' définissent la hauteur de l'image et sa largeur (100%).
            - 'object-cover' fait en sorte que l'image couvre tout l'espace de l'élément sans déformation.
            - 'rounded-t-xl' arrondit le coin supérieur de l'image. */}
        
        <div className="p-6">
          {/* Conteneur pour le texte avec un padding de 6 (espacement autour du contenu) */}
          <h2 className="font-extrabold text-xl text-gray-900 dark:text-white mb-3">
            {name.common}
          </h2>
          {/* Titre du pays, qui est le nom du pays en gras (font-extrabold) et avec une taille de police 'xl'.
              Le texte sera en gris clair ('text-gray-900') pour le thème clair et en blanc ('dark:text-white') pour le thème sombre. */}
          
          <ul className="space-y-2 text-gray-700 dark:text-gray-400">
            {/* Liste des informations supplémentaires sur le pays, avec une marge verticale entre chaque élément. */}
            <li>
              <span className="font-semibold">Population:</span> {population.toLocaleString()}
              {/* Affichage de la population du pays. La méthode 'toLocaleString()' est utilisée pour formater le nombre de manière lisible (avec des séparateurs de milliers). */}
            </li>
            <li>
              <span className="font-semibold">Région:</span> {region}
              {/* Affichage de la région à laquelle appartient le pays. */}
            </li>
            <li>
              <span className="font-semibold">Sous-région:</span> {subregion}
              {/* Affichage de la sous-région du pays. */}
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
}
