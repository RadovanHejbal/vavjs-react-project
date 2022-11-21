import SingleUser from "./SingleUser";
import AddUserForm from "./AddUserForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import classes from "./AdminUsers.module.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/get/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const removeUserHandler = (idOfUser) => {
    Axios.post("http://localhost:3001/remove/user", {
      idOfUser,
    }).then((response) => {
      setUsers((previous) => {
        return previous.filter((user) => user.id !== idOfUser);
      });
    });
  };

  const updateUsersHandler = () => {
    Axios.get("http://localhost:3001/get/users").then((response) => {
      setUsers(response.data);
    });
  }

  return (
    <div>
      <AddUserForm updateUsers={updateUsersHandler} />
      <h1>All Users</h1>
      <div className={classes.usersList}>
        {users.map((user) => {
          return (
            <SingleUser
              key={user.id}
              user={user}
              removeUser={removeUserHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsers;
