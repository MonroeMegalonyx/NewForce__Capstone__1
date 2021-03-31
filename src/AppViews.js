/* 
Route component that renders each page at the correct URL
*/
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { ItemProvider } from "./components/Items/ItemProvider";
import { ItemDetail } from "./components/Items/ItemDetail";
import { ItemForm } from "./components/Items/ItemForm";
import { TagProvider } from "./components/Tags/TagProvider";
import { CollectionProvider } from "./components/Collections/CollectionProvider";

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
              <Route
                exact
                path="/items/detail/:itemID"
                component={ItemDetail}
                render={(props) => {
                  return <ItemDetail />;
                }}
              />
              <Route
                exact
                path="/items/edit/:itemID"
                component={ItemForm}
                render={(props) => {
                  return <ItemForm />;
                }}
              />
            </TagProvider>
          </CollectionProvider>
        </ItemProvider>
      </>
    );
  }
}
