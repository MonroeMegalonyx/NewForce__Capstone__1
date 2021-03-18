/*
  Component to list all collections. 
*/
import React, { useContext, useEffect } from "react";
import { CollectionContext } from "./CollectionProvider";

export const CollectionsList = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const { getZoteroCollections, collections } = useContext(CollectionContext);

  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getZoteroCollections();
  }, []);

  return (
    <>
      <h2>Zotero Collections Feed</h2>
      <button id="console-log" onClick={() => console.log(collections)}>
        Console log collections API
      </button>
    </>
  );
};
