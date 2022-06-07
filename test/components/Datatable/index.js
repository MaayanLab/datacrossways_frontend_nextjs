import DataTable from "react-data-table-component";
import styles from "./datatable.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


// https://github.com/jbetancur/react-data-table-component/blob/master/src/DataTable/styles.ts
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

function Datatable({ files, handleShow, editFile, deleteFile, downloadFile }) {

    const columns = [
        {
          name: "ID",
          sortable: true,
          selector: (row) => row.id,
          maxWidth: "20px",
        },
        {
          name: "Display Name",
          sortable: true,
          selector: (row) => {
            return(
              <span className={styles.link}
                  onClick={() => {
                      downloadFile(row);
                  }}>
                  {row.display_name}
              </span>
            )
          }
        },
        {
          name: "UUID",
          sortable: true,
          selector: (row) => row.uuid,
          maxWidth: "140px",
        },
        {
          name: "Owner",
          sortable: true,
          selector: (row) => row.owner_name,
        },
        {
          name: "status",
          sortable: true,
          selector: (row) => row.status,
          maxWidth: "120px",
        },
        {
          name: "Visibility",
          sortable: true,
          selector: (row) => {
            if(row.visibility == "hidden"){
              return (<FontAwesomeIcon className={styles.aiconred} icon={faEyeSlash} />)
            }
            else{
              return (<FontAwesomeIcon className={styles.aicongreen} icon={faEye} />)
            }
          },
          maxWidth: "20px",
        },
        {
          name: "Access",
          sortable: true,
          selector: (row) => {
            if(row.accessibility == "locked"){
              return (<FontAwesomeIcon className={styles.aiconred} icon={faLock} />)
            }
            else{
              return (<FontAwesomeIcon className={styles.aicongreen} icon={faLockOpen} />)
            }
          },
          maxWidth: "20px",
        },
        {
          name: "Date",
          sortable: true,
          selector: (row) => row.date,
          maxWidth: "260px",
        },
        {
          name: "Edit",
          sortable: false,
          maxWidth: "140px",
          selector: (row) => (
            <div>
              <button
                onClick={() => {
                  deleteFile(row);
                }}
              >
                X
              </button>
                  | 
              <button
                onClick={() => {
                  editFile(row);
                  handleShow();
                }}
              >
                Edit File
              </button>
            </div>
          ),
        },
      ];

  return (
    <div className={styles.tablewrap}>
      <DataTable
        className={styles.table}
        striped
        columns={columns}
        data={files}
        customStyles={customStyles}
        pagination
        defaultSortField="ID"
      />
    </div>
  );
}

export default Datatable;
