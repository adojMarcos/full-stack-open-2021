import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowInfo = ({ country }) => {
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        const data = response.data;
        setWeather({ ...data });
      });
  }, []);

  return (
    <div key={country.alpha2Code}>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" width="100px" />
      {weather.main === undefined ? (
        ""
      ) : (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>
            <strong>temperature: </strong>
            {weather.main.temp}° Celsius
          </p>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="icon"
          />
          <p>
            {" "}
            <strong>feels like</strong> {weather.main.feels_like}° Celsius
          </p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [countries, setCountry] = useState([]);
  const [filter, setFilter] = useState("");
  const [showCountryInfo, setShowCountryInfo] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const unfiltredCountries = response.data;
      const filtredCountries = unfiltredCountries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );
      setCountry(filtredCountries);
    });
  }, [filter]);
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = (country) => {
    showCountryInfo.includes(country.name)
      ? setShowCountryInfo(
          showCountryInfo.filter((item) => item !== country.name)
        )
      : setShowCountryInfo(showCountryInfo.concat(country.name));
  };

  return (
    <div>
      find countries: <input onChange={handleChange} />
      {countries.length > 10 ? (
        <p>Too many matches</p>
      ) : countries.length > 1 ? (
        countries.map((country) => (
          <div key={country.population}>
            <p key={country.name}>
              {country.name + " "}
              <button onClick={() => handleClick(country)}>show</button>
            </p>
            {showCountryInfo.includes(country.name) ? (
              <ShowInfo country={country} />
            ) : null}
          </div>
        ))
      ) : (
        countries.map((country) => (
          <ShowInfo key={country.population} country={country} />
        ))
      )}
    </div>
  );
}

export default App;
