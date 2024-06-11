import React, { useState } from 'react';
import styles from './SearchPage.module.css';
import ghostImage from '../../public/ghost.png'; // Verifique se o caminho está correto

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Previne a submissão padrão do formulário
    if (!searchTerm.trim()) {
      // Verifica se o termo de busca está vazio
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Supondo que você armazene o token no localStorage
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Inclui o token de autorização
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results); // Assume que data.results contém os resultados da busca
      } else {
        console.error('Falha na busca:', response.statusText);
        setResults([]);
      }
    } catch (error) {
      console.error('Ocorreu um erro durante a busca:', error);
      setResults([]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>CronoLog</div>
        <div className={styles.profile}>
          <button id="expandProfile" className={styles.profileButton}>Perfil Expandir</button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`} data-tab="populares">Populares</button>
        <button className={styles.tab} data-tab="pesquisa">Pesquisa</button>
      </div>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Pesquisar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            required
          />
          <button type="submit" id="searchButton" className={styles.searchButton}>
            <i className="fa fa-search"></i> Buscar
          </button>
        </form>
      </div>

      <div className={styles.results}>
        {results.length === 0 ? (
          <div className={styles.noResults}>
            <img src={ghostImage} alt="Sem Resultados" className={styles.noResultsImage} />
            <p>Sem resultados</p>
          </div>
        ) : (
          <div>
            {results.map((result, index) => (
              <div key={index} className={styles.resultItem}>
                {/* Renderize seu item de resultado */}
                {result.title && <h3>{result.title}</h3>}
                {result.description && <p>{result.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
