import React, { createContext, useState } from 'react';
import data from './data/taches.json';
import "./style/App.css";
import { ETAT_TERMINE } from './taskEnum';

export const ToDoListContext = createContext();

export const ToDoListProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [relations, setRelations] = useState([]);
  const [mode, setMode] = useState("tache"); 
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  

  // Filtres et tri
  const [filters, setFilters] = useState({
    selectedCategories: [],  // Par défaut, un tableau vide
    selectedEtats: [],       // Par défaut, un tableau vide
    urgentOnly: false,
    sortBy: null, // Pas de critère de tri défini
  });

  // Fonction de soumission pour les tâches
  const handleSubmitTask = (e, title, description, onClose) => {
    e.preventDefault();
    addTask({ title, description });
    onClose(); // Fermer le modal après l'ajout
  };

  // Fonction de soumission pour les catégories
  const handleSubmitCategory = (e, title, color, emoji, actif, onClose) => {
    e.preventDefault();
    addCategory({ title, color, emoji, actif });
    onClose(); // Fermer le modal après l'ajout
  };

  const handleStartFromZero = () => {
    setTasks([]);
    setCategories([]);
    setRelations([]);
    setAllTasks([]);
    setIsModalOpen(false);
  };

  const handleUseDefaultData = () => {
    setTasks(data.taches);
    setCategories(data.categories);
    setRelations(data.relations);
    setAllTasks(data.taches);
    setIsModalOpen(false);
  };

  const handleModeSwitch = () => {
    setMode(mode === "tache" ? "categorie" : "tache");
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, etat: task.etat === "Reussi" ? "En cours" : "Reussi" }
          : task
      )
    );
  };

  // Fonction pour ajouter une tâche
  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    setTasks([...tasks, newTask]);
    setAllTasks((prevAllTasks) => [...prevAllTasks, newTask]); 

    if (task.category) {
      const newRelation = { tache: newTask.id, categorie: task.category };
      setRelations([...relations, newRelation]);
      console.log("Relation ajoutée :", newRelation); // Vérifie si la relation est bien enregistrée
    }

    setIsModalOpen(false);
  };

  // Fonction pour ajouter une catégorie
  const addCategory = (category) => {
    setCategories([...categories, { id: Date.now(), ...category }]); // Ajoute un ID unique
    setIsModalOpen(false);
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Appliquer les filtres et le tri aux tâches
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };
 
  const filteredTasks = tasks
  .filter((task) => {
    // Si aucun état n'est sélectionné, on exclut les tâches terminées par défaut
    if (filters.selectedEtats.length === 0) {
      return !ETAT_TERMINE.includes(task.etat);
    }
    
    // Sinon, on affiche toutes les tâches correspondant aux états sélectionnés
    return filters.selectedEtats.includes(task.etat);
  }) // Exclure les tâches terminées par défaut
    .filter((task) => {
      // Filtrer par catégorie en utilisant les relations
      if (filters.selectedCategories.length === 0) {
        return true; // Si aucune catégorie sélectionnée, on garde toutes les tâches
      }
      
      // Vérifier si une des relations de la tâche correspond à une catégorie sélectionnée
      const taskCategories = relations.filter((rel) => rel.tache === task.id).map((rel) => rel.categorie);
      return taskCategories.some((categoryId) => filters.selectedCategories.includes(categoryId));
    })
    .filter((task) => 
      filters.selectedEtats.length === 0 || filters.selectedEtats.includes(task.etat)
    )
    .filter((task) => !filters.urgentOnly || task.urgent)
    .sort((a, b) => {
      if (filters.sortBy) {
        if (filters.sortBy === "date_creation") {
          // Comparer les dates de création après les avoir formatées
          return new Date(formatDate(b.date_creation)) - new Date(formatDate(a.date_creation));
        }
        if (filters.sortBy === "date_echeance") {
          // Comparer les dates d'échéance après les avoir formatées
          return new Date(formatDate(a.date_echeance)) - new Date(formatDate(b.date_echeance));
        }
        if (filters.sortBy === "title") {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          }
      }
      return 0;
    });
  
  
  return (
    <ToDoListContext.Provider value={{
      tasks: filteredTasks, // Passe les tâches filtrées et triées
      setTasks, 
      categories, 
      mode,
      relations, 
      handleModeSwitch, 
      addTask,
      addCategory, 
      handleSubmitTask,
      handleSubmitCategory,
      isModalOpen, 
      handleStartFromZero, 
      handleUseDefaultData, 
      toggleTaskStatus, 
      deleteTask,
   
      allTasks,
      filters, 
      setFilters, // Passe la fonction setFilters pour modifier les filtres
    }}>
      {children}
    </ToDoListContext.Provider>
  );
};
