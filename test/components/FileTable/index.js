import React, { useState, useMemo, useEffect } from "react";
import { Pagination } from "./../Pagination";
import { FileList } from "./../FileList";
import { Modal } from "react-bootstrap";
import FileEdit from "./../FileEdit";
import Button from "../Button";
import Alert from '../Alert'

import Datatable from "../Datatable";


function FileTable() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100000);

  const [currentFile, setCurrentFile] = useState(1);
  var init_state = {display_name: "", owner: 1, collection: "", visibility: false, accessibility: false}
  const [tempFile, setTempFile] = useState(init_state);

  const [popupMessage, setPopupMessages] = useState({"message": "", "show": false})


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/listallfiles");
      const files = await res.json();
      setPosts(files);
      setLoading(false);
      setCurrentFile(files[1]);
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editFile = (file) => {
    console.log("Edit this please:");

    tempFile.display_name = file.display_name;
    tempFile.name = file.name;
    tempFile.owner_id = file.owner_id;
    tempFile.id = file.id;
    tempFile.status = file.status;
    tempFile.uuid = file.uuid;
    tempFile.owner_name = file.owner_name;
    tempFile.date = file.date;
    tempFile.visibility = file.visibility;
    tempFile.accessibility = file.accessibility;

    setCurrentFile(file);
    console.log(file);
  };

  const updateFile = () => {

    console.log(tempFile);
    let updated_file = tempFile;

    currentFile.display_name = tempFile.display_name;
    currentFile.owner_id = tempFile.owner;
    //currentFile.collection = tempFile.collection;
    currentFile.visibility = tempFile.visibility;
    currentFile.accessibility = tempFile.accessibility;

    const options = {
      method: "POST",
      body: JSON.stringify(updated_file),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:5000/api/updatefile", options)
      .then((res) => res.json())
      .then((res) => {
        setPopupMessages({
          message: "File updated",
          type: "success",
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
      });

    handleClose();
  };

  return (
    <>
      {popupMessage["show"] ? <Alert message={popupMessage} /> : ""}

      <Datatable files={currentPosts} handleShow={handleShow} editFile={editFile}/>

      <Modal show={show} onHide={handleClose}>
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

export default FileTable;
