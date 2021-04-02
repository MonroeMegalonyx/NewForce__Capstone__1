import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
//import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css'

export const Login = (props) => {
  const key = useRef();
  const history = useHistory();

  // Saving the user's Key, ID, and Username as strings in the local storage. To access later, use JSON.parse() to get array
  const getUser = (key) => {
    return fetch(`https://api.zotero.org/keys/${key}`)
      .then((r) => r.json())
      .then((user) => {
        let userData = [user.key, user.userID, user.username]
        localStorage.setItem("zotero_user", JSON.stringify(userData));
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    getUser(key.current.value).then(history.push("/"));
  };

  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Zotero: Capstone #1 Project</h1>
          <h3>Please sign in with your private key from Zotero</h3>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p> */}
          <fieldset>
            <label htmlFor="inputKey">Private Key: </label>
            <input
              ref={key}
              type="key"
              id="key"
              className="form-control"
              placeholder="Private key"
              required
              autoFocus
            />
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--info">
        <a href="https://www.zotero.org/settings/keys/new">
          Need a private key?
        </a>
      </section>
    </main>
  );
};
