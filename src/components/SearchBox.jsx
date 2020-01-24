import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBox = () => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log(query);
  }, [query]);

  const handleClick = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let lat = -33.8670522;
    let long = 151.1957362;
    let url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      lat +
      "," +
      long +
      "&radius=9500&type=restaurant&keyword=cruise&key=AIzaSyDYc_h2K2gMZgLTrPEjQnBCQWrxdUF756k";
    axios
      .get(proxyurl + url)
      .then(res => console.log(res.data))
      .catch(e => console.log("error: " + e.message));
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Nearby Places"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
      </div>
    </div>
  );
};

export default SearchBox;
