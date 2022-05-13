import React, { Fragment, useState, useEffect } from "react";
import { Typeahead, Highlighter } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import styles from "./autocompletepolicies.module.css";

import Loading from "../Loading";

const AutocompletePolicies = ({ currentPolicies, options, callback }) => {
  
  const [selected, setSelected] = useState([]);
  let selected_policies = currentPolicies

  console.log("options", options)
  
  useEffect(() => {
    setSelected(selected_policies)
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
          ID: {option.id} | {option.effect} | {option.action}
        </small>

        Collections:
        <small className={styles.small}>
          ID: {option.id} | {option.effect} | {option.action}
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
        defaultSelected={selected_policies}
        labelKey="name"
        onChange={setSelected}
        options={options}
        placeholder="Attach roles..."
      />
    </>
  );
};

export default AutocompletePolicies;
