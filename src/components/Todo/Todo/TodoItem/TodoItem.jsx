import React, { useState } from "react";
import { Row, ListGroup } from "react-bootstrap";
import { BsHeart, BsTrash } from "react-icons/bs";
import PropTypes from "prop-types";

export default function TodoItem({ id, title, removeTodo }) {
  const [likeState, setLikeState] = useState(false);

  const unliked = {
    cursor: "pointer",
    color: "black",
  };

  const liked = {
    cursor: "pointer",
    color: "red",
  };

  const onLike = () => {
    setLikeState((prevState) => !prevState);
  };

  return (
    <>
      <ListGroup.Item className="mt-2">
        <Row>
          <p className="mx-2">{title}</p>
        </Row>
        <Row>
          {likeState ? (
            <BsHeart className="mx-2" style={liked} onClick={onLike} />
          ) : (
            <BsHeart className="mx-2" style={unliked} onClick={onLike} />
          )}
          <BsTrash
            onClick={() => {
              removeTodo(id);
            }}
            className="mx-2"
            style={unliked}
          />
        </Row>
      </ListGroup.Item>
    </>
  );
}

TodoItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  removeTodo: PropTypes.func,
};
