import React from "react";
//import "./Tag.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  The text of a tag is stored in the "tag" array returned from the API. Other information stored at the top-level of the object is "links", and "meta" for each tag
*/

export const TagCard = ({ tag, selectTag }) => (
  <section className="tag">
    <button className="btn btn-info" onClick={() => selectTag(tag.tag)}>
      {tag.tag}
    </button>
  </section>
);
