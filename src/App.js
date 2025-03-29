import { ToDoListProvider, ToDoListContext } from './ToDoListContext';
import TodoList from './composants/ToDoList';
import Filters from "./composants/Filters"; 
import PieChart from './composants/PieChart';
import Modal from 'react-modal';
import TaskModal from './modals/TaskModal';
import CategoryModal from './modals/CategoryModal';
import StartModal from './modals/StartModal';
import React, { useState, useContext } from 'react';
import { ETAT_TERMINE } from './taskEnum';

function AppContent() {
  const { isModalOpen, handleStartFromZero, handleUseDefaultData, mode, handleModeSwitch,allTasks } = useContext(ToDoListContext);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  
  // Méthode pour obtenir le nombre de tâches terminées
  const getFinishedTasks = () => allTasks.filter(task => ETAT_TERMINE.includes(task.etat)).length;

  // Méthode pour obtenir le nombre de tâches non terminées
  const getNonFinishedTasks = () => allTasks.filter(task => !ETAT_TERMINE.includes(task.etat)).length;

  return (
    <div className="App">
      
       <StartModal 
        isOpen={isModalOpen}
        onStartFromZero={handleStartFromZero}
        onUseDefaultData={handleUseDefaultData}
      />
       <header className="header">
        <h1>ToDo List</h1>
       <h2>Fini {getFinishedTasks()}</h2>
       <h2>Non Fini {getNonFinishedTasks()}</h2>
      </header>

      {/* Affichage des composants selon le mode */}
      <TodoList />
      <PieChart />

      {/* Modals pour ajout de tâche et de catégorie */}
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <CategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
      <footer className="footer">
      {/* Bouton pour basculer entre les modes */}
      <button onClick={handleModeSwitch}>
          {mode === "tache" ? "Voir les catégories" : "Voir les tâches"}
        </button>
        
        {/* Bouton pour ajouter une catégorie ou une tâche selon le mode */}
        <button
          onClick={() => {
            if (mode === "categorie") {
              setIsCategoryModalOpen(true); // Ouvrir le modal de catégorie
            } else {
              setIsTaskModalOpen(true); // Ouvrir le modal de tâche
            }
          }}
        >
          Ajouter {mode === "categorie" ? "une catégorie" : "une tâche"}
        </button>
      </footer>
    </div>
   
  );
}

function App() {
  return (
    <ToDoListProvider>
      <AppContent />
    </ToDoListProvider>
  );
}

export default App;
