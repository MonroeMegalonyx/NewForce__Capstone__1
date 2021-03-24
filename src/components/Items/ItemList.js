/*
  Component to list all items. 
*/
import React, { useContext, useEffect } from "react";
import { ItemContext } from "./ItemProvider";
import { ItemCard } from "./Item";
//import "./Item.css"
import "bootstrap/dist/css/bootstrap.min.css";

export const ItemsList = ({ collectionState }) => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const {
    items,
    getAllItems,
    getTopItems,
    singleItem,
    getItemByKey,
    getChildrenOfItem,
    getItemsByCollection,
    getTopItemsByCollection,
    newItem,
    editItem,
    editPartialItem,
    deleteItem,
  } = useContext(ItemContext);

  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    /*
      getChildrenOfItem("7XM8E4CQ");
      getTopItems();
      getItemByKey("U5MNWYH6");
      getItemsByCollection("MJF7RCTJ")
    */
    getTopItems();
  }, []);

  return (
    <>
      <div className="items">
        {console.log("ItemList: Render", items)}
        {items.map((item) => {
          return collectionState ? (item.data.collections.includes(collectionState) ?(
            <ItemCard key={item.key} item={item} />
          ):null) : null;
        })}
      </div>
    </>
  );
};
