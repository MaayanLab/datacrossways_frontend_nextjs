import styles from './usertable.module.css'
import EditButton from '../EditButton'
import DeleteButton from '../DeleteButton'
import Button from '../Button'
import Alert from '../Alert'

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import UserEdit from './../UserEdit/index';

const UserTable = ({ users }) => {
    var init_state = {firstname: "", lastname: "", affiliation: "", email: "", roles: {}}
    const [mystate, setMystate] = useState(init_state);

    let alert_state = {"message": "Admin", "type": "approved", "show": false}
    const [popupMessage, setPopupMessages] = React.useState(alert_state)

    const [user, setUser] = useState(users[0]);
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function edituser(){
        user.first_name = mystate.firstname
        user.last_name = mystate.lastname
        user.affiliation = mystate.affiliation
        user.email = mystate.email
        user.newroles = mystate.roles
        
        user.roles = []
        for(let r in mystate.roles){
            if(mystate.roles[r]){
                user.roles.push(r)
            }
        }

        var updated_user = {}
        updated_user["id"] = user.id
        updated_user["first_name"] = user.first_name 
        updated_user["last_name"] = user.last_name 
        updated_user["affiliation"] = user.affiliation 
        updated_user["email"] = user.email
        updated_user["roles"] = user.newroles
        
        const options = {
            method: 'POST',
            body: JSON.stringify(updated_user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch("http://localhost:5000/api/updateuser", options)
            .then(res => res.json())
            .then(res => {
                setPopupMessages({"message": "User updated", "type": "success", "show": true, "id": Math.random()})
                setTimeout(() => {setPopupMessages({"message": "", "type": "success", "show": false, "id": Math.random()})}, 3000);
            });

        handleClose()
    }
    
    return (
        <div>
            {
                popupMessage["show"] ? (<Alert message={popupMessage}/>) : ''
            }
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>E-mail</th>
                        <th>UUID</th>
                        <th>Files</th>
                        <th>Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((u) => (
                        <tr>
                            <td>{u.id}</td>
                            <td>{u.first_name}</td>
                            <td>{u.last_name}</td>
                            <td>{u.email}</td>
                            <td>{u.uuid}</td>
                            <td>{u.files.length}</td>
                            <td>{u.date}</td>
                            <td><EditButton onClick={() => { 
                                setUser(u)
                                handleShow()
                                }} user={u}>Edit</EditButton> | <DeleteButton>Delete</DeleteButton></td>
                        </tr>
                    ))
                    }

                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body><UserEdit formstate={mystate} user={user}></UserEdit></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={edituser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserTable