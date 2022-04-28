import React, { useState, Component, useEffect } from "react";
import styles from "./fileedit.module.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";

import Loading from "../Loading";
import Autocomplete from "./../Autocomplete";

import Switch from "react-switch";

const FileEdit = ({ file }) => {
  const [visibility, setVisibility] = useState(false);
  const [access, setAccess] = useState(false);
  const [roles, setRoles] = useState(false);
  const [roleNames, setRoleNames] = useState(false);

  const [collections, setCollections] = useState([]);
  const [collectionNames, setCollectionNames] = useState([]);


  const handleName = (event) => {
    file.display_name = event.target.value;
    console.log(file)
  };

  const handleOwner = (event) => {
    file.owner_id = event.target.value;
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
    console.log(visibility);
    if(!visibility) file.visibility = "visible";
    else file.visibility = "hidden";
  };

  const handleAccess = () => {
    setAccess(!access);
    if(!access) file.accessibility = "open";
    else file.accessibility = "locked";
  };

  const handleCollectionSelect = (data) => {
    setCollections(data[0]);
    file.collection = data[0];
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await fetch("http://localhost:5000/api/listroles");
      const roles_res = await res.json();
      setRoles(roles_res);
      let short_roles = [];
      roles_res.map((role) => {
        short_roles.push(role.name);
      });
      setRolesNames(short_roles);
    };

    const fetchCollections = async () => {
      const res = await fetch("http://localhost:5000/api/listcollections");
      const collections_res = await res.json();
      setCollections(collections_res);
      let short_collections = [];
      collections_res.map((collection) => {
        short_collections.push(collection.name);
      });
      setCollectionNames(short_collections);
    };

    //fetchRoles();
    fetchCollections();
  }, []);

  return (
    <>
      <Container>
        <form className={styles.ff}>
          <Row>
            <Col>
              <label>
                Display name
                <br />
                <input
                  type="text"
                  name="field1"
                  placeholder="Display name"
                  defaultValue={file.name}
                  onChange={handleName}
                />
              </label>
            </Col>
            <Col>
              <label>
                Owner
                <br />
                <input
                  type="text"
                  name="field2"
                  placeholder="Owner"
                  defaultValue={file.owner}
                  onChange={handleOwner}
                />
              </label>
            </Col>
          </Row>

          <Row>
            <Col>
              <label>
                Collection
                <br />
                <Autocomplete options={collectionNames} callback={handleCollectionSelect}/>
                Add collection options from dropdown. Potentially allow creating
                new collection option?
              </label>
            </Col>

            <Col>
              <label>
                Visibility
                <br />
                <Switch onChange={handleVisibility} checked={visibility} />
              </label>

              <label>
                Accessibility
                <br />
                <Switch onChange={handleAccess} checked={access} />
              </label>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default FileEdit;
