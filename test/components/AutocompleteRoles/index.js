import React, { Fragment, useState, useEffect } from "react";
import { Typeahead, Highlighter } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import styles from "./autocompleteroles.module.css";

import Loading from "../Loading";

const AutocompleteRoles = ({ currentRoles, options, callback }) => {
  
  const [selected, setSelected] = useState([]);
  let selected_roles = currentRoles

  console.log("options", options)
  
  useEffect(() => {
    setSelected(selected_roles)
  }, []);

  useEffect(() => {
    callback(selected);
  }, [selected]);
  

  if (options.length == 0) {
    return <Loading className={styles.select} />;
  }

  const props = {};
  props.renderMenuItemChildren = (option, { text }, index) => (
    <Fragment>
      <Highlighter search={text}>{option.name}</Highlighter>
      <div>
        <small className={styles.small}>
          ID: {option.id} | {option.name}
        </small>
      </div>
    </Fragment>
  );

  return (
    <>
      <Typeahead
        clearButton
        multiple
        {...props}
        className={styles.select}
        id="basic-typeahead-roles"
        defaultSelected={selected_roles}
        labelKey="name"
        onChange={setSelected}
        options={options}
        placeholder="Attach roles..."
      />
    </>
  );
};

export default AutocompleteRoles;
