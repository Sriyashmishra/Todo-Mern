import React from 'react';
import "./Footer.css";

const Footer = () => {
  // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer container-fluid">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Branding Section */}
        <div className="footer-brand">
          <h5 className="m-0"><b>TODO</b></h5>
          <p className="m-0 text-muted">&copy; <b>sriyashmishra</b></p>
        </div>

        {/* Professional Signature */}
        <div className="footer-links d-none d-md-block">
          <span className="text-muted">Built with 💚 by <b>Sriyash Mishra</b></span>
        </div>

        {/* Back to Top - Corrected from <a> to <button> */}
        <div className="footer-top">
          <button 
            onClick={scrollToTop} 
            className="btn btn-link text-decoration-none text-dark fw-bold p-0 border-0"
            style={{ cursor: 'pointer' }}
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;