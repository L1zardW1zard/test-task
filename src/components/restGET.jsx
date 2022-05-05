import React, { useEffect, useState } from "react";
import User from "./User";
import "../css/restGET.css";

const RestGET = ({ dispatch, newUserRegistered, user_id }) => {
  const count = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    newUserUpdate();
  }, [newUserRegistered, user_id]);

  const updateRestData = async () => {
    setCurrentPage(() => {
      return currentPage + 1;
    });
    setOffset(() => {
      return offset + 6;
    });
  };

  const newUserUpdate = async () => {
    setCurrentPage(1);
    setOffset(0);

    if (user_id !== null && user_id !== 0) {
      fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users/${Number(
          user_id
        )}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUsers([data.user, ...users.slice(0, -1)]);
        });
    }
  };

  const onClickHandler = async (e) => {
    updateRestData();

    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?&page=${
        currentPage + 1
      }&count=${count}&offset=${offset + 6}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers([...users, ...data.users]);
      });
  };

  useEffect(() => {
    const getUsers = async () => {
      if (offset === 0) {
        fetch(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?&page=${currentPage}&count=${count}&offset=${offset}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUsers(data.users);
            setTotalPages(data.total_pages);
          });
      }
    };
    getUsers();
  }, [count, offset, currentPage]);

  return (
    <section>
      <div className="content-get">
        <h1>Working with GET request</h1>
        <div className="user-grid">
          {users &&
            users.map((user, i) => {
              return (
                <User
                  key={i}
                  photo={user.photo}
                  userName={user.name}
                  phone={user.phone}
                  position={user.position}
                  email={user.email}
                />
              );
            })}
        </div>
        {currentPage < totalPages && (
          <button className="show-more-btn" onClick={onClickHandler}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
};

export default RestGET;
