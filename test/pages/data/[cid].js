import React from "react";
import {useEffect, useState} from 'react'


import Link from '@mui/material/Link';
import { useRouter } from 'next/router'
import Navigation from "../../components/Navigation";
import FeatureTable from "../../components/FeatureTable";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import styles from "./data.module.css"

import { Config } from '../../config/Config.js'; 

const CollectionView = () => {
  const router = useRouter()
  const { cid } = router.query
  const [collection, setCollection] = useState([]);

  const [mycreds, setMyCreds] = useState()
  useEffect(() => {
    const fetchMyCreds = async () => {
        const res = await fetch(Config["api_url"]+"/api/i");
        const mycred = await res.json();
        if(mycred.id){
        console.log("mycreds",mycred)
        setMyCreds(mycred);
        }
    };
    fetchMyCreds();
    }, [])

  useEffect(() => {
    console.log("weird")
    console.log(mycreds)
    console.log(cid)
    const fetchData = async () => {
      console.log("extra weird");
      const res = await fetch(Config["api_url"]+"/api/collection/"+cid);
      const col= await res.json();
      setCollection([col]);
    };
    if(mycreds && cid){
        fetchData();
    }
  }, [mycreds, cid]);

  return(
    <>
        <div>
            <Navigation />
            <h1>Collection</h1>
        </div>
        
        {cid && mycreds ? (
          <Breadcrumbs aria-label="breadcrumb">
          {
          collection.map((col) => (
            col["path"].map((p, i, {length}) => 
                (length - 1 === i ?
                    (
                        <Typography color="text.primary">
                            <span className={styles.pathname}>{p.name}</span>
                        </Typography>
                    )
                :
                (
                    <Link underline="hover" color="inherit" href={"/data/"+p.id}>
                        <span className={styles.pathname}>{p.name}</span>
                    </Link>
                )
                )
            )))
          }
          </Breadcrumbs>
        ) : null
        }
        
        {cid && mycreds && collection.length > 0 ? (<FeatureTable collection={collection} cid={cid}/>) : "Log in to view data"}
    </>
  )
}

export default CollectionView