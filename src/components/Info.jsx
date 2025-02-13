/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Info({ darkMode }) {
    const [country, setCountry] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        const getSingleCountry = async () => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    setCountry(data[0]);  // Stocke uniquement le premier pays trouvé
                } else {
                    setCountry(null);
                }
            } catch (error) {
                console.error("Erreur de récupération des données :", error);
                setCountry(null);
            }
        };

        getSingleCountry();
    }, [name]);

    useEffect(() => {
        document.title = `Countries | ${name}`;
    }, [name]);

    if (!country) {
        return (
            <div className={`p-8 text-center ${darkMode ? "bg-[#1F2938] text-white" : "bg-white text-white-900"}`}>
                <h1 className="text-2xl font-bold">Country not found</h1>
                <Link to="/" className="mt-4 inline-block bg-gray-300 py-2 px-6 rounded shadow text-gray-900 hover:bg-gray-400 transition-all duration-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    Back
                </Link>
            </div>
        );
    }

    return (
        <div className={`w-full ${darkMode ? "bg-[#1F2938] text-white" : "bg-white text-gray-900"}`}>
            <div className="p-8 md:py-0 max-w-7xl mx-auto">
                <div key={country.cca3} className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen">
                    {/* Image du drapeau */}
                    <div>
                        <img src={country.flags?.svg || country.flags?.png} alt={country.name?.common || "Unknown flag"} />
                    </div>

                    {/* Informations du pays */}
                    <div>
                        <h1 className="mb-8 font-bold text-4xl lg:text-6xl">{country.name?.common || "Unknown Country"}</h1>

                        <ul className="my-4 flex flex-col items-start justify-start gap-2 text-white-900 dark:text-white">
                            <li><strong>Native Name:</strong> {country.name?.nativeName
                                ? Object.values(country.name.nativeName).map(n => n.common).join(", ")
                                : "N/A"}
                            </li>

                            <li><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</li>

                            <li><strong>Population:</strong> {country.population.toLocaleString() || "N/A"}</li>

                            <li><strong>Region:</strong> {country.region || "N/A"}</li>

                            <li><strong>Subregion:</strong> {country.subregion || "N/A"}</li>

                            <li><strong>Top-Level Domain:</strong> {country.tld?.[0] || "N/A"}</li>

                            <li><strong>Currencies:</strong> {Object.values(country.currencies).map(c => c.name).join(", ") || "N/A"}
                            </li>

                            <li><strong>Languages:</strong> { Object.values(country.languages).join(", ") || "N/A"}
                            </li>
                        </ul>

                        {/* Liste des pays frontaliers */}
                        {country.borders && country.borders.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg mb-2">Borders:</h3>
                                <ul className="flex flex-wrap items-start justify-start gap-2">
                                    {country.borders.map((border) => (
                                        <li key={border} className={`p-2 rounded text-xs tracking-wide shadow ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-900"}`}>
                                            {border}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Bouton de retour */}
                        <Link to="/" className={`inline-block mt-8 py-2 px-6 rounded shadow transition-all duration-200 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-300 text-gray-900 hover:bg-gray-400"}`}>
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;
