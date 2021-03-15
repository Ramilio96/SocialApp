import { v4 as uuidv4 } from "uuid";

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

let initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      let newTodo = {
        id: uuidv4(),
        title: action.todoBody,
        like: 0,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case REMOVE_TODO: {
      let clonedTodos = [...state.todos];
      clonedTodos = clonedTodos.filter((t) => {
        return t.id !== action.id;
      });

      return { ...state, todos: [...clonedTodos] };
    }

    default:
      return state;
  }
};

export const addTodo = (todoBody) => ({
  type: ADD_TODO,
  todoBody,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id,
});

export default todoReducer;
