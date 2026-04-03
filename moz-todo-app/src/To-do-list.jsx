import { useState } from 'react'
import './App.css'

let uniqueId = 3;

export default function TodoList() {
  const [liststate, setState] = useState([
    { "id": "0", "name": "Test 1", "completed": false}, 
    { "id": "1", "name": "Test 2", "completed": true}, 
    { "id": "2", "name": "Test 3", "completed": false}]);

  function addItem(formData) {
    const item = formData.get("item");
    // console.log("Added %s", item);
    const newlist = [...liststate];
    // console.log("New element has id of %s", uniqueId);
    newlist.push({"id": uniqueId + "", "name": item, "completed": false});
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

  function changeCompletion(id) {
    const newlist = [...liststate];
    const index = newlist.findIndex((el) => el.id === id);
    newlist[index].completed = !newlist[index].completed;
    // console.log(newlist[index].completed);
    setState(newlist);
  }

  const listitems = liststate.map((item) => (
    <>
      <li key={item.id}>{item.name}</li>
      <button itemindex={item.id} onClick={(e) => deleteItem(e.target.attributes.itemindex.value)}>Delete</button>
      <input type="checkbox" itemindex={item.id} checked={item.completed} onChange={(e) => changeCompletion(e.target.attributes.itemindex.value)} />
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
