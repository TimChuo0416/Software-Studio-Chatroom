import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

export const  LoadingPage = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 500); // show spinner after 500ms

    return () => clearTimeout(timer); // clear timer when component unmounts
  }, []);

  return (
    <Container className="loading-page mx-auto text-white">
      {showSpinner ? (
        <Spinner animation="border" role="status" className='spinner'>
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : null}
    </Container>
  );
};
