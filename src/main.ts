import './style.css'
import submit from './submit.ts'

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
  <div id="todos" class="todos">
  </div>
  </div>

`

document.getElementById("submit")!.addEventListener("click", () => {
  submit()
})
document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault()
})
