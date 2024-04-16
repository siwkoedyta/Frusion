import React from 'react';

const Overlay = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;