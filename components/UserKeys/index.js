import React, { useState, useEffect, useCallback, useRef} from "react";
import styles from "./userkeys.module.css";
import "bootstrap/dist/css/bootstrap.css";

import DataTable from "react-data-table-component";
import axios from "axios";

import Alert from "../../components/Alert";

import { Config } from '../../config/Config.js'; 

const customStyles = {
    head: {
      style: {
        color: "white",
        fontSize: "16px",
        fontWeight: 400,
      },
    },
    headRow: {
      style: {
        backgroundColor: "#8a2be2",
        minHeight: "40px",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      },
    },
    rows: {
      style: {
        fontSize: "12px",
        fontWeight: 400,
        color: "black",
        minHeight: "30px",
        "&:not(:last-of-type)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "lightgrey",
        },
        "&:hover": {
          backgroundColor: "#fceafc",
          cursor: "pointer",
        },
      },
    },
  };

const UserKeys = ({ user }) => {

    const [mykeys, setMyKeys] = useState();
    const [expirationTime, setexpirationTime] = useState(1440);

    const fetchKeys = async () => {
        const res = await fetch(Config["api_url"]+"/api/user/accesskey");
        const key_res = await res.json();
        setMyKeys(key_res);
    };

    const deleteKey = (keyinfo) => {
        const delKey = async () => {
            const res = await fetch(Config["api_url"]+"/api/user/accesskey/"+keyinfo["id"], {'method': 'DELETE'});
            fetchKeys();
        };
        delKey();
    }

    useEffect(() => {
        fetchKeys();
    }, [])
    
    const columns = [
        {
          name: "ID",
          sortable: true,
          selector: (row) => row.id,
          maxWidth: "30px",
          minWidth: "80px",
        },
        {
            name: "Remaining",
            sortable: true,
            minWidth: "60px",
            selector: (row) => {
                var key_date = new Date(row.creation_date);
                var diffMs = (key_date - new Date() + row.expiration_time*1000*60); // milliseconds
                if (diffMs < 0) return "expired";

                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                var temp2 = diffDays + " days, " + diffHrs + " h, " + diffMins + " min";
                return temp2
            }
        },
        {
            name: "Key",
            sortable: true,
            selector: (row) => row.uuid,
            minWidth: "280px",
        },
        {
          name: "Created",
          sortable: true,
          minWidth: "220px",
          selector: (row) => row.creation_date,
        },
        {
          name: "Expires",
          sortable: true,
          minWidth: "30px",
          selector: (row) => row.expiration_time+" min",
        },
        {
            name: "Delete",
            maxWidth: "70px",
            selector: (row) => (
                <button
                  onClick={() => {
                    deleteKey(row);
                  }}
                >
                  X
                </button>
            ),
        },
    ]

    const create_access_key = () => {
        const createKey = async () => {
            const res = await fetch(Config["api_url"]+"/api/user/accesskey/"+expirationTime, {'method': 'POST'});
            fetchKeys();
        };
        createKey();
    }

    useEffect(() => {
        fetchKeys();
    }, [])
    
    useEffect(() => {
      console.log(mykeys);
    }, [mykeys])
    
    return(
        <>
        <div>
            <button onClick={create_access_key}>Create key</button>
        </div>
        <div className={styles.tablewrapper}>
            List of keys    
            <DataTable        
                className={styles.table}
                striped
                columns={columns}
                data={mykeys}
                customStyles={customStyles}
                pagination
                defaultSortField="ID"
            />
        </div> 
        
        </>
    )
}

export default UserKeys;
