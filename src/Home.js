import React, { useState, useContext, useEffect } from "react";
import { ItemContext } from "./components/Items/ItemProvider";
import { ItemsList } from "./components/Items/ItemList";
import { TagsList } from "./components/Tags/TagList";
import { CollectionsList } from "./components/Collections/CollectionList";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("zotero_user"));
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const { items, setItems, getTopItems } = useContext(ItemContext);
  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getTopItems();
  }, []);

  /*
    Store the collection/tag filter most recently clicked by the user to State.
  */
  let [collectionSelect, setCollectionSelect] = useState();
  let [tagSelect, setTagSelect] = useState();

  /*
    Update items array in State to be sorted by which button the user selects and pass that updated array to the ItemList component. 
  */
  // let [sortProp, setSortProp] = useState("");
  const handleSortSelection = (event) => {
    sortItemsByClick(event.target.value);
  };

  const sortItemsByClick = (sortAttribute) => {
    const sortedArr = [ ...items ];
    console.log("ItemList: Render",sortedArr)
    sortedArr.sort((a, b) => {
      console.log(
        a[sortAttribute.split(".")[0]][sortAttribute.split(".")[1]] >
          b[sortAttribute.split(".")[0]][sortAttribute.split(".")[1]]
      );

      if (
        a[sortAttribute.split(".")[0]][sortAttribute.split(".")[1]] >
        b[sortAttribute.split(".")[0]][sortAttribute.split(".")[1]]
      )
        return 1;
      if (
        a[sortAttribute.split(".")[0]][sortAttribute.split(".")[1]] <
        b[sortAttribute.split(".")[0]][sortAttribute.split(".")[1]]
      )
        return -1;
      return 0;
    });
    setItems(sortedArr);
    //   for (let i=0; i<itemArr.length; i++){
    //     //console.log("ItemList: Render", itemArr, sortState, items[i][sortState.split(".")[0]][sortState.split(".")[1]])
    //     sortedItems.push(items[i][sortState.split(".")[0]][sortState.split(".")[1]])

    //   }
    // } else {};
    // console.log(sortedItems)

    // function sortArray(a,b) {
    //   return (a[sortState.split(".")[0]][sortState.split(".")[1]])-(b[sortState.split(".")[0]][sortState.split(".")[1]])
    // }

    // return sortState ?(
    //   itemArr=itemArr.sort(sortArray)
    //   )
    // :null
  };
  
  return (
    <>
      <main className="container--homepage">
        <section className="container--header">
          <h1>Zotero: Capstone #1 Project</h1>
          <h3>Welcome back {user[2]}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
        <section className="container--searchbar">
          <fieldset>
            <div className="form-group">
              <select
                onChange={handleSortSelection}
                defaultValue=""
                name="sortID"
                id="sortID"
                className="form-control"
              >
                <option value={""}>Sort by...</option>
                <option key={1} value={"data.title"}>
                  {"Title"}
                </option>
                <option key={2} value={"meta.creatorSummary"}>
                  {"Author(s)"}
                </option>
                <option key={3} value={"meta.parsedDate"}>
                  {"Year published"}
                </option>
                <option key={4} value={"data.dateAdded"}>
                  {"Date added"}
                </option>
                <option key={5} value={"data.dateModified"}>
                  {"Date modified"}
                </option>
                <option key={6} value={"data.itemType"}>
                  {"Item type"}
                </option>
              </select>
            </div>
          </fieldset>
        </section>
        <section className="container--content">
          <section className="container--sidebar">
            <div className="container--collections">
              <CollectionsList selectedCollection={setCollectionSelect} />
            </div>
            <div className="container--tags">
              <TagsList selectedTag={setTagSelect} />
            </div>
          </section>
          <section className="container--list">
            <div className="container--items">
              <ItemsList
                itemArr={items}
                collectionState={collectionSelect}
                tagState={tagSelect}
              />
            </div>
          </section>
        </section>
      </main>
    </>
  );
};
