/*
  Function to edit tags for item with existing tags.
*/
import React, { useContext, useState, useEffect } from "react";
import { ItemContext } from "./ItemProvider";
import { TagContext } from "../Tags/TagProvider";

export const TagForm = ({ itemIdState, changeItemIdState, item }) => {
  const {
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
  } = useContext(ItemContext);

  const {
    tags,
    setTagState,
    getAllTags,
    getTagsByCollection,
    getTagsByItem,
    deleteTag,
  } = useContext(TagContext);

  // Get the tags for the item and then save edited tags to a new state we will add to the item via API
  const [itemTags, setItemTags] = useState([]);
  const [newItemTags, setNewItemTags] = useState();

  useEffect(() => {
    getTagsByItem(itemIdState).then((tags) => {
      setItemTags(tags);
    });
  }, []);

  /*
  When a field changes, update state. The return will re-render and display based on the values in state
  */
  const handleControlledInputChange = (event) => {
    const itemTags = { ...item };
    itemTags.data.tags[event.target.id].tag = event.target.value;
    setNewItemTags(itemTags)

    //console.log(itemTags, itemTags.indexOf("bioclimatic variables"), "test", item.data.tags, item.data.tags.indexOf("bioclimatic variables"));
  };

  const handleClickSaveTask = (itemID) => {
    console.log("You clicked save for item id =", itemID);
    const editedTags = { ...item };
    console.log(editedTags.data)
    editItem(itemID, editedTags.data).then(getAllItems).then(changeItemIdState(0));
    // }
  };

  return (
    <>
      {console.log(itemTags)}
      <section className="item">
        <p className="item__name">Title: {item.data.title}</p>
        <p className="item__author">Author(s): {item.meta.creatorSummary}</p>
        <p className="item__year">Year: {item.meta.parsedDate}</p>
        <p className="item__added">Added to Library: {item.data.dateAdded}</p>
        <p className="item__modified">Modified on: {item.data.dateModified}</p>
      </section>

      <>
        {itemTags.length !== 0
          ? item.data.tags.map((tag) => {
              return (
                <fieldset>
                  <input
                    type="text"
                    defaultValue={tag.tag}
                    id={item.data.tags.indexOf(tag)}
                    onChange={handleControlledInputChange}
                  />
                </fieldset>
              );
            })
          : null}
      </>
      <button
        id="saveTag"
        onClick={(event) => {
          event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
          handleClickSaveTask(itemIdState);
        }}
      >
        <>Save Changes</>
      </button>
    </>
  );
};
