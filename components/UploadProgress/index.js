import React, { Component } from 'react'

const DropFile = ({ fileList }) => {
  

    return (
        <>Progress
        
        
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
        
        </>
    )
}


export default UploadProgress;