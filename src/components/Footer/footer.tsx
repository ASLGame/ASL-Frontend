import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; // Corrected icon import

const Footer = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '50px',
      padding: '10px 20px',
      background: '#f0f0f0',
      borderTop: '1px solid #e1e1e1'
    }}>
      
      <a href="https://x.com/SignyHands" target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2', display: 'flex', alignItems: 'center', height: '40px'}}>
        <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '5px' }} />
        Contact Us
      </a>
    </div>
  )
}

export default Footer
