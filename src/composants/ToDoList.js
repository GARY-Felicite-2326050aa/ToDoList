import React, { useContext } from "react";
import { ToDoListContext } from "../ToDoListContext";
import Task from "./Task"; 
import Categorie from "./Categorie";
import { ETATS, ETAT_TERMINE } from "../taskEnum";
import Filter from "./Filters"; // Import du composant Filter

function TodoList() {
  const { tasks, mode, categories, filters, setFilters } = useContext(ToDoListContext);

  
  return (
    <div>
      {mode === "tache" ? (
        <div>
          <h3>Liste des Tâches</h3>
          
          {/* Afficher le filtre */}
          <Filter categories={categories} filters={filters} setFilters={setFilters} />
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
      ) : (
        <div>
          <h3>Catégories</h3>
          <ul>
            {categories.map((cat) => (
              <Categorie key={cat.id} categorie={cat} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoList;
