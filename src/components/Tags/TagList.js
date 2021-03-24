/*
  Component to list all tags. 
*/
import React, { useContext, useEffect } from "react";
import { TagContext } from "./TagProvider";
import { TagCard } from "./Tag";
//import "./Tag.css"
import "bootstrap/dist/css/bootstrap.min.css";

export const TagsList = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const {
    tags,
    setTagState,
    getAllTags,
    getTagsByCollection,
    getTagsByItem,
    deleteTag,
  } = useContext(TagContext);

  /*
    useEffect() allows for getting the data from somewhere else.
    The empty brackets [] are a dependency array and mean this 
    is only run at first load and never again because it's not given any trigger.
  */
  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <>
      <div className="tags">
        {console.log("TagList: Render", tags)}
        {tags.map((tag) => {
          return <TagCard key={tag.tag} tag={tag} />;
        })}
      </div>
    </>
  );
};
