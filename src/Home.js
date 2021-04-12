import React, { useState, useContext, useEffect } from "react";
import { ItemContext } from "./components/Items/ItemProvider";
import { ItemsList } from "./components/Items/ItemList";
import { ItemSearch } from "./components/Items/ItemSearch";
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
  const { items, setItems, searchTerms, getTopItems } = useContext(ItemContext);

  /*
    Store the collection/tag filter most recently clicked by the user to State.
  */
  let [collectionSelect, setCollectionSelect] = useState();
  let [tagSelect, setTagSelect] = useState();
  let [searchFilteredItems, setSearchFilter] = useState([]);

  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getTopItems();
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      // Display items matching search filter if search field is not blank
      const searchReturn = items.filter(
        (item) =>
          item.data.title.toLowerCase().includes(searchTerms) ||
          item.data.shortTitle?.toLowerCase().includes(searchTerms) ||
          item.data.publicationTitle?.toLowerCase().includes(searchTerms) ||
          item.data.journalAbbreviation?.toLowerCase().includes(searchTerms) ||
          item.data.institution?.toLowerCase().includes(searchTerms) ||
          item.data.abstractNote?.toLowerCase().includes(searchTerms) ||
          item.meta.creatorSummary?.toLowerCase().includes(searchTerms) ||
          item.meta.parsedDate?.includes(searchTerms)
      );
      setSearchFilter(searchReturn);
    } else {
      setSearchFilter(items);
    }
  }, [searchTerms, items]);

  /*
    Update items array in State to be sorted by which button the user selects and pass that updated array to the ItemList component. 
  */
  const handleSortSelection = (event) => {
    if (event.target.value !== "") {
      console.log("Sorting items...");
      sortItemsByClick(event.target.value);
    }
  };

  const sortItemsByClick = (sortAttribute) => {
    const sortedArr = [...items];

    sortedArr.sort((a, b) => {
      console.log(
        a[sortAttribute?.split(".")[0]][sortAttribute?.split(".")[1]] >
          b[sortAttribute?.split(".")[0]][sortAttribute?.split(".")[1]]
      );

      if (
        a[sortAttribute?.split(".")[0]][sortAttribute?.split(".")[1]] >
        b[sortAttribute?.split(".")[0]][sortAttribute?.split(".")[1]]
      )
        return 1;
      if (
        a[sortAttribute?.split(".")[0]][sortAttribute?.split(".")[1]] <
        b[sortAttribute?.split(".")[0]][sortAttribute?.split(".")[1]]
      )
        return -1;
      return 0;
    });
    setItems(sortedArr);
  };

  return (
    <>
      <main className="container--homepage">
        <div className="container--header">
          <h1>NF-Zotero</h1>
          <h3>A full featured web client for your Zotero Library.</h3>
          <h3>Welcome back <i>{user[2]}</i>.</h3>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p> */}

          <section className="container--searchbar">
            <ItemSearch />
          </section>

          <section className="container--sortmenu">
            <fieldset>
              <select
                onChange={handleSortSelection}
                defaultValue=""
                name="sortID"
                id="sortID"
                className="btn btn-light border-secondary dropdown-toggle"
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
                {/* <option key={6} value={"data.itemType"}>
                {"Item type"}
              </option> */}
              </select>
            </fieldset>
          </section>
        </div>
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
                itemArr={searchFilteredItems}
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
