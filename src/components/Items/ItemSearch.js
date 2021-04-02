import React, { useContext } from "react";
import { ItemContext } from "./ItemProvider";
import "./Item.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const ItemSearch = () => {
  const { setSearchTerms } = useContext(ItemContext);

  return (
    <>
      <input
        type="search"
        className="form-control mr-sm-2 bg-light border-secondary"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search library..."
      />
    </>
  );
};
