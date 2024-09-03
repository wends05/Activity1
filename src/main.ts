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
        <button id="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
  <ul id="todos" class="todos" />
`

const submitItem = (todo: Todo) => {

  const idString = todo.id.toString()

  const todoElement = document.createElement('li')
  const checkBox = document.createElement('input')
  const label = document.createElement('label')
  const button = document.createElement("button")
  const trash = document.createElement("img")

  trash.src = '/trash-can-svgrepo-com.svg'
  trash.width = 25

  button.setAttribute("class", "trash")
  button.appendChild(trash)

  checkBox.type = 'checkbox'
  label.setAttribute("name", idString)
  checkBox.id = idString
  checkBox.checked = todo.isComplete

  label.setAttribute("class", "todo-label")
  label.setAttribute("for", idString)
  label.innerHTML = todo.name
  todoElement.setAttribute("class", "todo")
  todoElement.append(checkBox, label, button)

  const todosElement = document.getElementById("todos")
  todosElement?.appendChild(todoElement)

  checkBox.addEventListener("change", () => {
    todo.isComplete = checkBox.checked
    saveTodos()
  })

  button.addEventListener("click", () => {
    todos = todos.filter(t => t.id != todo.id)
    todosElement?.removeChild(todoElement)
    saveTodos()
  })
  saveTodos()
}

const saveTodos = () => {
  window.localStorage.setItem("TODOS", JSON.stringify(todos))
}


let todos : Todo[] = []

todos = JSON.parse(localStorage.getItem("TODOS") || '[]') 
console.log(todos)
todos.forEach(todo => {
  submitItem(todo)}
)

document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault()
  const todoInputElement = document.querySelector<HTMLFormElement>("#todo")!
  const todoText = todoInputElement.value

  if (!todoText) {
    alert("Wrong");
    return;
  }

  const todo: Todo = {
    id: new Date().getTime(),
    name: todoText,
    isComplete: false,
  }

  todos.push(todo)
  submitItem(todo)
  todoInputElement.value = ""
})
