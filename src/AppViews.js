/* 
Route component that renders each page at the correct URL
*/
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { ItemProvider } from "./components/Items/ItemProvider";
import { ItemsList } from "./components/Items/Items";
import { TagProvider } from "./components/Tags/TagProvider"
import { TagsList } from "./components/Tags/Tags";
import { CollectionProvider } from "./components/Collections/CollectionProvider"
import { CollectionsList } from "./components/Collections/Collections";

export default class ApplicationViews extends Component {
  render() {
    return (
      <>
        <ItemProvider>
          <Route
            path="/items"
            render={(props) => {
              return <ItemsList />;
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
