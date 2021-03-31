/*
  Function to add a task.
*/
import React, {useContext, useState } from "react"
import { ItemContext } from "./ItemProvider";

export const ItemForm = ({ itemIdState, changeItemIdState, taskstateID, changeparentID}) => {
  console.log("Editing task #",itemIdState);
  const {
    items,
    setItems,
    singleItem,
    setSingleItem,
    searchTerms,
    setSearchTerms,
    getAllItems,
    getTopItems,
    getItemByKey,
    getChildrenOfItem,
    getItemsByCollection,
    getTopItemsByCollection,
    newItem,
    editItem,
    editPartialItem,
    deleteItem,
  } = useContext(ItemContext);
  
  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the initial state of the form inputs with useState()
*/
  const [task, setTask] = useState({
    task: "",
    date: "",
    completed: false,
    userId: localStorage.getItem("nutshell_user"),
  });

  //wait for data before button is active
  //const [isLoading, setIsLoading] = useState(true);

  //const history = useHistory();

  /*
  When a field changes, update state. The return will re-render and display based on the values in state
*/
  const handleControlledInputChange = (event) => {
    const inputtedTask = { ...task };
    inputtedTask[event.target.id] = event.target.value;
    setTask(inputtedTask);
  };

  const handleClickSaveTask = (taskID) => {
    console.log("You clickd save for task id =",taskID)
    console.log(task)
    const inputtedTask = { ...task };

    //setIsLoading(true);
    if (taskID) {
      //add the task ID to the state if the task is being edited
      inputtedTask.id = taskID;
      editItem(inputtedTask)
      .then(getAllItems)
      .then(changeparentID(0))
    }
  };

  return (
    <fieldset>
    <input type="date" id = "date" onChange={handleControlledInputChange}/>
    <input type="text" placeholder="Enter task here" id="task" onChange={handleControlledInputChange}/>
    <button id="saveTask" 
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveTask(taskstateID)
          }}>
        {taskstateID ? <>Save Your Changes</> : <>Add a Task</>}</button>
    </fieldset>
  );
};