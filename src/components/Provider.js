import React, { useState, createContext } from "react";
import { settings } from "settings.js";

let data = [];
const getZoterodata = () => {
  return fetch(
    `https://api.zotero.org/users/${settings.zoteroUserID}/items?format=json&v=3`,
    {
      method: "GET",
      headers: { "Zotero-API-Key": settings.zoteroAPIkey },
    }
  )
    .then((foo) => foo.json())
    .then((zoteroAPI) => {
      data = zoteroAPI;
      console.log("from API", data);
    });
};
