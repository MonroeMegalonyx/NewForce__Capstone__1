/*
  Component to view a specific item. 
*/
import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ItemContext } from "./ItemProvider";

export const ItemDetail = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.
  */
  const { getItemByKey } = useContext(ItemContext);

  const [item, setItem] = useState({});
  const { itemID } = useParams();
  const history = useHistory();

  /*
    The useState function defines a variable for this component to target.
    Render/return content based on the state value and changes.
    Retrieve the specific item by running the API on page load.
  */
  useEffect(() => {
    getItemByKey(itemID).then((item) => {
      setItem(item);
    });
  }, []);

  return (
    <>
      <section className="item">
        <h3 className="item__name">Item: {item.data?.title}</h3>
        <p className="item__author">Author(s): {item.meta?.creatorSummary}</p>
        <p className="item__abstract">Abstract: {item.data?.abstractNote}</p>
        <p className="item__publication">Publications: {item.data?.publicationTitle}</p>
        <p className="item__pages">Pages: {item.data?.pages}</p>
        <p className="item__volume">Volume: {item.data?.volume}</p>
        <p className="item__year">Year: {item.meta?.parsedDate}</p>
        <p className="item__url">URL: {item.data?.url}</p>
        <p className="item__added">Added on: {item.data?.dateAdded}</p>
        <p className="item__modified">Modified on: {item.data?.dateModified}</p>
      </section>
      <section className="item__buttons">
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/items/edit/${item.key}`)}
        >
          Edit
        </button>
      </section>
    </>
  );
};
