 
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './dropfile.module.css';

import { ImageConfig } from '../../config/ImageConfig'; 
import uploadImg from '../../public/dropfile/cloud-upload-regular-240.png';

const DropFile = ({ newUpload }) => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFiles = e.target.files;
        if (newFiles) {
            var updatedList = [...fileList];
            var newList = []
            for(let newFile of newFiles){
                newFile.progress = 0;
                newFile.waiting = true;
                //updatedList = [...updatedList, newFile];
                newList = [...newList, newFile]
            }
            setFileList(updatedList);
            newUpload(newList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }
    
    function niceBytes(bytes, decimals=2, binaryUnits=false) {
        if(bytes == 0) {
            return '0 Bytes';
        }
        var unitMultiple = (binaryUnits) ? 1024 : 1000; 
        var unitNames = (unitMultiple === 1024) ? // 1000 bytes in 1 Kilobyte (KB) or 1024 bytes for the binary version (KiB)
            ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']: 
            ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
        return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(decimals || 0)) + ' ' + unitNames[unitChanges];
    }

    return (
        <div className={styles.dropwrapper}>
            <div
                ref={wrapperRef}
                className={styles.dropfileinput}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className={styles.dropfileinput__label}>
                    <img src={"dropfile/cloud-upload-regular-240.png"} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input multiple type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className={styles.dropfilepreview}>
                        <p className={styles.dropfilepreview__title}>
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className={styles.dropfilepreview__item}>
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className={styles.dropfilepreview__item__info}>
                                        <p>{item.name}</p>
                                        <p>{niceBytes(item.size,2)}</p>
                                    </div>
                                    <span className={styles.dropfilepreview__item__del} onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    );
}

export default DropFile;