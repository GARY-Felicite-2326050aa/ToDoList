import React from "react";
import "../style/Categorie.css"; // Importation du CSS

function Categorie({ categorie }) {
  // Vérification si l'emoji est défini sinon utiliser un emoji par défaut
  const emoji = categorie.emoji || "📁"; // Emoji par défaut si aucun emoji n'est défini

  return (
    <li className="categorie" style={{ borderLeftColor: categorie.color }}>
      <span className="emoji">{emoji}</span> {/* Affichage de l'emoji */}
      <span className="name">{categorie.title}</span> {/* Affichage du titre de la catégorie */}
    </li>
  );
}

export default Categorie;
