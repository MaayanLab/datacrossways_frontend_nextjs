import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Router from 'next/router'
import React, {useState} from 'react';
import Link from 'next/link';
import { useAsyncEffect } from "use-async-effect";
import Accordion from 'react-bootstrap/Accordion'

import UserTable from '../../components/UserTable'
import UserEdit from '../../components/UserEdit'
import Loading from '../../components/Loading';
import Alert from '../../components/Alert'
import FileTable from '../../components/FileTable';

export default function AdminView() {
    let init_state = {"message": "Admin mode", "type": "success"}
    const [popupMessage, setPopupMessages] = React.useState(init_state)
    const [users, setUsers] = React.useState()
    useAsyncEffect(async (isActive) => {
        const res = await fetch('http://localhost:5000/api/listusers')
        if (!isActive()) return
        const users = await res.json()
        if (!isActive()) return
        setUsers({ users })
    }, [])
    if (users === undefined) return <Loading />

    if ("error" in users["users"]) {
        return (
            <>
                <div>You need to be admin to use this page.</div>
                <Link href="\signin">Go back</Link>
            </>
        )
    }
    else {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Admin</title>
                    <meta name="description" content="Do what you want!" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1>You are admin and logged in successfully, here are some things you can do</h1>

                <ul>
                    <li key="1">List users</li>
                    <li key="2">Create User</li>
                    <li key="3">List files</li>
                    <li key="4">Modify User Roles</li>
                    <li key="5">Create New Roles</li>
                    <li key="6">Create Projects</li>
                </ul >
                <hr />
                <Alert message={popupMessage}/>

                <Accordion defaultActiveKey="1" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h3>Users in Database</h3></Accordion.Header>
                        <Accordion.Body>
                            <UserTable users={users["users"]} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header><h3>Files</h3></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <FileTable/>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

            </div >
        )
    }
}