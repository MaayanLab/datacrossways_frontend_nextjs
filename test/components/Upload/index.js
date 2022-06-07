import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./upload.module.css";
import "bootstrap/dist/css/bootstrap.css";

import DropFile from "../DropFile";


import { ImageConfig } from '../../config/ImageConfig'; 

import axios from "axios";

import { ProgressBar } from "react-bootstrap";

import Alert from "../../components/Alert";

const Upload = ({ user }) => {
  
  const [files, setFiles] = useState([]);

  const [popupMessage, setPopupMessages] = useState({
    message: "",
    show: false,
  });

  const uuidgen = () => {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  }

  const onNewUpload = (newFiles) => {
    var updatedList = [...files];
    for(let newFile of newFiles){
        newFile.progress = 0;
        newFile.waiting = true;
        newFile.uploadid = uuidgen();
        updatedList = [...updatedList, newFile];
    }
    setFiles(updatedList);
  };
  
  const [down, setDown] = useState(0);

  useEffect(() => {
    console.log("look for files");
    let uploadcount = 0;
    let waiting = false;
    for(let f of files){
      if(f.uploading){
        uploadcount = uploadcount+1;
      }
      if(f.waiting){
        waiting = true;
      }
    }

    // do not add too many files into the download queue
    if(uploadcount < 1) { 
      let newfile = "";
      for(let f of files){
        if(f.waiting){
          f.waiting=false;
          f.uploading=true;
          newfile = f;
          break;
        }
      }

      if(newfile != ""){
        upload_file(newfile);
      }
    }

    // come back for more if a file is waiting, otherwise wait until files change
    if(waiting){
      setTimeout(() => setDown(down+1), 500);
    }
  }, [down, files]);

  var base_url = "http://localhost:5000/api";

  const [bufferFile, setBufferFile] = useState([]);

  function truncate(str, n) {
    return str.length > n
      ? str.substr(0, Math.round(n / 2)) +
          "..." +
          str.substr(str.length - Math.round((n - 1) / 2), str.length)
      : str;
  }

  function update_progress(file, p) {
    file.p = p;
    if(p >= 100){
      file.uploading = false;
    }
    
    setBufferFile([file]);
  }

  useEffect(() => {
    let bf = bufferFile[0];
    var tempList = [...files];
    for(let f of tempList){
      if(bf.uploadid == f.uploadid){
        f.progress = Math.min(100, Math.max(bf.p, f.progress));
        break;
      }
    }
    setFiles(tempList);
  }, [bufferFile]);

  const pAll = async (queue, concurrency) => {
    let index = 0;
    const results = [];

    // Run a pseudo-thread
    const execThread = async () => {
      while (index < queue.length) {
        const curIndex = index++;
        // Use of `curIndex` is important because `index` may change after await is resolved
        results[curIndex] = await queue[curIndex]();
      }
    };

    // Start threads
    const threads = [];
    for (let thread = 0; thread < concurrency; thread++) {
      threads.push(execThread());
    }
    await Promise.all(threads);
    return results;
  };

  function range(n) {
    const R = [];
    for (let i = 1; i < n + 1; i++) R.push(i);
    return R;
  }

  async function upload_chunk(chunk, uid, uuid, file, chunk_size) {
    var payload_part = {
      filename: uuid + "/" + file["name"],
      upload_id: uid,
      part_number: chunk,
    };
    const res_part = await fetch(base_url + "/signmultipart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload_part),
    });
    const res_signed_part = await res_part.json();

    const resp = await fetch(res_signed_part["url"], {
      method: "PUT",
      body: file.slice(
        (chunk - 1) * chunk_size,
        Math.min(file.size, chunk * chunk_size)
      ),
    });

    var nchunks = Math.round(file.size / chunk_size);

    update_progress(file, Math.round(100*chunk / nchunks));

    var etag = await resp.headers.get("etag").replaceAll('"', "");
    return { ETag: etag, PartNumber: chunk };
  }

  // Upload Reads to Amazon S3 Bucket
  function upload_file(file) {
      if (file.size < 10 * 1024 * 1024) {
        // file is small, do a direct upload without chunking
        (async () => {
          
          const response = await fetch(base_url + "/upload", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ filename: file["name"], size: file["size"] }),
          });
          
          const data = await response.json();
          var formdata = new FormData();
          for (var key in data["response"]["fields"]) {
            formdata.append(key, data["response"]["fields"][key]);
          }
          formdata.append("file", file);

          const res = await axios.request({
            method: "POST",
            url: data["response"]["url"],
            data: formdata,
            onUploadProgress: (p) => {
              update_progress(file, Math.round(p.loaded * 100 / p.total));
            },
          });
          
          file.uploading = false;
          file.completed = true;

          setPopupMessages({
            message: "File uploaded",
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
          update_progress(file, 100);
        })(); // end async
      } // end small file upload
      else {
        var chunk_size = 5 * 1024 * 1024;
        var chunk_number = file.size / chunk_size;
        var chunks = range(chunk_number);

        var payload = JSON.stringify({
          filename: file["name"],
          size: file["size"]
        });

        (async () => {
          const response = await fetch(base_url + "/startmultipart", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: payload,
          });
          const res = await response.json();

          const values = await pAll(
            chunks.map(
              (chunk) => () =>
                upload_chunk(
                  chunk,
                  res["upload_id"],
                  res["uuid"],
                  file,
                  chunk_size
                )
            ),
            4
          );

          var payload_complete = {
            filename: res["uuid"] + "/" + file["name"],
            upload_id: res["upload_id"],
            parts: values,
          };

          fetch(base_url + "/completemultipart", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload_complete),
          })
            .then((response) => response.json())
            .then((responseData) => {
              update_progress(file, 100);
              console.log("successfully uploaded");

              setPopupMessages({
                message: "File uploaded",
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
            }); // end complete
        })(); // end async
      }
  }

  const fileRemove = (file) => {
    const updatedList = [...files];
    updatedList.splice(files.indexOf(file), 1);
    setFiles(updatedList);
}

