import Head from "next/head";

import React, { useState, useEffect} from "react";
import { Redirect, Route } from 'react-router-dom'

import styles from "./myfiles.module.css";
import Loading from "../../components/Loading";
import FileTableUser from "../../components/FileTableUser";
import Upload from "../../components/Upload";
import UserKeys from "../../components/UserKeys";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";

import { Config } from '../../config/Config.js'; 

export default function MyFiles() {

  const [mycreds, setMyCreds] = useState()
  
  useEffect(() => {
    const fetchMyCreds = async () => {
      const res = await fetch(Config["api_url"]+"/api/i");
      const mycred = await res.json();
      if(mycred.id){
        setMyCreds(mycred);
      }
      else{
        window.location.href = Config["api_url"]+"/login";
      }
    };
    fetchMyCreds();
  }, [])

  const oncomplete = () => {
    let cred = {};
    cred.email = mycreds.email;
    cred.first_name = mycreds.first_name;
    cred.last_name = mycreds.last_name;
    cred.id = mycreds.id;
    cred.uuid = mycreds.uuid;
    cred.new = 1;
    setMyCreds(cred);
  }
  
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
        <Navigation/>
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
          <Upload oncomplete={oncomplete}/>
        </div>

        <div className={styles.listfiles}>
           <FileTableUser user={mycreds}/>
        </div>
        <br/>
      </main>
    </div>
  );
}
