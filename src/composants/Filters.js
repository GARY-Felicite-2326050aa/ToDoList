import React, { useState } from "react";
import { ETATS } from "../taskEnum";
import "../style/Filter.css";

const Filter = ({ categories, filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedCategories: prevFilters.selectedCategories.includes(categoryId)
        ? prevFilters.selectedCategories.filter((id) => id !== categoryId)
        : [...prevFilters.selectedCategories, categoryId],
    }));
  };

  const handleEtatChange = (e) => {
    const etat = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedEtats: prevFilters.selectedEtats.includes(etat)
        ? prevFilters.selectedEtats.filter((e) => e !== etat)
        : [...prevFilters.selectedEtats, etat],
    }));
  };

  const handleUrgentChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      urgentOnly: !prevFilters.urgentOnly,
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: e.target.value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      selectedCategories: [],
      selectedEtats: [],
      urgentOnly: false,
      sortBy: null,
    });
  };

  return (
    <div className="filter-container">
      <div className="left">
        {/* Bouton pour afficher/masquer les filtres */}
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Masquer les filtres" : "Filtres"}
        </button>

        {showFilters && (
          <div className="filters">
            <div>
              <label>Filtrer par catégorie :</label>
              {categories.map((cat) => (
                <div key={cat.id}>
                  <input
                    type="checkbox"
                    value={cat.id}
                    checked={filters.selectedCategories.includes(cat.id)}
                    onChange={handleCategoryChange}
                  />
                  <label>{cat.title}</label>
                </div>
              ))}
            </div>

            <div>
              <label>Filtrer par état :</label>
              {Object.values(ETATS).map((etat) => (
                <div key={etat}>
                  <input
                    type="checkbox"
                    value={etat}
                    checked={filters.selectedEtats.includes(etat)}
                    onChange={handleEtatChange}
                  />
                  <label>{etat}</label>
                </div>
              ))}
            </div>

            <div>
              <label>Urgent uniquement :</label>
              <input type="checkbox" checked={filters.urgentOnly} onChange={handleUrgentChange} />
            </div>

            <button onClick={resetFilters}>Réinitialiser</button>
          </div>
        )}
      </div>

      <div className="right">
        {/* Le tri reste toujours visible à droite */}
        <label>Trier par :</label>
        <select value={filters.sortBy} onChange={handleSortChange}>
          <option value="date_creation">Date de création</option>
          <option value="date_echeance">Date d'échéance</option>
          <option value="title">Nom</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
