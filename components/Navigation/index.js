
import { NavLink, BrowserRouter as Router } from "react-router-dom";

import Link from 'next/link'
//import Button from '../Button'

import {Navbar, Container, Nav} from 'react-bootstrap'
import React, { useState, useEffect} from "react";

import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import Tooltip from '@mui/material/Tooltip';

import styles from "./navigation.module.css"
import Typography from '@mui/material/Typography';

import { Config } from '../../config/Config.js'; 

function Header() {

    const [mycreds, setMyCreds] = useState()

    useEffect(() => {
        const fetchMyCreds = async () => {
          const res = await fetch(Config["api_url"]+"/api/user/i");
          const mycred = await res.json();
          if(mycred.id){
            console.log("mycreds",mycred)  
            setMyCreds(mycred);
          }
        };
        fetchMyCreds();
      }, [])

  return (
    <Navbar>
        <Container className={styles.navcontent}>
            <Navbar.Brand href="/">
                <img
                    src="/crossroads.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Datacrossways"
                />{' '}
                DataCrossways
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {mycreds ? (<Nav.Link href="/data">Data Collections</Nav.Link>) 
                    : (<Nav.Link className={styles.isDisabled}>Data Collections</Nav.Link>)}
                    {mycreds ? (<Nav.Link href="/myfiles">My Files</Nav.Link>) 
                    : (<Nav.Link className={styles.isDisabled}>My Files</Nav.Link>)}

                    {(() => {
                        if(mycreds != undefined){
                            if(mycreds["admin"]){
                                return(
                                    <Nav.Link href="/admin">Admin</Nav.Link>
                                )
                            }
                        }
                    })()}
                </Nav>
                
                <Nav>
                    <Navbar.Text>
                        {(() => {
                            if(mycreds != undefined){
                                const t = "Hello, "+mycreds['first_name']+" "+mycreds['last_name']
                                return(
                                    <>
                                        {t}
                                        <Link href="api/user/logout">
                                            <Tooltip title="Logout">
                                            <IconButton>
                                                <LogoutIcon>Logout</LogoutIcon>
                                            </IconButton>
                                            </Tooltip>
                                        </Link>
                                    
                                    </>
                                )
                            }
                            else{
                                return(
                                    <>
                                    Login
                                    <Link href="api/user/login">
                                        <Tooltip title="Login">
                                        <IconButton>
                                           <LoginIcon>Login</LoginIcon>
                                        </IconButton>
                                        </Tooltip>
                                    </Link>
                                    </>
                                )
                            }
                        })()}
                    </Navbar.Text>
                </Nav>

            </Navbar.Collapse>
        </Container>
        </Navbar>
  );
}
export default Header;
