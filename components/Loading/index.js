import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import styles from './loading.module.css'

const Loading = () => {
    return (
        <div className={styles.spinner}>
            <div>Loading</div>
            <Spinner animation="grow" />
        </div>
    )
}

export default Loading