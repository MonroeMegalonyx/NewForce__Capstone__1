import React from "react";
import "./Item.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  Information about an item is stored in the "data" array returned from the API. Other information stored at the top-level of the object is "key" and "version", as well as arrays containung information about the "library", "links", and "meta" for each item
*/

export const ItemCard = ({ item }) => (
  <>
    <section className="item">
      <p className="item__name">Kind of item: {item.data.itemType}</p>
      <p className="item__name">Title: {item.data.title}</p>
      <p className="item__name">Author(s): {item.meta.creatorSummary}</p>
      <p className="item__name">Year: {item.meta.parsedDate}</p>
      <p className="item__name">Added to Library: {item.data.dateAdded}</p>
      <p className="item__name">Modified on: {item.data.dateModified}</p>
    </section>
    <section className="item__buttons">
      <button className="btn btn-primary" onClick={""}>
        Add tag
      </button>
      {/* <button className="btn btn-primary" onClick={""}>
        Add note
      </button> */}
      {/* <button className="btn btn-primary" onClick={""}>
        View info
      </button> */}
    </section>
  </>
);
