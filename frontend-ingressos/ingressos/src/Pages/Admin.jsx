import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container, Spinner } from "react-bootstrap";


function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventAtual, setEventAtual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    price: "",
    image: "",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (user.isAdmin === true) {
      loadEvents();
    }
  },);

  const loadEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/eventos", config);
      setEvents(res.data);
    } catch (err) {
      console.error("Erro ao carregar eventos:", err);
      if (err.response?.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

    const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "meu_preset");
    data.append("cloud_name", "dfuunm4dm");

    const res = await fetch("https://api.cloudinary.com/v1_1/dfuunm4dm/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    console.log(json); // Verifique se tem json.secure_url
    return json.secure_url; // URL da imagem
  };

  const openModal = (event = null) => {
    if (event) {
      setEventAtual(event);
      setForm({
        title: event.title,
        description: event.description,
        date: event.date.substring(0, 10),
        price: event.price,
        image: event.image || "",
      });
    } else {
      setEventAtual(null);
      setForm({ title: "", description: "", date: "", price: "" });
    }
    setShowModal(true);
  };

  const saveEvent = async () => {
    if (!form.title || !form.description || !form.date || !form.price) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = form.image;
      if (image) {
        imageUrl = await uploadImageToCloudinary();
      }

      const dataToSend = { ...form, image: imageUrl };

      if (eventAtual) {
        await axios.put(`http://localhost:5000/api/eventos/${eventAtual._id}`, dataToSend, config);
      } else {
        await axios.post("http://localhost:5000/api/eventos/", dataToSend, config);
      }

      setShowModal(false);
      loadEvents();
    } catch (err) {
      console.error("Erro ao salvar evento:", err);
    } finally {
      setLoading(false);
    }
  };


  const deletedEvent = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        await axios.delete(`http://localhost:5000/api/eventos/${id}`, config);
        loadEvents();
      } catch (err) {
        console.error("Erro ao excluir evento:", err);
      }
    }
  };

  if (user && user.isAdmin === false) {
    return (
      <Container className="mt-5">
        <h3>Acesso negado 🚫</h3>
        <p>Somente administradores podem acessar esta página.</p>
        <a href="/login">Voltar para Login</a>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Painel Administrativo</h2>
      <Button className="mb-3" onClick={() => openModal()}>
        Novo Evento
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev._id}>
              <td>{ev.title}</td>
              <td>{ev.description}</td>
              <td>{ev.date.substring(8, 10) + '/' + ev.date.substring(5, 7) + '/' + ev.date.substring(0, 4)}</td>
              <td>R$ {parseFloat(ev.price).toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openModal(ev)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletedEvent(ev._id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{eventAtual ? "Editar Evento" : "Novo Evento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveEvent} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminPanel;
