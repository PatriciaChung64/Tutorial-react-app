import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledEngineProvider } from '@mui/material/styles';
import './To-do-list.css'

let uniqueId = 3;
const name = "To Do List";

export default function TodoList() {
  const [liststate, setState] = useState([
    { "id": "0", "name": "Test 1", "completed": false, "editing": false },
    { "id": "1", "name": "Test 2", "completed": true, "editing": false },
    { "id": "2", "name": "Test 3", "completed": false, "editing": false }]);

  const [filter, setFilter] = useState("all");

  function addItem(formData) {
    const item = formData.get("item");
    // console.log("Added %s", item);
    const newlist = [...liststate];
    // console.log("New element has id of %s", uniqueId);
    newlist.push({ "id": uniqueId + "", "name": item, "completed": false, "editing": false });
    uniqueId++;
    setState(newlist);
  }

  function deleteItem(id) {
    const newlist = [...liststate];
    const index = newlist.findIndex((el) => el.id === id);
    // console.log("Deleting item with id %s", index);
    newlist.splice(index, 1);
    setState(newlist);
  }

  function updateCompletion(id) {
    const newlist = [...liststate];
    const index = newlist.findIndex((el) => el.id === id);
    newlist[index].completed = !newlist[index].completed;
    // console.log(newlist[index].completed);
    setState(newlist);
  }

  function enterEditMode(id) {
    const newlist = [...liststate];
    const index = newlist.findIndex((el) => el.id === id);
    newlist[index].editing = true;
    // console.log(newlist[index].completed);
    setState(newlist);
  }

  function editItem(formData) {
    const newItem = formData.get("item");
    const id = formData.get("itemindex");
    const newlist = [...liststate];
    const index = newlist.findIndex((el) => el.id === id);
    newlist[index].name = newItem;
    newlist[index].editing = false;
    setState(newlist);
  }

  let filterList = [...liststate];
  if (filter === "completed") {
    filterList = filterList.filter((item) => item.completed === true);
  }
  else if (filter === "incomplete") {
    filterList = filterList.filter((item) => item.completed === false);
  }

  const listitems = filterList.map((item) => (
    <StyledEngineProvider injectFirst> {/* this allows our custom css class to be injected before material UI's css so it doesn't get overwritten */}
      <>
        <li className="list-item" key={item.id}>
          <Checkbox className="checkbox" checked={item.completed} onChange={() => updateCompletion(item.id)} />
          <div className="item-text">
            {item.name}
          </div>
          {
            item.editing &&
            <form className="edit-mode" action={(e) => { editItem(e) }}>
              <input className="edit-mode-input" name="item" defaultValue={item.name} ></input>
              {/* create a hidden readonly text field so itemindex gets passed in the formData */}
              <input name="itemindex" value={item.id} style={{ display: "none" }} readOnly={true}></input>
              <IconButton aria-label="edit" type="submit">
                <EditIcon />
              </IconButton>
            </form>
          }
          <div className="buttons">
            {
              !item.editing &&
              <div onClick={() => enterEditMode(item.id)}>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </div>

            }
            <div onClick={() => deleteItem(item.id)}>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </li>
      </>
    </StyledEngineProvider>
  ));
  return (
    <div className="center">
      <h1>{name}</h1>
      <form className="form" action={addItem}>
        <input className="input" name="item" defaultValue="Add new item..."></input>
        <button className="button" type="submit">Add</button>
      </form>
      <h1>Filter by completion status: </h1>
      <div className="filter-list">
        <p className="filter-list-item" onClick={() => setFilter("all")}>All</p>
        <p className="filter-list-item" onClick={() => setFilter("completed")}>Completed</p>
        <p className="filter-list-item" onClick={() => setFilter("incomplete")}>Incomplete</p>
      </div>
      <ul className="list">
        {listitems}
      </ul>
    </div>
  )
}
