'use client'
import { useEffect, useState } from 'react';

export default function ViewSchool() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      const res = await fetch('/api/school');
      const data = await res.json();
      setSchools(data);
    };

    fetchSchools();
  }, []);

  return (
    <div className="school-list">
      <h1>Schools</h1>
      <div className="schools-container">
        {schools.map(school => (
          <div key={school.id} className="school-item">
            <img src={school.image} alt={school.name} />
            <h3>{school.name}</h3>
            <p>{school.address}</p>
            <p>{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}