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
  const {
    getAllCollections,
    singleCollection,
    getSubcollections,
    getOneCollection,
    collections,
    deleteCollection,
    editCollection,
  } = useContext(CollectionContext);

  const body = [
    {
      name: "A new folder 2",
    },
  ];

  const editfolder = {
      "key": "KPZ86F8E",
      "version": 74,
      "name": "New name is gravy",
      "parentCollection": false,
      "relations": {}
  }
  const test = "KPZ86F8E";
  const version = 80
  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {getAllCollections()}, []);

  const handleClick = () => {
    console.log(collections)

  };

  return (
    <>
      <h2>Zotero Collections Feed</h2>
      <button id="console-log" onClick={() => handleClick()}>
        Console log collections API
      </button>
    </>
  );
};
