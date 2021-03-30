import React, { useContext } from "react";
import { ItemContext } from "./ItemProvider";
import "./Item.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const ItemSearch = () => {
  const { setSearchTerms } = useContext(ItemContext);

  return (
    <>
      <input
        type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search library..."
      />
    </>
  );
};
