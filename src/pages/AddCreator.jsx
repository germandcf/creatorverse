import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    imageURL: "",
    description: "",
    youtube: "",
    twitter: "",
    instagram: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name) {
      setErrorMsg("Name is required");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("creators").insert([form]);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    navigate("/list");
  }

  return (
    <div className="add-creator">
      <div className="hero">
        <h2>Add a Creator</h2>

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
              <button type="submit" disabled={loading} className="submit-button">
                {loading ? "Saving..." : "SUBMIT"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}