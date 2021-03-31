import React from "react";
import { useHistory } from "react-router-dom";
import "./Item.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  Information about an item is stored in the "data" array returned from the API. Other information stored at the top-level of the object is "key" and "version", as well as arrays containung information about the "library", "links", and "meta" for each item
*/

export const ItemCard = ({ item }) => {
  const history = useHistory();
  return (
    <>
      <section className="item">
        <p className="item__name">Title: {item.data.title}</p>
        <p className="item__author">Author(s): {item.meta.creatorSummary}</p>
        <p className="item__year">Year: {item.meta.parsedDate}</p>
        <p className="item__added">Added to Library: {item.data.dateAdded}</p>
        <p className="item__modified">Modified on: {item.data.dateModified}</p>
      </section>
      <section className="item__buttons">
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/items/detail/${item.key}`)}
        >
          See details
        </button>
        <button className="btn btn-primary" onClick={""}>
          Add tag
        </button>
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/items/edit/${item.key}`)}
        >
          Edit item
        </button>
        {/* <button className="btn btn-primary" onClick={""}>
        Add note
      </button> */}
      </section>
    </>
  );
};
