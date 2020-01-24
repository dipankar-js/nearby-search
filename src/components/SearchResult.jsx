import React from "react";
import "./search.css";
import Loader from "./Loader";

const SearchResult = props => {
  const { type, distance, places, loading, error } = props;

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Nearby Search Engine</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="loading-screen">
        <h1>{error}</h1>
      </div>
    );
  }
  if (places.status === "ZERO_RESULTS") {
    return (
      <div className="loading-screen">
        <h1> No Places found.Try Again ...</h1>
      </div>
    );
  }
  if (places.status === "OVER_QUERY_LIMIT") {
    return (
      <div className="loading-screen">
        <h1> {places.error_message}</h1>
      </div>
    );
  }
  return places.results ? (
    <div>
      <p className="place-headline">
        {" "}
        Nearby{" "}
        <b>
          {type[0].toUpperCase() +
            type
              .split("")
              .splice(1, type.length)
              .join("")}
        </b>{" "}
        within
        <b> {distance} M</b>
      </p>
      <div className="container">
        {places.results.map(place => (
          <div className="card">
            <div className="card-body">
              <img
                src={place.icon}
                className="float-left rounded-circle"
                alt=""
              />
              <div className="message">
                <h5 className="card-title">{place.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Ratings : {place.rating}
                </h6>
                <p className="card-text">
                  <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
                  {place.vicinity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="spinner">
      <Loader />
    </div>
  );
};

export default SearchResult;
