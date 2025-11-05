import React from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";

const FormModal = ({
  show, onHide,
  form, setForm,
  onSave, isEditing,
  file, setFile,
  preview, setPreview,
  currentImageUrl // url gambar lama (untuk edit)
}) => {
  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(f.type)) return alert("Tipe file harus JPG/PNG/WEBP");
    if (f.size > 3 * 1024 * 1024) return alert("Maksimal 3MB");

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onSubmit = (e) => { e.preventDefault(); onSave(); };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Data" : "Tambah Data"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Judul</Form.Label>
            <Form.Control
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Masukkan judul" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Masukkan deskripsi" required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Gambar (opsional)</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={onPick} />
          </Form.Group>

          {(preview || currentImageUrl) && (
            <div className="d-flex gap-3 align-items-center mb-3">
              {currentImageUrl && !preview && (
                <div>
                  <div className="text-muted small mb-1">Gambar saat ini</div>
                  <Image src={currentImageUrl} width={96} height={96} rounded />
                </div>
              )}
              {preview && (
                <div>
                  <div className="text-muted small mb-1">Preview baru</div>
                  <Image src={preview} width={96} height={96} rounded />
                </div>
              )}
            </div>
          )}

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default FormModal;