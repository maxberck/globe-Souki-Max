import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Info() {
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
            <section className="p-8 text-center">
                <h1 className="text-2xl font-bold">Country not found</h1>
                <Link to="/" className="mt-4 inline-block bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400">
                    Back
                </Link>
            </section>
        );
    }

    return (
        <section className="p-8 md:py-0 max-w-7xl mx-auto">
            <div key={country.cca3} className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen">
                <article>
                    <img src={country.flags?.svg || country.flags?.png} alt={country.name?.common || "Unknown flag"} />
                </article>

                <article>
                    <h1 className="mb-8 font-bold text-gray-900 text-4xl lg:text-6xl">
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
                            <h3 className="text-gray-900 font-bold text-lg mb-2 ">
                                Borders:
                            </h3>
                            <ul className="flex flex-wrap items-start justify-start gap-2">
                                {country.borders.map((border) => (
                                    <li key={border} className="bg-white p-2 rounded text-xs tracking-wide shadow text-gray-700">
                                        {border}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Link to="/" className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200">
                        Back
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default Info;
