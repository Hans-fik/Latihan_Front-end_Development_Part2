// src/pages/NotFound.js
import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p className="lead">Maaf, halaman yang Anda cari tidak ada.</p>
      <Button
        as={Link}
        to="/dashboard"
        variant="primary"
        className="mt-3 rounded-pill"
      >
        Kembali ke Dashboard
      </Button>
    </Container>
  );
};

export default NotFound;