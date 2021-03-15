import React from "react";
import {
  Col,
  Container,
  Row,
  Image,
  ListGroup,
  Pagination,
  Button,
  Spinner,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { UsersSearchForm } from "./UsersSearchForm";
import PropTypes from "prop-types";
import "./style.css";

export const Users = React.memo(
  ({
    users,
    pageSize,
    totalUsersCount,
    currentPage,
    isFetching,
    followedUsers,
    followingInProgress,
    setCurrentPage,
    onFilterChanged,
    onPageChanged,
    followUser,
    unfollowUser,
  }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div>
        <Container className="mt-5">
          <Row>
            <Col xs={12} lg={6}>
              <p className="text-center">Мои френды</p>
              {followedUsers[0] ? (
                <ListGroup>
                  {followedUsers.map((u) => (
                    <ListGroup.Item key={u.id}>
                      <Row>
                        <Col xs={5} lg={3}>
                          <NavLink to={"/profile/" + u.id}>
                            <Image
                              src={
                                u.photos.large ||
                                "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                              }
                              width="100px"
                              height="100px"
                              roundedCircle
                            />
                          </NavLink>
                        </Col>
                        <Col xs={7} lg={9} className="flex-column">
                          <h4>{u.name}</h4>
                          <p>{u.status || "no status"}</p>
                          <Button
                            disabled={followingInProgress.some(
                              (id) => id === u.id
                            )}
                            onClick={() => {
                              unfollowUser(u.id);
                            }}
                            variant="danger"
                            size="sm"
                          >
                            Отписаться
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <h4 className="text-center">Пока тут нет друзей...</h4>
              )}
            </Col>
            <Col xs={12} lg={6}>
              <p className="text-center">Список френдов</p>

              <ListGroup>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
                {isFetching ? (
                  <Spinner
                    className="my-3 m-auto"
                    animation="border"
                    variant="secondary"
                  />
                ) : (
                  users.map((u) => (
                    <ListGroup.Item key={u.id}>
                      <Row>
                        <Col xs={5} lg={3}>
                          <NavLink to={"/profile/" + u.id}>
                            <Image
                              src={
                                u.photos.large ||
                                "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                              }
                              width="100px"
                              height="100px"
                              roundedCircle
                            />
                          </NavLink>
                        </Col>
                        <Col xs={7} lg={9} className="flex-column">
                          <h4>{u.name}</h4>
                          <p>{u.status || "no status"}</p>
                          {u.followed ? (
                            <Button
                              disabled={followingInProgress.some(
                                (id) => id === u.id
                              )}
                              onClick={() => {
                                unfollowUser(u.id);
                              }}
                              variant="danger"
                              size="sm"
                            >
                              Отписаться
                            </Button>
                          ) : (
                            <Button
                              disabled={followingInProgress.some(
                                (id) => id === u.id
                              )}
                              onClick={() => {
                                followUser(u.id);
                              }}
                              variant="outline-primary"
                              size="sm"
                            >
                              Подписаться
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                )}

                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={pagesCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={() => {
                    onPageChanged();
                    setCurrentPage();
                  }}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);

Users.proptypes = {
  users: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  totalUsersCount: PropTypes.number,
  currentPage: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  followedUsers: PropTypes.array,
  followingInProgress: PropTypes.array,
  setCurrentPage: PropTypes.func,
  onFilterChanged: PropTypes.func,
  onPageChanged: PropTypes.func,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
};
