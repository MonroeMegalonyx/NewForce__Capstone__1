import React from "react";
//import "./Item.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  Information about an item is stored in the "data" array returned from the API. Other information stored at the top-level of the object is "key" and "version", as well as arrays containung information about the "library", "links", and "meta" for each item
*/

export const ItemCard = ({ item }) => (
  <section className="item">
    <p className="item__name">Item: {item.data.title}</p>
  </section>
);
