import { Config } from "./Config";
import { Sorting } from "./main";
import Todo from "./Todo";

export const sortTodos = (todos: Todo[], config: Config) => {
  const today = new Date().getTime()
  
  console.log(config)

  const finishedTodos = todos
    .filter(todo => todo.isComplete)
  
  const dueTodos = todos
    .filter(todo => {  
      const todoDeadline = new Date(todo.deadline).getTime()
      return todoDeadline < today && !todo.isComplete
    })
    .sort((a, b) => {
      const aDeadline = new Date(a.deadline).getTime()
      const bDeadline = new Date(b.deadline).getTime()
      return bDeadline - aDeadline;
    })
  

  const notDueTodos = todos
    .filter(todo => !dueTodos.includes(todo) && !todo.isComplete)
    .sort((a , b) => {
      switch (config.sorting) {
        case Sorting.name:
          return config.reverse ?
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()) :
            b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        case Sorting.due:
          const aDeadline = new Date(a.deadline).getTime()
          const bDeadline = new Date(b.deadline).getTime()
          return config.reverse ? bDeadline - aDeadline : aDeadline - bDeadline ;
        default:
          return config.reverse ?
            -1 : 0
      }
    })
  

  console.log(dueTodos)
  console.log(notDueTodos)

  return [...finishedTodos, ...notDueTodos, ...dueTodos]
}

