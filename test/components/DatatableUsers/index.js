import DataTable from "react-data-table-component";
import styles from "./datatableusers.module.css";

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

function DatatableUsers({ users, handleShow, editUser }) {

    const columns = [
        {
          name: "ID",
          sortable: true,
          selector: (row) => row.id,
          maxWidth: "20px",
        },
        {
          name: "First Name",
          sortable: true,
          selector: (row) => row.first_name,
        },
        {
          name: "Last Name",
          sortable: true,
          selector: (row) => row.last_name,
        },
        {
          name: "UUID",
          sortable: true,
          selector: (row) => row.uuid,
          maxWidth: "140px",
        },
        {
          name: "E-mail",
          sortable: true,
          selector: (row) => row.uuid,
          maxWidth: "140px",
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
          maxWidth: "110px",
          selector: (row) => (
            <div>
              <button
                onClick={() => {
                  editUser(row);
                  handleShow();
                }}
              >
                Edit User
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
        data={users}
        customStyles={customStyles}
        pagination
        defaultSortField="ID"
      />
    </div>
  );
}

export default DatatableUsers;
