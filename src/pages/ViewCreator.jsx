import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import DeleteModal from "../components/DeleteModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadCreator();
  }, [id]);

  async function loadCreator() {
    setLoading(true);
    const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
    if (error) {
      console.error(error);
    } else {
      setCreator(data);
    }
    setLoading(false);
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    setShowDeleteModal(false);
    navigate("/list");
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="view-creator">
        <div className="hero">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="view-creator">
        <div className="hero">
          <h2>Creator not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="view-creator">
      <div className="hero">
        <div className="creator-detail">
          { }
          <div className="creator-image-section">
            {creator.imageURL ? (
              <img
                src={creator.imageURL}
                alt={creator.name}
                className="creator-large-image"
              />
            ) : (
              <div className="creator-large-image placeholder">
                {creator.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          { }
          <div className="creator-info-section">
            { }
            <h1 className="creator-detail-title">
              {creator.name.toUpperCase()}
            </h1>

            { }
            <div className="creator-description">
              <p>{creator.description}</p>
            </div>

            { }
            <div className="creator-social-links">
              {creator.youtube && (
                <a
                  href={creator.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                  <span>YouTube</span>
                </a>
              )}

              {creator.twitter && (
                <a
                  href={creator.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                  <span>Twitter</span>
                </a>
              )}

              {creator.instagram && (
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                  <span>Instagram</span>
                </a>
              )}
            </div>

            { }
            <div className="creator-actions">
              <button
                onClick={() => navigate(`/edit/${creator.id}`)}
                className="action-button edit-button"
              >
                EDIT
              </button>
              <button
                onClick={handleDeleteClick}
                className="action-button delete-button"
              >
                DELETE
              </button>
              <button
                onClick={() => navigate("/list")}
                className="action-button back-button"
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      </div>

      { }
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        creatorName={creator.name}
      />
    </div>
  );
}
