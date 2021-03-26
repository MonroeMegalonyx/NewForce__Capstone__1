/*
  Component to list all items. 
*/
import React, { useContext, useEffect, useState } from "react";
import { ItemContext } from "./ItemProvider";
import { ItemCard } from "./Item";
//import "./Item.css"
import "bootstrap/dist/css/bootstrap.min.css";

export const ItemsList = ({ sortState, collectionState, tagState }) => {
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

    const plan = ()  => {

      return sortState.meta !== ""?

      console.log("ItemList: Render", sortState, items[0][sortState.meta.split(".")[0]][sortState.meta.split(".")[1]])
      :
      ""
    }

  return (
    <>
      <div className="items">
        
        {items.map((item) => {

          plan()
         
          return (
            // First check if the user has selected a folder/tag combination to filter items
            collectionState && tagState ? (
              // If TRUE, display only items matching both collection and tag in state, and null if the item doesn't match
              item.data.tags.map((tag) => {return tag.tag === tagState && item.data.collections.includes(collectionState) ? (
                <ItemCard key={item.key} item={item} />
              ):null})
            ): // Second, check if the user has selected either a collection OR tag filter
            collectionState ? (
              item.data.collections.includes(collectionState) ?(
                <ItemCard key={item.key} item={item} />
              ):null
            ):
            tagState ? (
              item.data.tags.map((tag) => {return tag.tag === tagState ? <ItemCard key={item.key} item={item} />:null})
            ): // Finally, if no filters were selected, just show the user's items
            <ItemCard key={item.key} item={item} />
          )
        })}
      </div>
    </>
  );
};
