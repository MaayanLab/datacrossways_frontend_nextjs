import React, {Fragment, useState, useEffect } from "react";
import { Typeahead, Highlighter } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import styles from "./autocompletecollections.module.css";

import Loading from "../Loading";


const AutocompleteCollections = ({currentCollection, options, callback }) => {
  const [selected, setSelected] = useState([true]);
  var init_collection = 0;


  for(var i=0; i<options.length; i++){
    let c = options[i];
    console.log(i, c.id, currentCollection);
    if(c.id == currentCollection){
        init_collection = i;
        break;
      }
    }


  useEffect(() => {
    callback(selected);
  }, [selected]);

  if (options.length == 0) {
    return <Loading className={styles.select}/>;
  }

  console.log(options);

  const props = {};
  props.renderMenuItemChildren = (option, { text }, index) => (
    <Fragment>
      <Highlighter search={text}>
        {option.name}
      </Highlighter>
      <div>
        <small className={styles.small}>
          ID: {option.id} | {option.owner_name}
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
      defaultSelected={options.slice(init_collection, init_collection+1)}
      labelKey="name"
      onChange={setSelected}
      options={options}
      placeholder="Choose a collection..."
    />
    </>
  );
};

export default AutocompleteCollections;
