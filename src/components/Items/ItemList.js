/*
  Component to list all items. 
*/
import React, { useState } from "react";
import { ItemCard } from "./Item";
import { ItemForm } from "./TagForm";
import "./Item.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const ItemsList = ({ itemArr, collectionState, tagState }) => {
  /*
    Set a state for which item is being edited when the edit form is shown
  */
  let [itemIdToEdit, setItemIdToEdit] = useState(0);

  /*
    Using a ternary operator to both display the edit form inline for each item, and handle filtering of items shown.
  */
  return (
    <>
      {console.log("ItemList: Render", itemArr)}
      <div className="items">
        {itemArr.map((item) => {
          return (
            // First check if the user has selected a folder/tag combination to filter items
            collectionState && tagState ? (
              // If TRUE, display only items matching both collection and tag in state, and null if the item doesn't match
              item.data.tags.map((tag) => {
                return tag.tag === tagState &&
                  item.data.collections.includes(collectionState) ? (
                  <ItemCard key={item.key} item={item} />
                ) : null;
              })
            ) : // Second, check if the user has selected either a collection OR tag filter
            collectionState ? (
              item.data.collections.includes(collectionState) ? (
                <ItemCard key={item.key} item={item} />
              ) : null
            ) : tagState ? (
              item.data.tags.map((tag) => {
                return tag.tag === tagState ? (
                  <ItemCard key={item.key} item={item} />
                ) : null;
              })
            ) : // Finally, if no filters were selected, just show the user's items
            itemIdToEdit === item.key ? (
              <>
                <ItemForm
                  itemIdState={itemIdToEdit}
                  changeItemIdState={setItemIdToEdit}
                />
              </>
            ) : (
              <>
                <ItemCard key={item.key} item={item} />
              </>
            )
          );
        })}
      </div>
    </>
  );
};
