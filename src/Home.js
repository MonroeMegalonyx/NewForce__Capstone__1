import React, { useImperativeHandle, useState } from "react";
import { ItemsList } from "./components/Items/ItemList";
import { TagsList } from "./components/Tags/TagList";
import { CollectionsList } from "./components/Collections/CollectionList";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("zotero_user"));

  /*
    Which collection was most recently clicked by the user.
  */
  let [collectionSelect, setCollectionSelect] = useState();
  let [tagSelect, setTagSelect] = useState();
  
  /*
    Name of the data attribute to sort by. 
  */
  let [sortProp, setSortProp] = useState({meta:""});
  const handleSortSelection = (event) => {
    setSortProp({meta:event.target.value})
  }

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
                  <select onChange={handleSortSelection} defaultValue="placeholder" name="sortID" id="sortID" className="form-control">
                      <option value={"placeholder"}>Sort by...</option>
                      <option key={1} value={"data.title"}>{"Title"}</option>
                      <option key={2} value={"meta.creatorSummary"}>{"Author(s)"}</option>
                      <option key={3} value={"meta.parsedDate"}>{"Year published"}</option>
                      <option key={4} value={"data.dateAdded"}>{"Date added"}</option>
                      <option key={5} value={"data.dateModified"}>{"Date modified"}</option>
                      <option key={6} value={"data.itemType"}>{"Item type"}</option>
                  </select>
              </div>
          </fieldset>
        </section>
        <section className="container--content">
          <section className="container--sidebar">
            <div className="container--collections">
              <CollectionsList selectedCollection={setCollectionSelect}/>
            </div>
            <div className="container--tags">
              <TagsList selectedTag={setTagSelect}/>
            </div>
          </section>
          <section className="container--list">
            <div className="container--items">
              <ItemsList sortState={sortProp} collectionState={collectionSelect} tagState={tagSelect}/>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};
