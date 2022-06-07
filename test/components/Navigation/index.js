
import { NavLink, BrowserRouter as Router } from "react-router-dom";

import Link from 'next/link'
import Button from '../Button'

import {Navbar, Container, Nav} from 'react-bootstrap'
import React, { useState, useEffect} from "react";

import styles from "./navigation.module.css"

function Header() {

    const [mycreds, setMyCreds] = useState()

    useEffect(() => {
        const fetchMyCreds = async () => {
          const res = await fetch("http://localhost:5000/api/i");
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
                    <Nav.Link href="/data">Data Collections</Nav.Link>
                    <Nav.Link href="/myfiles">My Files</Nav.Link>
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
                                    <Link href="/logout"><button>Logout</button></Link>
                                    </>
                                )
                            }
                            else{
                                return(
                                    <Link href="/login"><Button>Login</Button></Link>
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
