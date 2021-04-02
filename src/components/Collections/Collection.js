import React from "react";
import { Link } from "react-router-dom";
//import "./Collection.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  Information about a collection is stored in the "data" array returned from the API. Other information stored at the top-level of the object is "key" and "version", as well as arrays containung information about the "library", "links", and "meta" for each object
*/
// Use selectCollection to update the parent state in Home when a user clicks the name of a collection. This allows filtering on that name
export const CollectionCard = ({ collection, selectCollection }) => (
  <section className="collection">
    <button
      className="colbt btn btn-info"
      onClick={() => selectCollection(collection.key)}
    >
      {collection.data.name}
    </button>
  </section>
);
