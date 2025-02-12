import { useState, useEffect } from "react";
import CardHome from "./CardHome";

function Home() {
    const [countries, setCountries] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        document.title = `Showing All Countries`;
    }, []);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(data);
            } catch (error) {
                console.error(error);
            }
        };

        getCountries();
    }, []);



    return (
        <>
                <section className="container mx-auto p-8">

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {countries.map((country) => (
                            <CardHome key={country.name.common} {...country} />
                        ))}
                    </div>
                </section>
        </>
    );
}
export default Home