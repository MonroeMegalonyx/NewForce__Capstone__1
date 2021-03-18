/*
  Component to list all tags. 
*/
import React, { useContext, useEffect } from "react";
import { TagContext } from "./TagProvider";

export const TagsList = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const { getZoteroTags, tags } = useContext(TagContext);

  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getZoteroTags();
  }, []);

  return (
    <>
      <h2>Zotero Tags</h2>
      <button id="console-log" onClick={() => console.log(tags)}>
        Console log tags API
      </button>
    </>
  );
};
