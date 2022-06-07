import React, { useState, useMemo, useEffect } from "react";
import { Pagination } from "./../Pagination";
import { FileList } from "./../FileList";
import { Modal } from "react-bootstrap";
import FileEdit from "./../FileEdit";
import Button from "../Button";
import Alert from '../Alert';

import axios from 'axios'
import fileDownload from 'js-file-download';
import FileSaver from 'file-saver';

import Datatable from "../Datatable";

import styles from "./filetableuser.module.css";


function FileTableUser(user) {
  const [files, setFiles] = useState([]);

  const [currentFile, setCurrentFile] = useState(1);
  var init_state = {display_name: "", owner: user["id"], collection: "", visibility: false, accessibility: false}
  const [tempFile, setTempFile] = useState(init_state);

  const [popupMessage, setPopupMessages] = useState({"message": "", "show": false})
  const [dataReload, setDataReload] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteFile, setDeleteFile] = useState();

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch("http://localhost:5000/api/user/files");
      const files = await res.json();
      for(let file of files){
        file.owner_name = user["user"]["first_name"]+" "+user["user"]["last_name"];
      }
      setFiles(files);
      setCurrentFile(files[0]);
    };
    fetchFiles();
  }, [dataReload]);

  useEffect(() => {
    const delFile = async () => {
      const options = {
        method: "DELETE"
      }
      console.log("delete file", deleteFile);
      const res = await fetch("http://localhost:5000/api/file/"+deleteFile["id"], options)
      const result = await res.json();
      setDataReload(deleteFile)

      setPopupMessages({
        message: "File deleted",
        type: "warning",
        show: true,
        id: Math.random(),
      });
      setTimeout(() => {
        setPopupMessages({
          message: "",
          type: "success",
          show: false,
          id: Math.random(),
        });
      }, 3000);
    };
    if(deleteFile){
      delFile();
    }
  }, [deleteFile])
  
  const deleteFileAction = (file) => {
    setDeleteFile(file)
  }

  const downloadFile = (file) => {
    const fetchURL = async () => {
      const res = await fetch("http://localhost:5000/api/file/download/"+file.id);
      const urlres = await res.json();
      
      // axios.get(urlres.response,{
      //   responseType: 'blob',
      //   })
      //   .then((resp) => {
      //     fileDownload(resp.data, file.display_name);
      //   });

      FileSaver.saveAs(urlres.response, file.display_name);
    
    };
    fetchURL();
  }

  const editFile = (file) => {
    tempFile.display_name = file.display_name;
    tempFile.name = file.name;
    tempFile.owner_id = file.owner_id;
    tempFile.id = file.id;
    tempFile.status = file.status;
    tempFile.uuid = file.uuid;
    tempFile.date = file.date;
    tempFile.collection_id = file.collection_id;
    tempFile.visibility = file.visibility;
    tempFile.accessibility = file.accessibility;
    tempFile.owner = user["user"]["first_name"]+" "+user["user"]["last_name"];

    setCurrentFile(file);
  };

  const updateFile = () => {

    let updated_file = tempFile;

    currentFile.display_name = tempFile.display_name;
    currentFile.owner_id = tempFile.owner_id;
    currentFile.accessibility = tempFile.owner_name;
    currentFile.collection_id = tempFile.collection_id;
    currentFile.visibility = tempFile.visibility;
    currentFile.accessibility = tempFile.accessibility;

    const options = {
      method: "PATCH",
      body: JSON.stringify(updated_file),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:5000/api/file", options)
      .then((res) => res.json())
      .then((res) => {
        setPopupMessages({
          message: "File updated",
          type: "success",
          show: true,
          id: Math.random(),
        });
        setTimeout(() => {
          setDataReload(currentFile.display_name)
          setPopupMessages({
            message: "",
            type: "success",
            show: false,
            id: Math.random(),
          });
        }, 3000);
      });

    handleClose();
  };

  return (
    <>
      {popupMessage["show"] ? <Alert message={popupMessage} /> : ""}

      <Datatable files={files} handleShow={handleShow} editFile={editFile} deleteFile={deleteFileAction} downloadFile={downloadFile}/>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-width" className={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit File Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FileEdit file={tempFile} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateFile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FileTableUser;
