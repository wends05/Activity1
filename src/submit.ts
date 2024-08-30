import { Todo } from "./Todo"
import trash from '../public/trash-can-svgrepo-com.svg'
export default function submit() {
    const todoInputElement = document.getElementById("todo")!
    const todoText = todoInputElement.value

    console.log(todoText)
    
    if (!todoText) alert("Wrong")
    
        const todo : Todo = {              
            name: todoText,
            isComplete: false
        }
    const todoElement = document.createElement('div')
    todoElement.innerHTML = /*html*/ `
        <div class="form" id="">
            <p>${todoText}</p>
            <input type="checkbox" name="" id="">
            <div >

                <img src=${trash} alt="">
            </div>
        </div>
    `
    const todosElement = document.getElementById("todos")
    todosElement?.appendChild(todoElement)
}