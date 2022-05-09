import styles from "./usertable.module.css";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import Button from "../Button";
import Alert from "../Alert";

import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import UserEdit from "./../UserEdit/index";
import DatatableUsers from "./../DatatableUsers";
import Loading from "./../Loading";

const UserTable = () => {
  var init_state = {
    first_name: "",
    last_name: "",
    affiliation: "",
    email: "",
    roles: {},
  };
  const [mystate, setMystate] = useState(init_state);

  let alert_state = { message: "Admin", type: "approved", show: false };
  const [popupMessage, setPopupMessages] = React.useState(alert_state);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

  const [tempUser, setTempUser] = useState({});

  const [dataReload, setDataReload] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/api/listusers");
      const users = await res.json();
      setUsers(users);
      setUser(users[0]);
    };
    fetchUsers();
  }, []);

  const editUser = (user) => {
    console.log("Edit this please:");

    tempUser.id = user.id;
    tempUser.first_name = user.first_name;
    tempUser.last_name = user.last_name;
    tempUser.affiliation = user.affiliation;
    tempUser.email = user.email;
    tempUser.roles = user.roles;
    console.log(tempUser);
    setUser(user);
  };

  function updateUser() {
    user.first_name = tempUser.first_name;
    user.last_name = tempUser.last_name;
    user.affiliation = tempUser.affiliation;
    user.email = tempUser.email;
    user.roles = tempUser.roles;

    var updated_user = {};
    updated_user["id"] = user.id;
    updated_user["first_name"] = user.first_name;
    updated_user["last_name"] = user.last_name;
    updated_user["affiliation"] = user.affiliation;
    updated_user["email"] = user.email;
    updated_user["roles"] = user.roles;

    const options = {
      method: "POST",
      body: JSON.stringify(updated_user),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:5000/api/updateuser", options)
      .then((res) => res.json())
      .then((res) => {
        user.roles = [];
        tempUser.roles = [];
        updated_user.roles.map((r)=> {
          user.roles.push(r.name);
          tempUser.roles.push(r.name);
        })
        setPopupMessages({
          message: "User updated",
          type: "success",
          show: true,
          id: Math.random(),
        });
        setTimeout(() => {
          setPopupMessages({
            message: "",
            type: "success",
            show: false,
            id: Math.random(),
          });
        }, 3000);
      });

    handleClose();
  }

  if (users === undefined) return <Loading />;

  return (
    <div>
      {popupMessage["show"] ? <Alert message={popupMessage} /> : ""}
      
      <DatatableUsers
        users={users}
        handleShow={handleShow}
        editUser={editUser}
      />

      <Modal show={show} onHide={handleClose} className={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserEdit user={tempUser}></UserEdit>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
