import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ItemContext } from "./ItemProvider";
import "./Item.css";

export const ItemForm = () => {
  const { getItemByKey, editItem } = useContext(ItemContext);

  //for edit, hold on to state of item in this view
  const [item, setItem] = useState({});

  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);
  const { itemID } = useParams();
  const history = useHistory();

  // when field changes, update state. This causes a re-render and updates the view.
  // Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const copyState = { ...item };
    //item is an object with properties.
    //set the property to the new value
    copyState.data[event.target.name] = event.target.value;
    //update state
    setItem(copyState);
  };

  const handleSaveItem = () => {
    // if (parseInt(animal.locationId) === 0) {
    //   window.alert("Please select a location");
    // } else {
    //disable the button - no extra clicks
    setIsLoading(true);
    // if (animalId) {
    //PUT - update
    editItem(itemID, item.data).then(() => history.push(`/`));
  };
  // else {
  //     //POST - add
  //     addAnimal({
  //       name: animal.name,
  //       locationId: parseInt(animal.locationId),
  //       customerId: parseInt(animal.customerId),
  //     }).then(() => history.push("/animals"));
  //   }
  // };

  // Get customers and locations. If animalId is in the URL, getAnimalById
  useEffect(() => {
    // getCustomers()
    //   .then(() => {
    //     if (animalId) {
    getItemByKey(itemID).then((item) => {
      setItem(item);
      setIsLoading(false);
    });
    //   } else {
    //     setIsLoading(false);
    //   }
    // });
  }, []);

  //since state controlls this component, we no longer need
  //useRef(null) or ref
  return (
    // <>{console.log(itemID, item)}</>

    <form className="itemForm">
      <h2 className="animalForm__title">EDITING ITEM:</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="itemTitle">Title: </label>
          <input
            type="text"
            id="itemTitle"
            name="title"
            required
            autoFocus
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={item.data?.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemAbstract">Abstract: </label>
          <input
            type="text"
            id="itemAbstract"
            name="abstractNote"
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={item.data?.abstractNote}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publicationTitle">Publication: </label>
          <input
            type="text"
            id="publicationTitle"
            name="publicationTitle"
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={item.data?.publicationTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pages">Pages: </label>
          <input
            type="text"
            id="pages"
            name="pages"
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={item.data?.pages}
          />
        </div>
        <div className="form-group">
          <label htmlFor="volume">Volume: </label>
          <input
            type="text"
            id="volume"
            name="volume"
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={item.data?.volume}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year Published: </label>
          <input
            type="text"
            id="year"
            name="year"
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={item.data?.date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL: </label>
          <input
            type="url"
            id="url"
            name="url"
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={item.data?.url}
          />
        </div>
      </fieldset>

      <button
        className="btn btn-success"
        disabled={isLoading}
        onClick={(event) => {
          event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
          handleSaveItem();
        }}
      >
        <>Save edits</>
      </button>
      <button
        className="btn btn-secondary"
        disabled={isLoading}
        onClick={(event) => {
          history.push(`/`);
        }}
      >
        <>Go back</>
      </button>
    </form>
  );
};
