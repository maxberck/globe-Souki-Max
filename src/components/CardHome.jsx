/* eslint-disable */
import { Link } from "react-router-dom";

export default function CardHome({flags, name, population, region, subregion,}) {
    return (
        <>
            <Link to={`/country/${name.common}`}>
                <article className="bg-white hover:bg-gray-200 rounded-lg shadow overflow-hidden">
                    <img src={flags.svg} alt="" className="md:h-72 w-full object-cover" />
                    <div className="p-4">
                        <h2 className="font-bold text-lg text-gray-900 ">
                            {name.common}
                        </h2>
                        <ul className="flex flex-col items-start justify-start gap-2 ">
                            <li>Population: {population.toLocaleString()}</li>
                            <li>Region: {region}</li>
                            <li>Subregion: {subregion}</li>
                        </ul>
                    </div>
                </article>
            </Link>
        </>
    );
}