/* 
Route component that renders each page at the correct URL
*/
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { ItemProvider } from "./components/Items/ItemProvider";
import { ItemsList } from "./components/Items/ItemList";
import { ItemCard } from "./components/Items/ItemDetail";
import { TagProvider } from "./components/Tags/TagProvider";
import { TagsList } from "./components/Tags/Tags";
import { CollectionProvider } from "./components/Collections/CollectionProvider";
import { CollectionsList } from "./components/Collections/Collections";
//import { FileProvider } from "./components/Files/FilesProvider";
//import { DisplayFile } from "./components/Files/Files"

export default class ApplicationViews extends Component {
  render() {
    return (
      <>
        <Route
          exact
          path="/"
          render={(props) => {
            return <Home />;
          }}
        />

        <ItemProvider>
          <Route
            exact
            path="/items"
            render={(props) => {
              return <ItemsList />;
            }}
          />
          <Route
            exact
            path="/items/:itemID"
            component={ItemCard}
            render={(props) => {
              return <ItemCard />;
            }}
          />
        </ItemProvider>

        <TagProvider>
          <Route
            path="/tags"
            render={(props) => {
              return <TagsList />;
            }}
          />
        </TagProvider>

        <CollectionProvider>
          <Route
            path="/collections"
            render={(props) => {
              return <CollectionsList />;
            }}
          />
        </CollectionProvider>
      </>
    );
  }
}
