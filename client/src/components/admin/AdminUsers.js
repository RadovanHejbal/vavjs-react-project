import SingleUser from "./SingleUser";
import AddUserForm from "./AddUserForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import classes from "./AdminUsers.module.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/get/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  const removeUserHandler = (idOfUser) => {
    Axios.post("/remove/user", {
      idOfUser,
    }).then((response) => {
      setUsers(users.filter((user) => user.id !== idOfUser));
    });
  };

  const updateUsersHandler = () => {
    Axios.get("/get/users").then((response) => {
      setUsers(response.data);
    });
  }

  const importUsersHandler = () => {
    Axios.post("/import/users", {}).then((response) => {
      console.log(response);
    })
  }

  const exportUsersHandler = () => {
      Axios.post("/export/users", {}).then((response) => {
        console.log(response);
      })
  }

  return (
    <div className="container">
      <AddUserForm updateUsers={updateUsersHandler} />
      <h1>All Users</h1>
      <div>
        <button onClick={importUsersHandler}>Import - nefunguje</button>
        <button onClick={exportUsersHandler}>Export</button>
      </div>
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
