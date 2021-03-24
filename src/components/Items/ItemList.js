/*
  Component to list all items. 
*/
import React, { useContext, useEffect } from "react";
import { ItemContext } from "./ItemProvider";

export const ItemsList = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const {
    getChildrenOfItem,
    getItemByKey,
    items,
    singleItem,
    getTopItems,
    getItemsByCollection,
  } = useContext(ItemContext);

  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    //getChildrenOfItem("7XM8E4CQ");
    //getTopItems();
    //getItemByKey("U5MNWYH6");
    getItemsByCollection("MJF7RCTJ")
  }, []);

  return (
    <>
      <h2>Zotero Item Feed</h2>
      <button
        id="console-log"
        onClick={() => {
          console.log(items);
          //console.log(singleItem);
        }}
      >
        Console log items API
      </button>
    </>
  );
};
