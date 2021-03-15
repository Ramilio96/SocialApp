import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { getTodos } from "../../redux/todo-selectors";
import { addTodo, removeTodo } from "../../redux/todoReducer";
import { Todo } from "./Todo/Todo";

const TodoContainer = (props) => {
  return (
    <div>
      <Todo {...props} />
    </div>
  );
};

let mapStateToProps = (state) => ({
  todos: getTodos(state),
});

export default compose(
  connect(mapStateToProps, { addTodo, removeTodo }),
  withAuthRedirect
)(TodoContainer);
