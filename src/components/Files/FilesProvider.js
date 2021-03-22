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
export const FileContext = createContext();

/*
  Define a data provider COMPONENT that other components use to get the data in the context.
  You define a single property for each provider defined in your system. This is because 
  the components that uses the data must be defined as children components, and React will 
  send an object to each component.
  Defining a data provider was previously done with a separate function for each API call,
  then copying the true data to a local version a specific component could alter and use.
*/
export const FileProvider = (props) => {
  // Defines a variable that holds the state of the component, and a function that updates it
  const [files, setFiles] = useState([]);

  // Function to view the file from data spit out by the API
  // const viewFile = (blob) => {
  //   // Creates a new blob obj with the type explicit
  //   var newBlob = new Blob([blob], {type: "application/pdf"})

  //   // Create a link for the obj containing our downloaded pdf blob
  //   const data = window.URL.createObjectURL(newBlob);
  //   var link = document.createElement('a');
  //   link.href = data;
  //   link.download="file.pdf";
  //   link.click();
  // }

  // Get all items-parents and children-in a user's library
  // const getFileOfKey = (itemKey) => {
  //   return fetch(
  //     `https://api.zotero.org/users/${settings.zoteroUserID}/items/${itemKey}/file`,
  //     {
  //       method: "GET",

  //       headers: { "Zotero-API-Key": settings.zoteroAPIkey },
  //     }
  //   );
  //   .then((r) => r.blob())
  //   .then(viewFile)
  //   .then(setFiles);
  // };

  var myHeaders = new Headers();
  myHeaders.append("Zotero-API-Key", settings.zoteroAPIkey);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const getFileOfKey = (itemKey) => {
    return fetch(
    `https://api.zotero.org/users/${settings.zoteroUserID}/items/${itemKey}/file/view`,
    requestOptions
    )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  };

  /*
    React components return something, here we return context provider containing the 
    'task' state, a 'getTasks' function, and a 'addTask' function. This is what this 
    component will expose to other components.
  */
  return (
    <FileContext.Provider
      value={{
        files,
        getFileOfKey,
      }}
    >
      {props.children}
    </FileContext.Provider>
  );
};
