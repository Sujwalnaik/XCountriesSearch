import { useEffect, useState } from "react";
import axios from "axios";

function CountryCard() {
  const [fetchCard, setFetchCard] = useState([]);
  const fetchCountryFlag = async () => {
    const APIURL = "https://xcountries-backend.azurewebsites.net/all";
    try {
      let res = await axios.get(APIURL);
      setFetchCard(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCountryFlag();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {fetchCard.map((item, ind) => (
        // eslint-disable-next-line react/jsx-key

        <div
          key={ind}
          style={{
            display: "flex",
            border: "2px solid gray",
            width: "200px",
            flexDirection: "column",
            padding: "20px",
            gap: 10,
            justifyContent: "center",
            textAlign: "center",
            margin: "30px",
            borderRadius: "10px",
          }}
        >
          <img src={item.flag} alt={item.name} />
          <h2>{item.name} </h2>
        </div>
      ))}
    </div>
  );
}

export default CountryCard;
