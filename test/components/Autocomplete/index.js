import React, { useState, useEffect } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './autocomplete.module.css'

import Loading from './../Loading';

const Autocomplete = ({ options, callback }) => {
    
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    callback(selected);
  }, [selected]);


  if(options.length == 0){
    return(<Loading/>)
  }

  return (

      <Typeahead className={styles.select}
        id="basic-typeahead-single"
        defaultSelected={options.slice(0, 1)}
        labelKey="name"
        onChange={setSelected}
        options={options}
        placeholder="Choose a collection..."
        selected={selected}
      />
  );
  
};

export default Autocomplete;