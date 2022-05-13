import React, { useState, useEffect, useCallback } from "react";
import styles from "./upload.module.css";
import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";

import { ProgressBar } from "react-bootstrap";

const Upload = ({ user }) => {
  var filenames = [];
  var base_url = "http://localhost:5000/api";

  const [files, setFiles] = useState();

  const changeFileHandler = (event) => {
    setFiles(event.target.files);
  };

  const [progress, setProgress] = useState({ files: [] });
  const [bufferProgress, setBufferProgress] = useState({ files: [] });

  const add_progress = (file) => {
    var tfile = {
      name: file["name"],
      size: file["size"],
      progress: 0,
    };
    setProgress({
      files: [...progress.files, tfile],
    });
  };

  function update_progress(file, p){
    setBufferProgress({
      file: file, progress: Math.round(p),
    });
  }

  const print_progress = () => {
    console.log(progress);
  }

  useEffect(() => {
    var tfiles = [...progress.files];
    if (tfiles.length > 0) {
      for (var f of tfiles) {
        if (f["name"] == bufferProgress.file["name"]) {
          f["progress"] = Math.min(100, f["progress"]+bufferProgress.progress);
        }
      }
    }
  }, [bufferProgress]);

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
    console.log("upload chunck", chunk, file)
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

    //const resp = await axios.put(res_signed_part["url"], {
    //  body: file.slice(
    //       (chunk - 1) * chunk_size,
    //        Math.min(file.size, chunk * chunk_size)
    //     ),
    //  onUploadProgress: (p) => {
        
    //    var int_progress = (p.loaded / p.total)/(file.size/chunk_size);
    //    var chunk_progress = chunk/(file.size/chunk_size)
    //    console.log(chunk, chunk_progress,p.loaded,p.total,file.size,chunk_size);

    //    console.log("Progress", Math.round(int_progress+progress+chunk_progress) * 100);
    //    update_progress(progress, file, Math.round(int_progress+chunk_progress) * 100);
    //  }
    //});
    var nchunks = Math.round(file.size/chunk_size);
    console.log("temp progress:",nchunks)
    update_progress(file, (100/nchunks));

    var etag = await resp.headers.get("etag").replaceAll('"', "");
    return { ETag: etag, PartNumber: chunk };
  }

  // Upload Reads to Amazon S3 Bucket
  function upload_file() {
    // Get files
    //var files = $("#fileinput").prop("files");
    var oversized_files = [];
    var files_with_space = [];
    var wrong_format_files = [];
    var gb_limit = 5;

    // Check file size and filter large and invalid file names
    for (var file of files) {
      if (file.size > gb_limit * Math.pow(10, 9)) {
        oversized_files.push(
          file.name + " (" + (file.size / Math.pow(10, 9)).toFixed(2) + " GB)"
        );
      }
      if (file.name.indexOf(" ") > -1) {
        files_with_space.push(file.name);
      }
    }

    // Check if any file is oversized
    if (oversized_files.length) {
      // Alert oversized files
      alert(
        "The following files exceed " +
          gb_limit +
          "GB, which is the maximum file size supported by BioJupies. Please remove them to proceed.\n\n • " +
          oversized_files.join("\n • ") +
          "\n\nTo analyze the data, we recommend quantifying gene counts using kallisto or STAR, and uploading the generated read counts using the BioJupies table upload (https://amp.pharm.mssm.edu/biojupies/upload)."
      );
    } else if (files_with_space.length) {
      // Alert oversized files
      alert(
        "The following file(s) contain one or more spaces in their file names. This is currently not supported by the BioJupies alignment pipeline. Please rename them to proceed.\n\n • " +
          files_with_space.join("\n • ")
      );
    } else if (wrong_format_files.length) {
      // Alert wrong format files
      alert(
        "BioJupies only supports alignment of files in the .fastq.gz or .fq.gz formats. The following file(s) are stored in formats which are currently not supported. Please remove or reformat them to proceed.\n\n • " +
          wrong_format_files.join("\n • ")
      );
    } else {
      // Loop through files
      for (var file of files) {
        if (file.size < 10 * 1024 * 1024) {
          // file is small, do a direct upload without chunking
          (async () => {
            add_progress(file);
            const response = await fetch(base_url + "/upload", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ filename: file["name"] }),
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
                //update_progress(progress, file, Math.round(p.loaded / p.total) * 100);
              },
            });
            update_progress(file, 100);

          })(); // end async
        } // end small file upload
        else {
          var chunk_size = 5 * 1024 * 1024;
          var chunk_number = file.size / chunk_size;
          var chunks = range(chunk_number);

          var payload = JSON.stringify({
            filename: file["name"],
          });

          (async () => {
            add_progress(file);

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
                console.log(responseData);
                console.log("successfully uploaded");
              }); // end complete
          })(); // end async
        }
      }
    }
  }

  return (
    <>
      <h2>Upload files</h2>
      <div id="upload-wrapper">
        <button onClick={print_progress}>show progress</button>
        <form id="read-upload-form">
          <input type="hidden" name="upload" />
          <input
            id="fileinput"
            type="file"
            multiple
            onChange={changeFileHandler}
          />
          <br />
          <br />
          <button
            type="button"
            className="btn btn-lg btn-block btn-outline-primary mt-2"
            onClick={upload_file}
          >
            Upload Files
          </button>
        </form>

        <div className={styles.progress_wrapper}>
         
          {
            progress.files.map(file => {
                var lab = file.progress == 100 ? "complete" : `${file.progress}%`
                
                if(lab == "complete"){
                  return (
<>
                  <label>{file.name}</label>
                  <ProgressBar
                    variant="success"
                    className={styles.progress}
                    now={file.progress}
                    key={file.name}
                    label={lab}
                  />
                  </>
                )}
                
                return (
                  <>
                  <label>{file.name}</label>
                  <ProgressBar
                    className={styles.progress}
                    animated
                    now={file.progress}
                    key={file.name}
                    label={lab}
                  />
                  </>
                )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Upload;
