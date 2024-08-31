import './style.css'
import Todo from './Todo.ts'



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

  const todoElement = document.createElement('li')
  const checkBox = document.createElement('input')
  const label = document.createElement('p')
  const button = document.createElement("button")
  const trash = document.createElement("img")

  trash.src = '/trash-can-svgrepo-com.svg'
  trash.width = 25

  button.setAttribute("class", "trash")
  button.appendChild(trash)

  checkBox.type = 'checkbox'
  checkBox.id = todo.id.toString()
  checkBox.checked = todo.isComplete

  label.setAttribute("class", "todo-label")
  label.innerHTML = todo.name
  todoElement.setAttribute("class", "todo")
  todoElement.append(checkBox, label, button)

  const todosElement = document.getElementById("todos")
  console.log(checkBox.outerHTML)
  todosElement?.appendChild(todoElement)

  checkBox.addEventListener("change", () => {
    console.log("ting")
    todo.isComplete = checkBox.checked
    console.log(todos)
    saveTodos()
  })

  button.addEventListener("click", () => {
    console.log("pressed Button")
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

  console.log(todoText)

  if (!todoText) alert("Wrong")

  const todo: Todo = {
    id: todos.length + 1,
    name: todoText,
    isComplete: false
  }

  todos.push(todo)
  submitItem(todo)
  todoInputElement.value = ""
})


