// modals/StartModal.js
import React from 'react';
import Modal from 'react-modal';

const StartModal = ({ isOpen, onStartFromZero, onUseDefaultData }) => {
  return (
    <Modal isOpen={isOpen}>
      <h2>Choisir un mode</h2>
      <button onClick={onStartFromZero}>Partir de zéro</button>
      <button onClick={onUseDefaultData}>Utiliser les données par défaut</button>
    </Modal>
  );
};

export default StartModal;
