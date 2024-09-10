import { Config } from './Config';
import { getConfig, getTodos, saveTodos, setConfig } from './localStorage';
import { sortTodos } from './sort';
import './style.css'
import Todo from "./Todo"

export let todos: Todo[] = [];
export let sortedTodos: Todo[] = []

export enum Sorting {
  default, name, due
}

let config: Config = {
  sorting: Sorting.default,
  reverse: false
}

const today = new Date()


document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div>
    <h3>Add a todo here</h3>
    <div class="form-container">
      <form action="/">
        <input id="todo" />
        <input id="deadline" type="datetime-local" />
        <button id="submit" type="submit">
          Submit
        </button>
      </form>
      <div class="sort-button-container">
        <p>
          Sorting:
        </p>
        <select id="sorting">
          <option value="default">Default</option>  
          <option value="name">Name</option>
          <option value="due">Due Date</option>
        </select>
        <div>
          <input type="checkbox" id="reverse" />
          <label for="reverse">Reverse</label>
        </div>
      </div>
    </div>
  </div>
  <ul id="todos" class="todos" />
`


const renderTodos = () => {
  const todosElement = document.getElementById("todos");
  todosElement!.innerHTML = ''
  console.log(config)
  sortedTodos = sortTodos(todos, config)
  sortedTodos.forEach(todo => renderTodo(todo))
}

const renderTodo = (todo: Todo) => {

  const parsedDate = new Date(todo.deadline)

  const timeArray = parsedDate
    .toLocaleTimeString()
    .split(":")
  const timeDisplayed = 
    timeArray
      .slice(0, 2)
      .join(":")
    + " " + 
    timeArray
      .slice(-1)
      .toString()
      .slice(3)
  

  const idString = todo.id.toString();
  const todoElement = document.createElement('li');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = idString;
  checkBox.checked = todo.isComplete;

  const label = document.createElement('label');
  label.classList.add("todo-label")
  label.setAttribute("for", idString);
  label.innerHTML = todo.name;

  const deadline = document.createElement('div');
  deadline.innerText = parsedDate.toDateString() + " " + timeDisplayed
  deadline.classList.add("todo-deadline")

  const trashButton = document.createElement("button");
  const trashImg = document.createElement("img");
  trashImg.src = '/trash-can-svgrepo-com.svg';
  trashImg.width = 25;
  trashButton.classList.add("trash")
  trashButton.appendChild(trashImg);


  todoElement.classList.add("todo")
  todoElement.append(checkBox, label, deadline, trashButton);

  if (parsedDate.getTime() < today.getTime() && !todo.isComplete) {
    todoElement.classList.add("todo-overdue")
  }

  if (todo.isComplete) {
    todoElement.classList.add("todo-complete")
  }
  
  const todosElement = document.getElementById("todos");
  todosElement?.appendChild(todoElement);

  checkBox.addEventListener("change", () => {
    todo.isComplete = checkBox.checked;
    saveTodos();
    renderTodos()
  })

  trashButton.addEventListener("click", () => {
    todos = todos.filter(t => t.id != todo.id);
    todosElement?.removeChild(todoElement);
    saveTodos();
  })
}

const todoForm = document.querySelector("form")! as HTMLFormElement

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInputElement = document.querySelector<HTMLFormElement>("#todo")!;
  const todoText: string = todoInputElement.value.trim();

  if (!todoText) {
    alert("Please input something");
    return;
  }

  const deadlineElement = document.querySelector<HTMLInputElement>("#deadline")!;
  const deadline = deadlineElement.value

  if (!deadline) {
    alert("Please input a date and time")
    return;
  }

  console.log(deadline)
  const todo: Todo = {
    id: new Date().getTime(),
    name: todoText,
    isComplete: false,
    deadline: new Date(deadline)
  }

  todos.push(todo);
  console.log(todos)
  saveTodos();
  renderTodos()
  todoInputElement.value = "";
  
})

const sortButton = document.querySelector<HTMLSelectElement>("#sorting")

sortButton?.addEventListener("change", () => {
  const value = sortButton.value
  config.sorting = value in Sorting ?
    Sorting[value as keyof typeof Sorting] : 0
  renderTodos()
  setConfig(config)
})

const reverseButton = document.querySelector<HTMLInputElement>("#reverse")

reverseButton?.addEventListener("change", () => {
  const value = reverseButton.checked
  config.reverse = value
  renderTodos()
  setConfig(config)
  console.log(config.reverse)
  console.log(value)
})

document.addEventListener("DOMContentLoaded", () => {
  todos = getTodos()
  config = getConfig()
  renderTodos()
  sortButton!.value = Sorting[config.sorting]
  reverseButton!.checked = config.reverse
})
