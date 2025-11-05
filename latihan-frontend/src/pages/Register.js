import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { Form, Button, Card, Container } from "react-bootstrap";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registrasi berhasil! Silakan login.");
      // WAJIB: Arahkan ke halaman login setelah berhasil
      navigate("/login");
    } catch (err) {
      alert("Registrasi gagal. Email mungkin sudah terdaftar.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4">
        <h4 className="text-center mb-3">Register</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" className="w-100">
            Register
          </Button>
        </Form>
        {/* Bagian yang ditambahkan: Link kembali ke Login */}
        <p className="mt-3 text-center text-muted">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </Card>
    </Container>
  );
}

export default Register;