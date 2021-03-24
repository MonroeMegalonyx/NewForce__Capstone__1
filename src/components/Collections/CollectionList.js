/*
  Component to list all collections. 
*/
import React, { useContext, useEffect } from "react";
import { CollectionContext } from "./CollectionProvider";
import { CollectionCard } from "./Collection";
//import "./Collection.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const CollectionsList = () => {
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
      <div className="collections">
        {console.log("CollectionList: Render", collections)}
        {collections.map((collection) => {
          return <CollectionCard key={collection.key} collection={collection} />;
        })}
      </div>
    </>
  );
};
