import React from "react";
//import "./Collection.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  Information about a collection is stored in the "data" array returned from the API. Other information stored at the top-level of the object is "key" and "version", as well as arrays containung information about the "library", "links", and "meta" for each object
*/

export const CollectionCard = ({ collection }) => (
  <section className="collection">
    <p className="collection__name">Collection: {collection.data.name}</p>
  </section>
);
