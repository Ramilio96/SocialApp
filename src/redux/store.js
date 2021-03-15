import { combineReducers, createStore, applyMiddleware } from "redux";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import todoReducer from "./todoReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  usersPage: usersReducer,
  todoPage: todoReducer,
  authPage: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
