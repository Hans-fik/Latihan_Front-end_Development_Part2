// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as RBNavbar, Container, Nav, Button } from "react-bootstrap";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("avatarUrl");
    navigate("/login");
  };

  return (
    <RBNavbar bg="light" expand="md" className="mb-3 shadow-sm">
      <Container>
        <RBNavbar.Brand as={Link} to={token ? "/dashboard" : "/login"}>
          Latihan Frontend
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="main-nav" />
        <RBNavbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {token && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
          </Nav>

          {token && (
            <Button
              variant="outline-danger"
              size="sm"
              className="ms-auto"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}