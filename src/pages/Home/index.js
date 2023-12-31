import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css"

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get("movie/popular", {
        params:{
          api_key: "0f08a1f7d781c47ff4598e600f416f7d",
          language: "pt-BR",
          page: 1,
        }
      })
    
      setFilmes(response.data.results);
      setLoading(false);
    }

    
    loadFilmes();
  }, [])


    if(loading){
      return(
        <div className="loading">
          <h2>Carregando filmes...</h2>
        </div>
      )
    }

    return (
      <div className="container">
        <div className="lista-filmes">
          {filmes.map((filme) => {
            return(
              <article key={filme.id} >
                <strong>{filme.title}</strong>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} />
                <Link to={`/filme/${filme.id}`} >Acessar</Link>
              </article>
            )
          })}
        </div>
      </div>
    );
  }
  
  export default Home;