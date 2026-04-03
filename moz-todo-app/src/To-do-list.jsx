import { useState } from 'react'
import './App.css'

let uniqueId = 3;

export default function TodoList() {
  const [liststate, setState] = useState([
    { "id": "0", "name": "Test 1", "completed": false, "editing": false}, 
    { "id": "1", "name": "Test 2", "completed": true, "editing": false}, 
    { "id": "2", "name": "Test 3", "completed": false, "editing": false}]);

  function addItem(formData) {
    const item = formData.get("item");
    // console.log("Added %s", item);
    const newlist = [...liststate];
    // console.log("New element has id of %s", uniqueId);
    newlist.push({"id": uniqueId + "", "name": item, "completed": false, "editing": false});
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

  const listitems = liststate.map((item) => (
    <>
      <li key={item.id}>{item.name}</li>
      { item.editing &&
        <form action={ (e) => { editItem(e)}}>
          <input name="item" defaultValue={item.name} ></input>
          {/* create a hidden readonly text field so itemindex gets passed in the formData */}
          <input name="itemindex" value={item.id} style={{display: "none"}} readOnly={true}></input>
          <button type="submit">Edit</button>
        </form>
      }
      {
        !item.editing &&
        <button itemindex={item.id} onClick={(e) => enterEditMode(e.target.attributes.itemindex.value)}>Edit</button>
      }
      <button itemindex={item.id} onClick={(e) => deleteItem(e.target.attributes.itemindex.value)}>Delete</button>
      <input type="checkbox" itemindex={item.id} checked={item.completed} onChange={(e) => updateCompletion(e.target.attributes.itemindex.value)} />
    </>
  ));
  return (
    <>
      <form action={addItem}>
        <input name="item"></input>
        <button type="submit">Add</button>
      </form>
      <ul>
        {listitems}
      </ul>
    </>
  )
}
