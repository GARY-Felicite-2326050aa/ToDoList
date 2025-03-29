import React, { useContext } from "react";
import { ToDoListContext } from "../ToDoListContext";
import { ETATS, ETAT_TERMINE } from "../taskEnum";
import "../style/Task.css"; // Assurez-vous que le CSS est appliqué

function Task({ task }) {
  const { toggleTaskStatus, deleteTask, categories, relations } = useContext(ToDoListContext);

  // Vérifier si la tâche est terminée
  const isCompleted = ETAT_TERMINE.includes(task.etat);
 

  // Trouver la relation tâche-catégorie
  const relation = relations.find(rel => rel.tache === task.id);
  const category = relation ? categories.find(cat => cat.id === relation.categorie) : null;
  
  const categoryTitle = category ? category.title : "Sans catégorie";
  const categoryColor = category ? category.color : "#ccc";

  const taskTitleStyle = isCompleted 
  ? { textDecoration: "line-through", color: task.urgent ? "red" : "black" } 
  : { color: task.urgent ? "red" : "black" };

return (
  <li className="task" style={{ borderLeftColor: categoryColor }}>
    <div className="task-header">
      {/* Ajoute une classe spécifique pour barrer uniquement le titre */}
      <strong className={isCompleted ? "task-title completed" : "task-title"} style={taskTitleStyle}>
        {task.title}
      </strong>
      <span className="task-category" style={{ backgroundColor: categoryColor }}>
        {categoryTitle}
      </span>
    </div>
    <p className="task-dates">
      🗓 Créée le: {task.date_creation} | ⏳ Échéance: {task.date_echeance}
    </p>
    <p className="task-status" style={{ borderColor: isCompleted ? "#28a745" : "#f0ad4e" }}>
      {task.etat}
    </p>
    {task.description && <p className="task-desc">📝 {task.description}</p>}
    
    <div className="task-actions">
      {!isCompleted && (
        <button className="btn-toggle" onClick={() => toggleTaskStatus(task.id)}>
          ✔️ Terminer
        </button>
      )}
      {isCompleted && (
        <button className="btn-toggle" onClick={() => toggleTaskStatus(task.id)}>
          ❌ Annuler
        </button>
      )}
      <button className="btn-delete" onClick={() => deleteTask(task.id)}>🗑️ Supprimer</button>
    </div>
  </li>
);
}

export default Task;
