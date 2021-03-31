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

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  // const handleControlledInputChange = (event) => {
  //   //When changing a state object or array,
  //   //always create a copy make changes, and then set state.
  //   const newAnimal = { ...animal };
  //   //animal is an object with properties.
  //   //set the property to the new value
  //   newAnimal[event.target.name] = event.target.value;
  //   //update state
  //   setAnimal(newAnimal);
  // };

  const handleSaveItem = () => {
    // if (parseInt(animal.locationId) === 0) {
    //   window.alert("Please select a location");
    // } else {
    //disable the button - no extra clicks
    setIsLoading(true);
    // if (animalId) {
    //PUT - update
    editItem(itemID, item).then(() => history.push(`/`));
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
    <>{console.log(itemID, item)}</>

    // <form className="animalForm">
    //   <h2 className="animalForm__title">New Animal</h2>
    //   <fieldset>
    //     <div className="form-group">
    //       <label htmlFor="animalName">Animal name: </label>
    //       <input
    //         type="text"
    //         id="animalName"
    //         name="name"
    //         required
    //         autoFocus
    //         className="form-control"
    //         placeholder="Animal name"
    //         onChange={handleControlledInputChange}
    //         defaultValue={animal.name}
    //       />
    //     </div>
    //   </fieldset>
    //   <fieldset>
    //     <div className="form-group">
    //       <label htmlFor="location">Assign to location: </label>
    //       <select
    //         value={animal.locationId}
    //         name="locationId"
    //         id="animalLocation"
    //         className="form-control"
    //         onChange={handleControlledInputChange}
    //       >
    //         <option value="0">Select a location</option>
    //         {locations.map((l) => (
    //           <option key={l.id} value={l.id}>
    //             {l.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </fieldset>
    //   <fieldset>
    //     <div className="form-group">
    //       <label htmlFor="customer">Customer: </label>
    //       <select
    //         value={animal.customerId}
    //         name="customerId"
    //         id="customerAnimal"
    //         className="form-control"
    //         onChange={handleControlledInputChange}
    //       >
    //         <option value="0">Select a customer</option>
    //         {customers.map((c) => (
    //           <option key={c.id} value={c.id}>
    //             {c.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </fieldset>
    //   <button
    //     className="btn btn-primary"
    //     disabled={isLoading}
    //     onClick={(event) => {
    //       event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
    //       handleSaveAnimal();
    //     }}
    //   >
    // <>Add Animal</>
    //   </button>
    // </form>
    
  );
};
