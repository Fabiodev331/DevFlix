import React,{useEffect, useState} from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import './styles.css';

import api from "../../services/api";

import { toast } from "react-toastify";

function Filme() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "0f08a1f7d781c47ff4598e600f416f7d",
          language: "pt-BR",
        }
      })
      .then((response) => {
        setFilme(response.data)
        setLoading(false);
      })
      .catch(() => {
        navigate("/", {replace: true});
        return;
      })
    }

    loadFilme();

    return () => {
      console.log("Desmontou")
    }
  }, [navigate, id])

  function saveFilme(){
    const minhaLista = localStorage.getItem("@devflix");

    let filmesSaved = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSaved.some((filmeSaved) => filmeSaved.id === filme.id);

    if(hasFilme){
      toast.warning("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }
    filmesSaved.push(filme);
    localStorage.setItem("@devflix", JSON.stringify(filmesSaved));
    toast.success("FILME SALVO COM SUCESSO");
  }

  if(loading){
    return(
      <div className="loading-filme">
        <h2>Carregando detalhes do filme...</h2>
      </div>
    )
  }

    return (
      <div className="container" >
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average} / 10.000</strong>

        <div className="area-button" >
          <button onClick={saveFilme} >Salvar</button>
          <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} >
              Trailer
            </a>
          </button>
        </div>
      </div>
    );
  }
  
  export default Filme;