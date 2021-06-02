import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    if (Object.entries(country).length > 0) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${country.capital
            .replace(/\([^()]*\)/g, "")
            .trim()}&appid=${process.env.REACT_APP_API_KEY}&units=metric
          `
        )
        .then((res) => {
          setWeather([res.data]);
        });
    }
  }, [country]);

  useEffect(() => {
    setCountry(
      filteredCountries.length === 1 ? { ...filteredCountries[0] } : []
    );
  }, [filteredCountries]);

  useEffect(() => {
    setWeather(value === "" && []);
  }, [value]);

  const handleChange = (evt) => {
    setValue(evt.target.value);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(evt.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCountry(value === "" && []);
  };

  const handleShow = (country) => {
    setFilteredCountries([country]);
  };

  const toTextualDescription = (degree) => {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North Westerly";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South Westerly";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South Easterly";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) {
      return "North Easterly";
    }
    return "Northerly";
  };

  return (
    <div>
      <article>
        find countries{" "}
        <input type="text" value={value} onChange={handleChange} />
      </article>
      <article>
        {filteredCountries.length < 10 && filteredCountries.length > 0 ? (
          filteredCountries.length === 1 ? (
            filteredCountries.map((country) => (
              <div key={country.alpha3Code}>
                <h1>{country.name}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h3>languages</h3>
                <ul>
                  {country.languages.map((l) => (
                    <li key={l.name}>{l.name}</li>
                  ))}
                </ul>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src={country.flag}
                  alt="country flag"
                />
              </div>
            ))
          ) : (
            filteredCountries.map((country) => (
              <div
                key={country.alpha3Code}
                style={{ display: "flex", alignItems: "center" }}
              >
                <p>{country.name}</p>
                <button
                  onClick={() => handleShow(country)}
                  style={{
                    border: "none",
                    padding: "5px",
                    margin: "5px",
                    borderRadius: "5%",
                    background: "#eeeeee",
                  }}
                >
                  show
                </button>
              </div>
            ))
          )
        ) : (
          <p>Too Many Countries</p>
        )}
      </article>
      <article>
        {weather.length > 0 && (
          <div>
            <h1>Weather in {weather[0].name}</h1>
            <p>temperature {weather[0].main.temp} degrees celcius</p>
            <img
              src={`http://openweathermap.org/img/w/${weather[0].weather[0].icon}.png`}
              alt="weather icon"
            />
            <p>
              wind {weather[0].wind.gust} direction{" "}
              {toTextualDescription(weather[0].wind.deg).toLowerCase()}
            </p>
          </div>
        )}
      </article>
    </div>
  );
}

export default App;