function niceBytes(bytes, decimals=2, binaryUnits=false) {
    if(bytes == 0) {
        return '0 Bytes';
    }
    var unitMultiple = (binaryUnits) ? 1024 : 1000; 
    var unitNames = (unitMultiple === 1024) ? // 1000 bytes in 1 Kilobyte (KB) or 1024 bytes for the binary version (KiB)
        ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']: 
        ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
    return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(decimals || 0)) + ' ' + unitNames[unitChanges];
}


  return (
    <>
      {popupMessage["show"] ? <Alert message={popupMessage} /> : ""}
      <h2>Upload files</h2>

      <DropFile newUpload={(files) => onNewUpload(files)} />

      {
                files.length > 0 ? (
                    <div className={styles.dropfilepreview}>
                        <p className={styles.dropfilepreview__title}>
                            Ready to upload
                        </p>
                        {
                            files.map((file, index) => (
                                <div key={index} className={styles.dropfilepreview__item}>
                                    <img src={ImageConfig[file.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className={styles.dropfilepreview__item__info}>
                                        <p>{file.name}</p>
                                        <p>{niceBytes(file.size,2)}</p>
                                    </div>
                                    <div className={styles.progress_wrapper}>
                                      <ProgressBar
                                          className={styles.progress}
                                          animated={file.progress < 100 ? true : false}
                                          variant={file.progress == 100 ? "success" : false}
                                          now={file.progress}
                                          key={file.name}
                                          label={file.progress == 100 ? "complete" : `${file.progress}%`}
                                        />
                                    </div>
                                    <span className={styles.dropfilepreview__item__del} onClick={() => fileRemove(file)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
    </>
  );
};

export default Upload;
