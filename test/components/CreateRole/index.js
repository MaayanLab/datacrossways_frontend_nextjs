import React, { useState, useEffect } from "react";
import styles from "./createrole.module.css";
import {Container, Row, Col} from 'react-bootstrap'


const CreateRole = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Create Role</h1>
      <Container>
        <form className={styles.ff}>
            
          <Row>
            <Col className={[styles.form_item, styles.form_i1]}>
              <label>
                Role name (needs to be unique)
                <br />
                <input
                  type="text"
                  name="field1"
                  placeholder="Role name"
                  defaultValue={file.display_name}
                  onChange={handleName}
                />
              </label>
            </Col>
          </Row>

          <Row>
            <Col className={[styles.form_item, styles.form_i2]}>
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
          </Row>

          <Row>
            <Col className={[styles.form_item, styles.form_i3]}>
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
          </Row>

        </form>
      </Container>
    </div>
  );
};

export default CreateRole;
