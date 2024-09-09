import { Config } from "./Config";
import Todo from "./Todo"
import { todos } from "./main";


export const getTodos = (): Todo[] => JSON.parse(localStorage.getItem("TODOS") || '[]');

export const saveTodos = () => localStorage.setItem("TODOS", JSON.stringify(todos));

export const getConfig = () : Config => JSON.parse(localStorage.getItem("config") || "{}")

export const setConfig = (config: Config) => localStorage.setItem("config", JSON.stringify(config))