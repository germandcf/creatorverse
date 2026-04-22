import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import CreatorCard from '../components/CreatorCard';
import '../styles/globals.css';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ShowCreators mounted');
    fetchCreators();
  }, []);

  async function fetchCreators() {
    console.log('Fetching creators...');
    setLoading(true);
    const { data, error } = await supabase.from('creators').select('*').order('id');
    console.log('Supabase response:', { data, error });
    if (error) console.error(error);
    else setCreators(data ?? []);
    setLoading(false);
  }


  console.log('ShowCreators render:', { loading, creatorsCount: creators.length });

  if (loading) return (
    <div className="show-creators">
      <div className="hero">
        <h2>Cargando...</h2>
      </div>
    </div>
  );

  if (!creators.length) return (
    <div className="show-creators">
      <div className="hero">
        <h2>No hay creadores</h2>
        <p>Agrega el primero para comenzar</p>
      </div>
    </div>
  );

  return (
    <div className="show-creators">
      <div className="grid">
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>
    </div>
  );
}
