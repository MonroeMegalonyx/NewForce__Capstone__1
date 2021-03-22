/*
  Component to get file attachments for a specific item. 
*/
import React, { useContext, useEffect } from "react";
import { FileContext } from "./FilesProvider";
import { useParams } from "react-router-dom";

export const DisplayFile = () => {
  /*
    The useContext hook allows you to use data structures and 
    functions that a parent provider component exposes.

  */
  const { getFileOfKey } = useContext(FileContext);

  const { fileID } = useParams();


  useEffect(() => {
    getFileOfKey(fileID);
    //console.log(fileID.id)
  },[]);

  return (
    <>
      <h2>Zotero File</h2>
    </>
  );
};

