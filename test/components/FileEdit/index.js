import React, { useState, Component, useEffect } from "react";
import styles from "./fileedit.module.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";

import Loading from "../Loading";
import AutocompleteCollections from "../AutocompleteCollections";
import AutocompleteOwners from "../AutocompleteOwners";
import AutocompleteRoles from "../AutocompleteRoles";

import Switch from "react-switch";

const FileEdit = ({ file }) => {

  var init_state = (file.visibility==="hidden") ? false : true;
  const [visibility, setVisibility] = useState(init_state);
  
  var init_state = (file.accessibility==="locked") ? false : true;
  const [access, setAccess] = useState(init_state);

  const [owners, setOwners] = useState([]);
  const [collections, setCollections] = useState([]);

  const handleName = (event) => {
    file.display_name = event.target.value;
    console.log(file)
  };

  const handleVisibility = (e) => {
    setVisibility(e);
    file.visibility = (e) ? 'visible' : 'hidden';
  };

  const handleAccess = (e) => {
    setAccess(e);
    file.accessibility = (e) ? 'open' : 'locked';
  };

  const handleOwnerSelect = (data) => {
    if(data.length > 0 && data[0] != true){
      file.owner_id = data[0].id;
    }
  };

  const handleCollectionSelect = (data) => {
    if(data.length > 0 && data[0] != true){
      file.collection_id = data[0].id;
    }
  };

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await fetch("http://localhost:5000/api/listcollections");
      setCollections(await res.json());
    };

    const fetchOwners = async () => {
      const res = await fetch("http://localhost:5000/api/listusers");
      setOwners(await res.json());
    };

    fetchCollections();
    fetchOwners();
  }, []);

  return (
    <>
      <Container>
        <form className={styles.ff}>
          <Row>
            <Col className={[styles.form_item, styles.form_i1]}>
              <label>
                Display name
                <br />
                <input
                  type="text"
                  name="field1"
                  placeholder="Display name"
                  defaultValue={file.display_name}
                  onChange={handleName}
                />
              </label>
            </Col>
            <Col className={[styles.form_item, styles.form_i2]}>
              <label>
                Owner
                <br/>
                <AutocompleteOwners currentOwner={file.owner_id} options={owners} callback={handleOwnerSelect}/>
              </label>
            </Col>
          </Row>

          <Row>
            <Col className={[styles.form_item, styles.form_i3]}>
              <label>
                Collection
                <br />
                <AutocompleteCollections currentCollection={file.collection_id} options={collections} callback={handleCollectionSelect}/>
              </label>
            </Col>
          </Row>
          <Row>
            <Col className={[styles.form_item, styles.form_i4]}>
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
