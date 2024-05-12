import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from './footer.module.css'; // Import CSS module

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <a href="https://x.com/SignyHands" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
        <FontAwesomeIcon icon={faTwitter} className={styles.footerIcon} />
        Contact Us
      </a>
    </div>
  )
}

export default Footer;
