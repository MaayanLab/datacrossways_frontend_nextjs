import Head from "next/head";

import React, { useState, useEffect} from "react";

import styles from "./myfiles.module.css";
import Loading from "../../components/Loading";
import FileTableUser from "../../components/FileTableUser";
import Upload from "../../components/Upload";
import UserKeys from "../../components/UserKeys";

export default function MyFiles() {

  const [mycreds, setMyCreds] = useState()
  

  useEffect(() => {
    const fetchMyCreds = async () => {
      const res = await fetch("http://localhost:5000/api/i");
      const mycred = await res.json();
      setMyCreds(mycred);
    };
    fetchMyCreds();
  }, [])
  
  if(mycreds == undefined){
    return (
      <Loading/>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Files</title>
        <meta name="description" content="Files in DataCrowssways" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        Current user: <br/>
        
        {mycreds["first_name"]} {mycreds["last_name"]} | {mycreds["email"]} | {mycreds["uuid"]}
        <br/>
        
        <h1>My Keys</h1>
        <br/>
        <div className={styles.listfiles}>
          <UserKeys user={mycreds}/>
        </div>
        
        <h1>My Files</h1>

        <div className={styles.upload}>
          <Upload/>
        </div>

        <div className={styles.listfiles}>
           <FileTableUser user={mycreds}/>
        </div>
        <br/>
      </main>
    </div>
  );
}
