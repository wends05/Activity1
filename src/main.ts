import './style.css'

type Todo = {
  id: number,
  name: string;
  isComplete: boolean;
}

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
  deadline.innerText = parsedDate.toDateString()
  deadline.classList.add("todo-deadline")

  const trashButton = document.createElement("button");
  const trashImg = document.createElement("img");
  trashImg.src = '/trash-can-svgrepo-com.svg';
  trashImg.width = 25;
  trashButton.classList.add("trash")
  trashButton.appendChild(trashImg);


  todoElement.classList.add("todo")
  todoElement.append(checkBox, label, deadline, trashButton);

  if (parsedDate.getTime() < today.getTime() ) {
    todoElement.classList.add("todo-overdue")
  }
  
  const todosElement = document.getElementById("todos");
  todosElement?.appendChild(todoElement);

  checkBox.addEventListener("change", () => {
    todo.isComplete = checkBox.checked;
    saveTodos();
  })

  trashButton.addEventListener("click", () => {
    todos = todos.filter(t => t.id != todo.id);
    todosElement?.removeChild(todoElement);
    saveTodos();
  })
}

const saveTodos = () => {
  localStorage.setItem("TODOS", JSON.stringify(todos));
}


let todos: Todo[] = [];

todos = JSON.parse(localStorage.getItem("TODOS") || '[]');
todos.forEach(todo => {
  submitItem(todo);
})

document.querySelector("form")?.addEventListener("submit", (e) => {
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
  saveTodos();

  submitItem(todo);
  todoInputElement.value = "";
})
