/* 
Data provider component to get and modify tasks in a local database.
*/
import React, { useState, createContext } from "react";
//import { settings } from "../../settings.js";

/*
  Define a data CONTEXT to store the data we want to use in React.
  This context is what will be imported and stored by other componets using the data.
  Defining our data was previously done in JS with:
    const tasks = []
*/
export const ItemContext = createContext();

/*
  Define a data provider COMPONENT that other components use to get the data in the context.
  You define a single property for each provider defined in your system. This is because 
  the components that uses the data must be defined as children components, and React will 
  send an object to each component.
  Defining a data provider was previously done with a separate function for each API call,
  then copying the true data to a local version a specific component could alter and use.
*/
export const ItemProvider = (props) => {
  // Defines a variable that holds the state of the component, and a function that updates it
  const [items, setItems] = useState([]);
  const [singleItem, setSingleItem] = useState([]);
  // Define a state for search terms
  const [ searchTerms, setSearchTerms ] = useState([])

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

  /*
    Get all items (parents and children) in a user's library.
    Items include all objects in the library, ie. notes, file attachments, and the actual bibliographic entries.
  */
  const getAllItems = () => {
    return fetch(
      `https://api.zotero.org/users/${userID}/items?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setItems)
      .catch((error) => console.log("error", error));
  };

  // Get only top-level items in the user's library
  const getTopItems = () => {
    return fetch(
      `https://api.zotero.org/users/${userID}/items/top?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setItems)
      .catch((error) => console.log("error", error));
  };

  // Get all the info for a specific item by its key
  const getItemByKey = (itemKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/items/${itemKey}?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setSingleItem)
      .catch((error) => console.log("error", error));
  };

  // Get all the children (if any) for a specific item by its key
  const getChildrenOfItem = (itemKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/items/${itemKey}/children?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setItems)
      .catch((error) => console.log("error", error));
  };

  // Return all items in a specific collection
  const getItemsByCollection = (collectionKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/${collectionKey}/items?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setItems)
      .catch((error) => console.log("error", error));
  };

  // Return only top-level items in a specific collection
  const getTopItemsByCollection = (collectionKey) => {
    return fetch(
      `https://api.zotero.org/users/${userID}/collections/${collectionKey}/items/top?format=json&v=3`,
      getOptions
    )
      .then((response) => response.json())
      .then(setItems)
      .catch((error) => console.log("error", error));
  };

  /*
    Create a new collection in user's library.
    New folder should be an array that has "name" and "parentCollection" key if any.
  */
  const newItem = (userAddition) => {
    var raw = JSON.stringify(userAddition);
    // Change options for adding requests
    var requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(
      `https://api.zotero.org/users/${userID}/items/`,
      requestOptions
    )
      .then(getAllItems)
      .catch((error) => console.log("error", error));
  };

  /*
    Edit a specific item in user's library. This replaces all the fields in the data array with both the modified fields and other unmodified fields if any. Version field should be the current version before editing.
    Items have a data array that can be directly edited and sent back. The fields "itemType", "tags", "collections", and "relations" are required.
  */
  const editItem = (itemKey, userChanges) => {
    var raw = JSON.stringify(userChanges);
    // Change options for edit requests
    var requestOptions = {
      method: "PUT",
      headers: requestHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(
      `https://api.zotero.org/users/${userID}/items/${itemKey}`,
      requestOptions
    )
      .then(getAllItems)
      .catch((error) => console.log("error", error));
  };

  /*
    With PATCH, you can submit just the properties that have actually changed, for a potentially much more efficient operation. Properties not included in the uploaded JSON are left untouched on the server. To clear a property, pass an empty string or an empty array as appropriate.

    Notes and attachments can be made child items by assigning the parent item's key to the parentItem property. If parent and child items are created in the same POST request, the child items must appear after the parent item in the array of items.
  */
  const editPartialItem = (itemKey, userChanges) => {
    var raw = JSON.stringify(userChanges);
    // Change options for edit requests
    var requestOptions = {
      method: "PATCH",
      headers: requestHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(
      `https://api.zotero.org/users/${userID}/items/${itemKey}`,
      requestOptions
    )
      .then(getAllItems)
      .catch((error) => console.log("error", error));
  };

  /*
    The item's current version number is included in the version JSON property, as well as in the Last-Modified-Version header of single-item requests. PUT and PATCH requests must include the item's current version number in either the version property or the If-Unmodified-Since-Version header. (version is included in responses from the API, so clients that simply modify the editable data do not need to bother with a version header.) If the item has been changed on the server since the item was retrieved, the write request will be rejected with a 412 Precondition Failed error, and the most recent version of the item will have to be retrieved from the server before changes can be made.
  */

  // Delete a specific item in user's library.
  const deleteItem = (itemKey, versionKey) => {
    // Add version number to header to validate API call, may need to add this step to other write calls for full functionality
    requestHeaders.append("If-Unmodified-Since-Version", versionKey);

    // Change options for delete requests
    var requestOptions = {
      method: "DELETE",
      headers: requestHeaders,
      redirect: "follow",
    };
    return fetch(
      `https://api.zotero.org/users/${userID}/items/${itemKey}`,
      requestOptions
    )
      .then(getAllItems)
      .catch((error) => console.log("error", error));
  };

  /*
    React components return something, here we return context provider containing the 
    'task' state, a 'getTasks' function, and a 'addTask' function. This is what this 
    component will expose to other components.
  */
  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        singleItem,
        setSingleItem,
        searchTerms,
        setSearchTerms,
        getAllItems,
        getTopItems,
        getItemByKey,
        getChildrenOfItem,
        getItemsByCollection,
        getTopItemsByCollection,
        newItem,
        editItem,
        editPartialItem,
        deleteItem,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};
