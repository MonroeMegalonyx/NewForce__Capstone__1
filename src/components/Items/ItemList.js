/*
  Component to list all items. 
*/
import React from "react";
import { ItemCard } from "./Item";
import "./Item.css"
import "bootstrap/dist/css/bootstrap.min.css";

export const ItemsList = ({ itemArr, collectionState, tagState }) => {


  return (
    <>
    {console.log("ItemList: Render", itemArr)}
      <div className="items">
        {itemArr.map((item) => {
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
}