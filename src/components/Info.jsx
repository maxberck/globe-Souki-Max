
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Info({darkMode}) {
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
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">Country not found</h1>
                <Link to="/" className="mt-4 inline-block bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400">
                    Back
                </Link>
            </div>
        );
    }

    return (
        <div className={`w-full ${darkMode ? "bg-[#1F2938]" : "bg-white"}`}>
            <div className={`p-8 md:py-0 max-w-7xl mx-auto ${darkMode ? "dark" : "bg-white"}`}>
                <div key={country.cca3} className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen">
                    <div>
                        <img src={country.flags?.svg || country.flags?.png} alt={country.name?.common || "Unknown flag"} />
                    </div>

                    <div>
                        <h1 className={`mb-8 font-bold text-4xl lg:text-6xl ${darkMode ? "text-white" : "text-gray-700"}`}>
                            {country.name?.common || "Unknown Country"}
                        </h1>

                        <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                            <li>Native Name: {country.name?.nativeName
                                ? Object.values(country.name.nativeName).map(n => n.common).join(", ")
                                : "N/A"}
                            </li>

                            <li>Capital: {country.capital?.[0] || "N/A"}</li>

                            <li>Population: {country.population.toLocaleString() || "N/A"}</li>

                            <li>Region: {country.region || "N/A"}</li>

                            <li>Subregion: {country.subregion || "N/A"}</li>

                            <li>Top-Level Domain: {country.tld?.[0] || "N/A"}</li>

                            <li>Currencies: {Object.values(country.currencies).map(c => c.name).join(", ") || "N/A"}
                            </li>

                            <li>Languages: { Object.values(country.languages).join(", ") || "N/A"}
                            </li>
                        </ul>

                        {country.borders && country.borders.length > 0 && (
                            <div>
                                <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-700"}`}>
                                    Borders:
                                </h3>
                                <ul className="flex flex-wrap items-start justify-start gap-2">
                                    {country.borders.map((border) => (
                                        <li key={border} className={`p-2 rounded text-xs tracking-wide shadow text-gray-700 ${darkMode ? "bg-[#6c757d] text-white" : "text-gray-700 bg-white"}`}>
                                            {border}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Link to="/" className={`inline-block mt-8 py-2 px-6 rounded shadow t  ${darkMode ? "bg-[#6c757d] text-white hover:bg-gray-700" : "text-gray-700 bg-white hover:bg-gray-200"}`}>
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;