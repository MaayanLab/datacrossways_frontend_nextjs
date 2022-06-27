import React, { Fragment, useState, useEffect } from "react";
import { Typeahead, Highlighter } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import styles from "./autocompleteowners.module.css";

import Loading from "../Loading";

const AutocompleteOwners = ({ currentOwner, options, callback }) => {
  const [selected, setSelected] = useState([true]);
  var init_owner = 0;

  for (var i = 0; i < options.length; i++) {
    let o = options[i];
    console.log(i, o.id, currentOwner);
    if (o.id == currentOwner) {
      init_owner = i;
      break;
    }
  }

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
          ID: {option.id} | {option.email}
        </small>
      </div>
    </Fragment>
  );

  return (
    <>
      <Typeahead
        clearButton
        {...props}
        className={styles.select}
        id="basic-typeahead-single"
        defaultSelected={options.slice(init_owner, init_owner + 1)}
        labelKey="name"
        onChange={setSelected}
        options={options}
        placeholder="Choose an owner..."
      />
    </>
  );
};

export default AutocompleteOwners;
