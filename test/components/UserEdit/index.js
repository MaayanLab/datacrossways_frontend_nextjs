import React from "react";
import styles from "./useredit.module.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";


import { useAsyncEffect } from "use-async-effect";
import Loading from "../Loading";
import AutocompleteRoles from "../AutocompleteRoles";

const UserEdit = ({ user }) => {
  function firstnameChange(event) {
    user.first_name = event.target.value;
  }
  function lastnameChange(event) {
    user.last_name = event.target.value;
  }
  function affiliationChange(event) {
    user.affiliation = event.target.value;
  }
  function emailChange(event) {
    user.email = event.target.value;
  }
  function roleChange(selected_roles) {
    console.log("roles changed");
    console.log(selected_roles);
    //user.roles[event.target.parentNode.lastChild.innerHTML] = event.target.checked
    user.roles = selected_roles;
  }

  const [roles, setRoles] = React.useState();
  const [currentRoles, setCurrentRoles] = React.useState([]);

  useAsyncEffect(async (isActive) => {
    const res = await fetch("http://localhost:5000/api/listroles");
    if (!isActive()) return;
    const roles = await res.json();
    if (!isActive()) return;

    setRoles({ roles });
    console.log("the roles");
    console.log(roles);
    roles.map((r) => {
      console.log(r.name, user.roles, user.roles.indexOf(r.name));
      if (user.roles.indexOf(r.name) != -1) {
        currentRoles.push(r);
      }
    });
    setCurrentRoles(currentRoles);
  }, []);
  if (roles === undefined) {
    return (
      <div className={styles.loading}>
        {/* <Loading /> */}
      </div>
    );
  }

  return (
    <>
      <Container>
        <form className={styles.ff}>
          <Row>
            <Col className={styles.form_item}>
              <label>
                First name
                <br />
                <input
                  type="text"
                  name="field1"
                  placeholder="First name"
                  onChange={firstnameChange}
                  defaultValue={user.first_name}
                />
              </label>
            </Col>
            <Col className={[styles.form_item, styles.form_i2]}>
              <label>
                Last name
                <br />
                <input
                  type="text"
                  name="field2"
                  placeholder="Last name"
                  onChange={lastnameChange}
                  defaultValue={user.last_name}
                />
              </label>
            </Col>
          </Row>

          <Row>
            <Col className={[styles.form_item, styles.form_i3]}>
              <label>
                Affiliation
                <br />
                <input
                  type="text"
                  name="field3"
                  placeholder="Affiliation"
                  onChange={affiliationChange}
                  defaultValue={user.affiliation}
                />
              </label>
            </Col>

            <Col className={[styles.form_item, styles.form_i4]}>
              <label>
                E-mail (this will interfere with users OAuth)
                <br />
                <input
                  type="email"
                  name="field4"
                  placeholder="Email Address"
                  onChange={emailChange}
                  defaultValue={user.email}
                />
              </label>
            </Col>
          </Row>

          <Row>
            <Col className={[styles.form_item, styles.form_i5]}>
              <br />
              <h3>User roles</h3>

              <AutocompleteRoles
                currentRoles={currentRoles}
                options={roles.roles}
                callback={roleChange}
              />
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default UserEdit;
