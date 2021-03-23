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

const user = JSON.parse(localStorage.getItem("zotero_user"));

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

  // Get all items (parents and children) in a user's library
  const getZoteroItems = () => {
    return fetch(
      `https://api.zotero.org/users/${user[1]}/items?format=json&v=3`,
      {
        method: "GET",
        headers: { "Zotero-API-Key": user[0] },
      }
    )
      .then((r) => r.json())
      .then(setItems);
  };

  // Get all the info for a specific item by its key
  const getItemByKey = (itemKey) => {
    return fetch(
      `https://api.zotero.org/users/${user[1]}/items/${itemKey}`,
      {
        method: "GET",
        headers: { "Zotero-API-Key": user[0] },
      }
    )
      .then((r) => r.json())
      .then(setSingleItem)
  };
  
  // Post a change to a specifc item's tag
  const editTagOfItem = (itemKey, itemBody) => {
    return fetch(
      `https://api.zotero.org/users/${user[1]}/items/${itemKey}`,
      {
        method: "PUT",
        headers: { "Zotero-API-Key": user[0] },
        body: JSON.stringify(itemBody)
      })
      // .then((r) => r.json())
      // .then(setSingleItem)
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
        getZoteroItems,
        singleItem,
        getItemByKey,
        editTagOfItem
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};
