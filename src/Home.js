import React from "react";
import { ItemsList } from "./components/Items/ItemList";
import { TagsList } from "./components/Tags/TagList";
import { CollectionsList } from "./components/Collections/CollectionList";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("zotero_user"));

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
        <section className="container--content">
          <section className="container--sidebar">
            <div className="container--collections">
              <CollectionsList />
            </div>
            <div className="container--tags">
              <TagsList />
            </div>
          </section>
          <section className="container--list">
            <div className="container--items">
              <ItemsList />
            </div>
          </section>
        </section>
      </main>
    </>
  );
};
