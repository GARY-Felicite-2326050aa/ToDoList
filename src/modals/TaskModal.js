import React, { useState, useContext } from "react";
import { ToDoListContext } from "../ToDoListContext";
import Modal from "react-modal";
import "../style/Modal.css";

const TaskModal = ({ isOpen, onClose }) => {
  const { addTask, categories } = useContext(ToDoListContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");
  const [category, setCategory] = useState("");
  const [urgent, setUrgent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      title,
      description,
      date_creation: new Date().toLocaleDateString(),
      date_echeance: dateEcheance,
      etat: "Nouveau",
      urgent,
      category,
    });

    setTitle("");
    setDescription("");
    setDateEcheance("");
    setCategory(null);
    setUrgent(false);

    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close-btn" onClick={onClose}>×</span>
          <h3>Ajouter une nouvelle tâche</h3>
          <form onSubmit={handleSubmit}>
            <label>Titre :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Description :</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Échéance :</label>
            <input
              type="date"
              value={dateEcheance}
              onChange={(e) => setDateEcheance(e.target.value)}
            />

            <label>Catégorie :</label>
            <select value={category} onChange={(e) => setCategory(Number(e.target.value))}>
              <option value="">-- Sélectionner une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>

            <label>Urgent :</label>
            <input
              type="checkbox"
              checked={urgent}
              onChange={() => setUrgent(!urgent)}
            />

            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose} className="close-modal-btn">Fermer</button>
          </form>
        </div>
      </div>
    )
  );
};

export default TaskModal;
