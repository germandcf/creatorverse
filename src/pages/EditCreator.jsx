import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import DeleteModal from "../components/DeleteModal";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    imageURL: "",
    description: "",
    youtube: "",
    twitter: "",
    instagram: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadCreator();
  }, [id]);

  async function loadCreator() {
    setLoading(true);
    const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();
    if (error) {
      setErrorMsg(error.message);
    } else {
      setForm({
        name: data.name || "",
        imageURL: data.imageURL || "",
        description: data.description || "",
        youtube: data.youtube || "",
        twitter: data.twitter || "",
        instagram: data.instagram || ""
      });
    }
    setLoading(false);
  }

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name) {
      setErrorMsg("Name is required");
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("creators").update(form).eq("id", id);
    setSaving(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    navigate("/list");
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
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
      <div className="edit-creator">
        <div className="hero">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-creator">
      <div className="hero">
        <h2>Edit Creator</h2>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <div className="card">
          <form onSubmit={handleSubmit}>
            { }
            <div className="form-section">
              <h3 className="section-title">1. Main Information</h3>

              <label>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <small>Enter the creator's name or the name of their brand/channel.</small>
              </label>

              <label>
                Image
                <input
                  name="imageURL"
                  value={form.imageURL}
                  onChange={onChange}
                />
                <small>Provide a link to an image of your creator. Be sure to include http:// or https://.</small>
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                />
                <small>Provide a description of the creator. Who are they? What makes them interesting?</small>
              </label>
            </div>

            { }
            <div className="form-section">
              <h3 className="section-title">2. Social Media</h3>
              <p className="section-description">Provide at least one of the creator's social media links.</p>

              <label>
                YouTube
                <input
                  name="youtube"
                  value={form.youtube}
                  onChange={onChange}
                />
                <small>The creator's YouTube handle (without the @)</small>
              </label>

              <label>
                Twitter
                <input
                  name="twitter"
                  value={form.twitter}
                  onChange={onChange}
                />
                <small>The creator's Twitter handle (without the @)</small>
              </label>

              <label>
                Instagram
                <input
                  name="instagram"
                  value={form.instagram}
                  onChange={onChange}
                />
                <small>The creator's Instagram handle (without the @)</small>
              </label>
            </div>

            { }
            <div className="form-section">
              <h3 className="section-title">3. Final Action</h3>
              <div className="action-buttons-group">
                <button type="submit" disabled={saving} className="submit-button">
                  {saving ? "Saving..." : "UPDATE"}
                </button>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="delete-button"
                >
                  DELETE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      { }
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        creatorName={form.name}
      />
    </div>
  );
}
