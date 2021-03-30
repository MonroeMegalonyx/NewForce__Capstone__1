/* 
Route component that renders each page at the correct URL
*/
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { ItemProvider } from "./components/Items/ItemProvider";
// import { ItemsList } from "./components/Items/ItemList";
// import { ItemCard } from "./components/Items/ItemDetail";
import { TagProvider } from "./components/Tags/TagProvider";
// import { TagsList } from "./components/Tags/TagList";
import { CollectionProvider } from "./components/Collections/CollectionProvider";
// import { CollectionsList } from "./components/Collections/CollectionList";

export default class ApplicationViews extends Component {
  render() {
    return (
      <>
        <ItemProvider>
          <CollectionProvider>
            <TagProvider>
              <Route
                exact
                path="/"
                render={(props) => {
                  return <Home />;
                }}
              />
            </TagProvider>
          </CollectionProvider>
        </ItemProvider>
      </>
    );
  }
}
