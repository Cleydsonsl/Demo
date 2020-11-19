import React, { useState, useEffect } from 'react';

import api from './services/api';
import './App.css';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(res => {
      setProjects(res.data);
    });
  }, []);

  async function handleAddProject() {
    //projects.push(`New project ${Date.now()}`);
    //setProjects([...projects, `New project ${Date.now()}`]);

    const res = await api.post('projects', {
      title: `New project ${Date.now()}`,
      owner: "ReactJS"
    });

    const project = res.data;

    setProjects([...projects, project])
  }

  return (
    <>
      <Header title= "rocket"/>

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Add Projects</button>
    </>
  );
}

export default App;