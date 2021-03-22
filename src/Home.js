import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("zotero_user"));

  return (
    <main className="container--homepage">
    <section>
        <h1>Zotero: Capstone #1 Project</h1>
        <h3>Welcome back {user[2]}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </section>
  </main>
  )
};