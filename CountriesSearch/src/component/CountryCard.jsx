import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  countryCard,
  Searchdiv,
  SearchInput,
} from "./CountryCard-Style";

function CountryCard() {
  const [fetchCard, setFetchCard] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom debounce hook
  const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debounceValue;
  };

  // Debounced search input value
  const debounceSearchValue = useDebounce(searchInputValue, 0); // Debounce time set to 1 second (1000 milliseconds)

  // Fetching card data from API
  useEffect(() => {
    const fetchCountryFlag = async () => {
      const APIURL = "https://restcountries.com/v3.1/all";
      try {
        setLoading(true);
        const res = await axios.get(APIURL);
        // console.log("res======", res.data);
        setFetchCard(res.data);
        setFilterData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        setError(error);
        setLoading(false);
      }
    };

    fetchCountryFlag();
  }, []);

  // console.log("fetchCard--------------", fetchCard);
  // Apply filter when debounce search value changes
  useEffect(() => {
    if (debounceSearchValue) {
      const filteredCountries = fetchCard.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(debounceSearchValue.toLowerCase())
      );
      setFilterData(filteredCountries);
    } else {
      setFilterData(fetchCard);
    }
  }, [debounceSearchValue, fetchCard]);

  const handleInputValue = (e) => {
    setSearchInputValue(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div style={Searchdiv}>
        <input
          type="text"
          placeholder="Search"
          style={SearchInput}
          onChange={handleInputValue}
          value={searchInputValue}
        />
      </div>
      <div style={Container}>
        {filterData.length > 0 ? (
          filterData.map((item, ind) => (
            <div key={ind} style={countryCard}>
              <img src={item.flags.png} alt={item.name} />
              <h2>{item.name.common}</h2>
            </div>
          ))
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </>
  );
}

export default CountryCard;
