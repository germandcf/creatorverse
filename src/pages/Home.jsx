import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import '../styles/globals.css';

const Home = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    setLoading(true);
    const { data, error } = await supabase.from('creators').select('*').order('id');
    if (error) console.error(error);
    else setCreators(data ?? []);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="home">
        <div className="no-creators-section">
          <div className="no-creators">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="no-creators-section">
        { }
        {creators.length === 0 && (
          <div className="no-creators">No hay creadores. Agrega el primero.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
