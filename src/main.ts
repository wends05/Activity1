import { Config } from './Config';
import { getConfig, getTodos, saveTodos } from './localStorage';
import { sortTodos } from './sort';
import './style.css'
import Todo from "./Todo"

export let todos: Todo[] = [];
export let sortedTodos: Todo[] = []

enum Sorting {
  default, name, newest, oldest
}


let config: Config = {
  sorting: Sorting.default
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
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  </div>
  <ul id="todos" class="todos" />
`


const renderTodos = () => {
  const todosElement = document.getElementById("todos");
  todosElement!.innerHTML = ''
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
  console.log(sortButton.value)
})

document.addEventListener("DOMContentLoaded", () => {
  todos = getTodos()
  renderTodos()
  config = getConfig()
})
