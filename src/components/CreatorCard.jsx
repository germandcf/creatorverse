import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../styles/globals.css';

export default function CreatorCard({ creator }) {
  const { id, name, url, description, imageURL, youtube, twitter, instagram } = creator;

  return (
    <div className="profile-card">
      { }
      <div className="profile-background">
        {imageURL ? (
          <img
            src={imageURL}
            alt={name}
            className="background-image"
          />
        ) : (
          <div className="background-image placeholder">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        { }
        <div className="overlay"></div>
      </div>

      { }
      <div className="profile-content">
        { }
        <div className="action-buttons">
          <Link to={`/creators/${id}`} className="action-btn info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </Link>
          <Link to={`/edit/${id}`} className="action-btn edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </Link>
        </div>

        { }
        <h2 className="profile-title">{name}</h2>

        { }
        <div className="social-icons">
          {youtube && (
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FontAwesomeIcon icon={faYoutube} size="lg" />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          )}
        </div>

        { }
        <p className="profile-description">{description}</p>
      </div>
    </div>
  );
}
