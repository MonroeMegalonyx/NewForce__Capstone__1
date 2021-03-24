import React from "react";
//import "./Tag.css";
import "bootstrap/dist/css/bootstrap.min.css";

/*
  The text of a tag is stored in the "tag" array returned from the API. Other information stored at the top-level of the object is "links", and "meta" for each tag
*/

export const TagCard = ({ tag }) => (
  <section className="tag">
    <h3 className="tag__name">Tag: {tag.tag}</h3>
  </section>
);
