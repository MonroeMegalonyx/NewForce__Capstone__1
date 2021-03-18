/* 
Data provider component to get and modify tasks in a local database.
*/
import React, { useState, createContext } from "react";
import { settings } from "../../settings.js";

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
  const [tags, setTags] = useState([]);

  // Get all tags in a user's library
  const getZoteroTags = () => {
    return fetch(
      `https://api.zotero.org/users/${settings.zoteroUserID}/tags?format=json&v=3`,
      {
        method: "GET",
        headers: { "Zotero-API-Key": settings.zoteroAPIkey },
      }
    )
      .then((r) => r.json())
      .then(setTags);
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
        getZoteroTags,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
