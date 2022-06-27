import React, {useState} from 'react'
import styles from "./alert.module.css"

export const Alert = ({ message }) => {
    const [hide, setHide] = useState(false);
    React.useEffect(() => {
        setTimeout(() => removeAlert(), 3000);
    }, [])

    function removeAlert() {
        setHide(true);
    }

    return (
        <div className={styles.popup} closed={hide ? '': undefined}>
            {message["message"]}
        </div>
    )
}

export default Alert
