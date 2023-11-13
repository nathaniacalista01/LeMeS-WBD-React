// src/components/NotFound.tsx

import React from 'react';

const NotFound: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '16px',
    color: '#333',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '24px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s',
  };

  const handleBackToHomepage = () => {
    // Ganti dengan logika navigasi kembali ke homepage
    console.log('Navigasi kembali ke homepage');
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404 - Not Found</h1>
      <p style={paragraphStyle}>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <button style={buttonStyle} onClick={handleBackToHomepage}>
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
