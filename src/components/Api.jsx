import axios from "axios";

const API_URL = "https://restcountries.com/v3.1";

export const getAllCountries = () =>
    axios.get(`${API_URL}/all?fields=name,capital,flags`).then((res) => res.data);

export const getCountryByName = (name) =>
    axios.get(`${API_URL}/name/${name}?fields=name,capital,flags,population,region`).then((res) => res.data[0]);