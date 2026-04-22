import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ creator }) => {
  const { name, description, imageURL, youtube, instagram } = creator;

  return (
    <div className="profile-card">
      { }
      {imageURL ? (
        <img
          src={imageURL}
          alt={name}
          className="profile-image"
        />
      ) : (
        <div className="profile-image default-avatar">
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      { }
      <div className="profile-content">
        <h2>{name}</h2>
        <p>{description}</p>

        { }
        <div className="social-links">
          {youtube && (
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="youtube-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376 1.505A3.017 3.017 0 0 0 .502 6.186C.352 8.264 0 10.375 0 12.242c0 1.87.352 3.978.502 6.056a3.016 3.016 0 0 0 2.122 2.136c1.871 1.505 9.376 1.505 9.376 1.505s7.505 0 9.376-1.505a3.015 3.015 0 0 0 2.122-2.136c.15-2.078.502-4.186.502-6.056 0-1.867-.352-3.975-.502-6.056zm-11.376 8.698a5.12 5.12 0 0 1 0-10.24h10.24v10.24z" />
              </svg>
              YouTube
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="instagram-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 3.204 0 3.584-.012 4.85-.07 3.252-.148 4.771-1.691 4.919-4.919.058-1.265.07-1.645.07-4.85-.012-3.204-.069-3.584-.07-4.85-.148-3.252-1.691-4.771-4.919-4.919-1.265-.058-1.645-.069-4.849-.069-3.204.012-3.584.07-4.85.148-3.252 1.691-4.771 4.919-4.919 1.265-.058 1.645-.069 4.849-.069zm0 2.163c-3.204 0-3.584.012-4.85.07-3.252.148-4.771 1.691-4.919 4.919-.058 1.265-.069 1.645-.069 4.849 0 3.204.012 3.584.07 4.85.148 3.252 1.691 4.771 4.919 4.919.058 1.265.069 1.645.069 4.849-.012 3.204-.069 3.584-.07 4.85-.148 3.252-1.691 4.771-4.919 4.919-1.265.058-1.645.069-4.849.069zm-1.5-5.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm-6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
              </svg>
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
