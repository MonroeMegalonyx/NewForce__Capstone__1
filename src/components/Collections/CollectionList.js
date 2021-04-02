/*
  Component to list all collections. 
*/
import React, { useContext, useEffect } from "react";
import { CollectionContext } from "./CollectionProvider";
import { CollectionCard } from "./Collection";
//import "./Collection.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bringing in the parent state change function for which collection is selected and passing that to the cards when printed
export const CollectionsList = ({ selectedCollection }) => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const {
    collections,
    setCollectionState,
    singleCollection,
    setSingleCollection,
    getAllCollections,
    getCollectionByKey,
    getTopCollections,
    getSubcollections,
    newCollection,
    editCollection,
    deleteCollection,
  } = useContext(CollectionContext);

  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getTopCollections();
  }, []);

  return (
    <>
      <h2>Collections</h2>
      <div className="collections">
        {console.log("CollectionList: Render", collections)}
        {collections.map((collection) => {
          return (
            <CollectionCard
              key={collection.key}
              collection={collection}
              selectCollection={selectedCollection}
            />
          );
        })}
        <button className="btn btn-danger" onClick={() => selectedCollection()}>
          Clear folder selection
        </button>
      </div>
    </>
  );
};
