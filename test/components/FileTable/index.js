import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function FileTable() {

    const [files, setFiles] = React.useState()

    useAsyncEffect(async (isActive) => {
        const res = await fetch('http://localhost:5000/api/listfiles')
        if (!isActive()) return
        const files = await res.json()
        if (!isActive()) return
        setFiles({ files })
    }, [])
    if (files === undefined) return <Loading />

    return (
        <div>Files</div>
    )
}

export default FileTable