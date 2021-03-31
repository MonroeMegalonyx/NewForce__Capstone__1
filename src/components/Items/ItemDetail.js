/*
  Component to view a specific item. 
*/
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ItemContext } from "./ItemProvider";
import { useParams } from "react-router-dom";

export const ItemDetail = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.
  */
  const { getItemByKey, singleItem } = useContext(ItemContext);
  const { itemID } = useParams();
  const history = useHistory();

  /*
    The useState function defines a variable for this component to target.
    Render/return content based on the state value and changes.
    Retrieve the specific item by running the API on page load.
  */
  useEffect(() => {
    getItemByKey(itemID);
  }, []);

  return (
    <>
      <section className="item">
        <h3 className="item__name">Title: {singleItem.data?.title}</h3>
        <p className="item__author">
          Author(s): {singleItem.meta?.creatorSummary}
        </p>
        <p className="item__year">Year: {singleItem.meta?.parsedDate}</p>
        <p className="item__added">
          Added to Library: {singleItem.data?.dateAdded}
        </p>
        <p className="item__modified">
          Modified on: {singleItem.data?.dateModified}
        </p>
      </section>
      <section className="item__buttons">
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/items/edit/${singleItem.key}`)}
        >
          Edit
        </button>
      </section>
    </>
  );
};
