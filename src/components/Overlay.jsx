// File: src/components/Overlay.jsx
import React from 'react';
import './Overlay.css';

const Overlay = ({ video, onClose }) => {
  return (
    <div className="overlay-modal">
      <div className="overlay-content">
        <h2>User Information</h2>
        <p><strong>Username:</strong> {video.username}</p>
        <p><strong>Description:</strong> {video.description}</p>
        <p><strong>Song:</strong> {video.song}</p>
        <p><strong>Likes:</strong> {video.likes}</p>
        <p><strong>Comments:</strong> {video.comments}</p>
        <p><strong>Saves:</strong> {video.saves}</p>
        <p><strong>Shares:</strong> {video.shares}</p>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
