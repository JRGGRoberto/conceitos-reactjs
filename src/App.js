import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

//import Header from './components/Header';

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Cambio',
      url: 'https://github.com/JRGGRoberto/Cambio',
      techs: ['Dart', 'Java', 'Typescript']
    });

    setRepositories([...repositories, response.data]);
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id} ><h1>{repository.title}</h1>
           🔗 <a href={repository.url}>{repository.url}</a>
            <ul>      
              {repository.techs.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            👍 {repository.likes}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
          ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
