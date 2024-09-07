import { Config } from "./Config";
import Todo from "./Todo";

export const sortTodos = (todos: Todo[], config: Config) => {
  const today = new Date().getTime()
  
  const dueTodos = todos
    .filter(todo => {  
      const todoDeadline = new Date(todo.deadline).getTime()
      return todoDeadline < today
    })
    .sort((a, b) => {
      const aDeadline = new Date(a.deadline).getTime()
      const bDeadline = new Date(b.deadline).getTime()
      return bDeadline - aDeadline;
    })

  const notDueTodos = todos
    .filter(todo => !dueTodos.includes(todo))
    .sort((a , b) => {
      const aDeadline = new Date(a.deadline).getTime()
      const bDeadline = new Date(b.deadline).getTime()
      return config.ascending ? bDeadline - aDeadline : aDeadline - bDeadline;
    })

  console.log(dueTodos)
  console.log(notDueTodos)

  return [...notDueTodos, ...dueTodos]
}

