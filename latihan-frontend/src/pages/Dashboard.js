// src/pages/Dashboard.js
import React from "react";
import { Table, Button, Image } from "react-bootstrap";
import api from "../api/api";
import FormModal from "../components/FormModal";

function Dashboard() {
  const [items, setItems] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

  const [form, setForm] = React.useState({ title: "", description: "" });
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState("");
  const [currentImageUrl, setCurrentImageUrl] = React.useState("");

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setForm({ title: "", description: "" });
    setFile(null);
    setPreview("");
    setCurrentImageUrl("");
  };

  const handleShowAdd = () => {
    setShow(true);
  };

  const fetchItems = async () => {
    try {
      const res = await api.get("/items"); // GET /api/items (JWT via interceptor)
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Gagal memuat data");
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (it) => {
    setEditId(it.id);
    setForm({ title: it.title, description: it.description });
    setCurrentImageUrl(it.image_url || "");
    setShow(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus data?")) return;
    try {
      await api.delete(`/items/${id}`); // DELETE /api/items/:id
      fetchItems();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Gagal menghapus data");
    }
  };

  const handleSave = async () => {
    try {
      if (!form.title || !form.description) {
        alert("Lengkapi judul & deskripsi!");
        return;
      }

      // Kirim sebagai multipart/form-data
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      if (file) fd.append("file", file); // opsional

      if (editId) {
        await api.put(`/items/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/items", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchItems();
      handleClose();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Gagal menyimpan data");
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Dashboard</h4>
        <Button onClick={handleShowAdd}>Tambah</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: 80 }}>Gambar</th>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th style={{ width: 160 }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>
                {it.image_url ? (
                  <Image src={it.image_url} width={56} height={56} rounded />
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>
              <td>{it.title}</td>
              <td>{it.description}</td>
              <td className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEdit(it)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(it.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                Belum ada data.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <FormModal
        show={show}
        onHide={handleClose}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        isEditing={!!editId}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        currentImageUrl={currentImageUrl}
      />
    </div>
  );
}

export default Dashboard;