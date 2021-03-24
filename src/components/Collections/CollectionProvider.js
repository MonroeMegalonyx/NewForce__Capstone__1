/* 
Data provider component to get and modify collections from Zotero
*/
import React, { useState, createContext } from "react";
//import { settings } from "../../settings.js";

/*
  Define a data CONTEXT to store the data we want to use in React.
  This context is what will be imported and stored by other componets using the data.
  Defining our data was previously done in JS with:
    const tasks = []
*/
export const CollectionContext = createContext();

/*
  Define a data provider COMPONENT that other components use to get the data in the context.
  You define a single property for each provider defined in your system. This is because 
  the components that uses the data must be defined as children components, and React will 
  send an object to each component.
  Defining a data provider was previously done with a separate function for each API call,
  then copying the true data to a local version a specific component could alter and use.
*/
export const CollectionProvider = (props) => {
  // Defines a variable that holds the state of the component, and a function that updates it
  const [collections, setCollectionState] = useState([]);
  const [singleCollection, setSingleCollection] = useState([]);

  // Get the user ID for logged in user
  const user = JSON.parse(localStorage.getItem("zotero_user"));
  const userKey = user[0];
  const userID = user[1];

  // Add authentication key to requests
  const requestHeaders = new Headers();
  requestHeaders.append("Zotero-API-Key", userKey);
  requestHeaders.append("Content-Type", "application/json");

  // Set options for the fetch call
  const getOptions = {
    method: "GET",
    headers: requestHeaders,
    redirect: "follow",
  };

  // Return all collections in user's library
  const getAllCollections = () => {
    return fetch(
      `https://api.zotero.org/users/${userID}/collections?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setCollectionState)
      .catch((error) => console.log("error", error));
  };

  // Return only top-level collections in the user's library
  const getTopCollections = () => {
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/top?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setCollectionState)
      .catch((error) => console.log("error", error));
  };

  // Return a specific collection in user's library
  const getCollectionByKey = (collectionKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/${collectionKey}?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setSingleCollection)
      .catch((error) => console.log("error", error));
  };

  // Return subcollections in a specific collection
  const getSubcollections = (collectionKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/${collectionKey}/collections?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setCollectionState)
      .catch((error) => console.log("error", error));
  };

  /*
    Create a new collection in user's library.
    New folder should be an array that has "name" and "parentCollection" key if any.
  */
  const newCollection = (userAddition) => {
    var raw = JSON.stringify(userAddition);
    // Change options for adding requests
    var requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(
      `https://api.zotero.org/users/${userID}/collections`,
      requestOptions
    )
      .then(getAllCollections)
      .catch((error) => console.log("error", error));
  };

  /*
    Edit a specific collection in user's library. This replaces all the fields in the data array with both the modified fields and other unmodified fields if any. Version field should be the current version before editing.
    Collections should be an array that has "key", "version", "name", and "parentCollection" if any.
  */
  const editCollection = (collectionKey, userChanges) => {
    var raw = JSON.stringify(userChanges);
    // Change options for edit requests
    var requestOptions = {
      method: "PUT",
      headers: requestHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/${collectionKey}`,
      requestOptions
    )
      .then(getAllCollections)
      .catch((error) => console.log("error", error));
  };

  // Delete a specific collection in user's library.
  const deleteCollection = (collectionKey, versionKey) => {
    // Add version number to header to validate API call, may need to add this step to other write calls for full functionality
    requestHeaders.append("If-Unmodified-Since-Version", versionKey);

    // Change options for delete requests
    var requestOptions = {
      method: "DELETE",
      headers: requestHeaders,
      redirect: "follow",
    };
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/${collectionKey}`,
      requestOptions
    )
      .then(getAllCollections)
      .catch((error) => console.log("error", error));
  };

  /*
    React components return something, here we return context provider containing the 
    'task' state, a 'getTasks' function, and a 'addTask' function. This is what this 
    component will expose to other components.
  */
  return (
    <CollectionContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
};
