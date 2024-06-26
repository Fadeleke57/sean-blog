import React from 'react';
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer1}>

    <div className={styles.footer_top}>
      <div className={styles.footer_bottom}>
        <div className={styles.container}>
          <p>
            © 2024 SIC - All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer;