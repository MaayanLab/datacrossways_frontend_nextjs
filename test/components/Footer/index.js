import React from 'react';
import styles from './footer.module.css'

const Footer = ({ children, ...rest }) => {
    return (
        <Footer className={styles.f1} {...rest}>
            {children}
            <a
                href="https://labs.icahn.mssm.edu/maayanlab/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Developed by {' '}
                <span>
                    <Image src="/maayan_logo.png" alt="Maayan Laboratory" width={100} height={40} />
                </span>
            </a>
        </Footer>
    )
}

export default Footer;