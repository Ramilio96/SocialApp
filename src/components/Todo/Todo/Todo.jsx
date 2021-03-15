import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { AddTodoForm } from "./AddTodoForm/AddTodoForm";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export const Todo = ({ todos, addTodo, removeTodo }) => {
  let todosItems = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      title={todo.title}
      removeTodo={removeTodo}
      id={todo.id}
    />
  ));
  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={12} lg={6}>
            <AddTodoForm addTodo={addTodo} />
            {todos.length ? (
              <ListGroup>{todosItems}</ListGroup>
            ) : (
              <h4 className="text-center">Дел нет!</h4>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  addTodo: PropTypes.func,
  removeTodo: PropTypes.func,
};
