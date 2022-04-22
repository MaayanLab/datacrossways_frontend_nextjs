import React from 'react';
import styles from './useredit.module.css'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.css';

import { useAsyncEffect } from "use-async-effect";
import Loading from '../Loading';


const UserEdit = ({formstate, user }) => {

    function firstnameChange(event){
        formstate.firstname = event.target.value
    }
    function lastnameChange(event){
        formstate.lastname = event.target.value
    }
    function affiliationChange(event){
        formstate.affiliation = event.target.value
    }
    function emailChange(event){
        formstate.email = event.target.value
    }
    function roleChange(event){
        formstate.roles[event.target.parentNode.lastChild.innerHTML] = event.target.checked
    }

    if (formstate) {
        formstate.firstname = user.first_name
        formstate.lastname = user.last_name
        formstate.affiliation = (user.affiliation === undefined) ? "" : user.affiliation
        formstate.email = user.email
    }

    const [roles, setRoles] = React.useState()
    useAsyncEffect(async (isActive) => {
        const res = await fetch('http://localhost:5000/api/listroles')
        if (!isActive()) return
        const roles = await res.json()
        if (!isActive()) return
        setRoles({ roles })
    }, [])
    if (roles === undefined) return <Loading/>
    return (
        <>
            <Container>
                <form className={styles.ff}>
                    <Row>
                        <Col>
                            <label>First name<br />
                                <input type="text" name="field1" placeholder="First name" onChange={firstnameChange} defaultValue={user.first_name} />
                            </label>
                        </Col>
                        <Col>
                            <label>Last name<br />
                                <input type="text" name="field2" placeholder="Last name" onChange={lastnameChange} defaultValue={user.last_name} />
                            </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label>Affiliation<br />
                                <input type="text" name="field3" placeholder="Affiliation"  onChange={affiliationChange} defaultValue={user.affiliation} />
                            </label>
                        </Col>

                        <Col>
                            <label>E-mail (this will interfere with users OAuth)<br />
                                <input type="email" name="field4" placeholder="Email Address" onChange={emailChange} defaultValue={user.email} />
                            </label>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <br />
                            <h3>User roles</h3>
                            {
                                roles.roles.map((role) => {
                                    var temp = false
                                    user.roles.map((urole) => {
                                        if (urole === role.name) {
                                            temp = true
                                        }
                                    })

                                    if (temp) {
                                        if(formstate) formstate.roles[role.name] = true
                                        return (
                                            <>
                                                <Form.Check
                                                    onChange={roleChange}
                                                    className={styles.check}
                                                    type="checkbox"
                                                    label={role.name}
                                                    defaultChecked
                                                />
                                            </>
                                        )
                                    }
                                    else {
                                        if(formstate) formstate.roles[role.name] = false
                                        return (
                                            <>
                                                <Form.Check
                                                    onChange={roleChange}
                                                    className={styles.check}
                                                    type="checkbox"
                                                    label={role.name}
                                                />
                                            </>
                                        )
                                    }
                                })
                            }

                        </Col>
                    </Row>
                </form>
            </Container>
        </>
    )
}

export default UserEdit;