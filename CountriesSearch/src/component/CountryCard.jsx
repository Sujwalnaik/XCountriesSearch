import { useEffect, useState } from "react";
import axios from "axios";
import {
  countryCard,
  mainCardHolderContainer,
  Searchdiv,
  SearchInput,
} from "./CountryCard-Style";

function CountryCard() {
  const [fetchCard, setFetchCard] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //fetching card data from api
  useEffect(() => {
    const fetchCountryFlag = async () => {
      const APIURL = "https://xcountries-backend.azurewebsites.net/all";
      try {
        let res = await axios.get(APIURL);
        setFetchCard(res.data);
        setFilterData(res.data);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        setError(error);
      }
    };
    fetchCountryFlag();
  }, []);

  //Searchfuntionality
  useEffect(() => {
    setFilterData(
      fetchCard.filter((ele) =>
        ele.name.toLowerCase().includes(searchInputValue.toLowerCase())
      )
    );
  }, [searchInputValue, fetchCard]);

  const handleInputValue = (e) => {
    e.preventDefault();
    setSearchInputValue(e.target.value);
  };

  if (error) {
    return <div>{error}</div>;
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
      <div style={mainCardHolderContainer}>
        {filterData.map((item, ind) => (
          // eslint-disable-next-line react/jsx-key

          <div key={ind} style={countryCard}>
            <img src={item.flag} alt={item.name} />
            <h2>{item.name} </h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default CountryCard;
