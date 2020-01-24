import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import axios from "axios";
import SearchResult from "./SearchResult";

export default function Search() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  const [nearbyplaces, setNearbyplaces] = useState({});
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [distance, setDistance] = useState("500");
  const [error, setError] = useState("");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleClick = e => {
    setNearbyplaces("");
    e.preventDefault();
    let lat = coordinates.lat;
    let long = coordinates.lng;

    if (!lat && !long) {
      return alert("Please type any places");
    }
    if (!type) {
      return alert("Please select a Place type");
    }
    setLoading(false);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      lat +
      "," +
      long +
      "&radius=" +
      distance +
      "&type=" +
      type +
      "&key=AIzaSyDYc_h2K2gMZgLTrPEjQnBCQWrxdUF756k";
    axios
      .get(proxyurl + url)
      .then(res => {
        console.log(res.data);
        setNearbyplaces(res.data);
      })
      .catch(error => setError(error.message));
  };
  // console.log(nearbyplaces);
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div>
              <div className="select-tag">
                <select onChange={e => setType(e.target.value)}>
                  <option value="">Select Places Type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="school">Schools</option>
                  <option value="hospital">Hospitals</option>
                  <option value="supermarket">Super Market</option>
                  <option value="movie_theater">Movie</option>
                </select>
                <select onChange={e => setDistance(e.target.value)}>
                  <option value="3000">Distance</option>
                  <option value="1000">With in 1 Km</option>
                  <option value="2000">With in 2 Km</option>
                  <option value="3000">With in 3 Km</option>
                </select>
              </div>
              <div className="search-box">
                <input {...getInputProps({ placeholder: "Type a Location" })} />
                <button onClick={handleClick}>Search</button>
              </div>

              <div className="loading">
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map(suggestion => {
                    const style = {
                      color: suggestion.active ? "black" : "white"
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <SearchResult
        type={type}
        distance={distance}
        places={nearbyplaces}
        loading={loading}
        error={error}
      />
    </div>
  );
}
