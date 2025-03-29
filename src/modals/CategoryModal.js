import React, { useState, useContext } from "react";
import { ToDoListContext } from "../ToDoListContext";
import Modal from "react-modal";

const emojiList = [
  "📌", "✅", "⚠️", "📅", "📝", "💡", "🚀", "🎯", "📚", "🏆"
];

const CategoryModal = ({ isOpen, onClose }) => {
  const { addCategory } = useContext(ToDoListContext);

  // États pour gérer les champs du formulaire
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#ffffff"); // Couleur par défaut
  const [emoji, setEmoji] = useState(emojiList[0]); // Emoji par défaut
  const [actif, setActif] = useState(true); // Catégorie active par défaut

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory({ title, color, emoji, actif });
    setTitle(""); // Réinitialiser les champs
    setColor("#ffffff");
    setEmoji(emojiList[0]);
    setActif(true);
    onClose(); // Fermer le modal
  };

  return (
    <Modal isOpen={isOpen}>
      <h2>Ajouter une catégorie</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Couleur :</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label>Emoji :</label>
        <select value={emoji} onChange={(e) => setEmoji(e.target.value)}>
          {emojiList.map((emj, index) => (
            <option key={index} value={emj}>{emj}</option>
          ))}
        </select>

        <label>Actif :</label>
        <input
          type="checkbox"
          checked={actif}
          onChange={() => setActif(!actif)}
        />

        <button type="submit">Ajouter</button>
      </form>
      <button onClick={onClose}>Fermer</button>
    </Modal>
  );
};

export default CategoryModal;