/* 
Data provider component to get and modify tags from Zotero
*/
import React, { useState, createContext } from "react";
//import { settings } from "../../settings.js";

/*
  Define a data CONTEXT to store the data we want to use in React.
  This context is what will be imported and stored by other componets using the data.
  Defining our data was previously done in JS with:
    const tasks = []
*/
export const TagContext = createContext();

/*
  Define a data provider COMPONENT that other components use to get the data in the context.
  You define a single property for each provider defined in your system. This is because 
  the components that uses the data must be defined as children components, and React will 
  send an object to each component.
  Defining a data provider was previously done with a separate function for each API call,
  then copying the true data to a local version a specific component could alter and use.
*/
export const TagProvider = (props) => {
  // Defines a variable that holds the state of the component, and a function that updates it
  const [tags, setTagState] = useState([]);

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

  // Return all tags in a user's library
  const getAllTags = () => {
    return fetch(
      `https://api.zotero.org/users/${userID}/tags?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setTagState)
      .catch((error) => console.log("error", error));
  };

  // Return all tags in a specific collection
  const getTagsByCollection = (collectionKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/${collectionKey}/tags?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setTagState)
      .catch((error) => console.log("error", error));
  };

  // Return all tags on a specific item
  const getTagsByItem = (itemKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/items/${itemKey}/tags?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setTagState)
      .catch((error) => console.log("error", error));
  };

  /*
    Delete a tag from everywhere in the library.
    Adding new tags can be done directly in an item's data.
    Editing current tags can not be done in bulk to all instances of that tag via the API, but each item's tags can be edited
  */
  const deleteTag = (tagString, versionKey) => {
    requestHeaders.append("If-Unmodified-Since-Version", versionKey);

    // Change options for delete requests
    var requestOptions = {
      method: "DELETE",
      headers: requestHeaders,
      redirect: "follow",
    };
    return fetch(
      `https://api.zotero.org/users/${userID}/tags?tag=${tagString}`,
      requestOptions
    )
      .then(getAllTags)
      .catch((error) => console.log("error", error));
  };

  /*
    React components return something, here we return context provider containing the 
    'task' state, a 'getTasks' function, and a 'addTask' function. This is what this 
    component will expose to other components.
  */
  return (
    <TagContext.Provider
      value={{
        tags,
        setTagState,
        getAllTags,
        getTagsByCollection,
        getTagsByItem,
        deleteTag
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
