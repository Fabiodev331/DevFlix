import React, {useEffect, useState} from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function Favritos(){
   const [filmes, setFilmes] = useState([]);

   useEffect(() => {
      const minhaLista = localStorage.getItem("@devflix");
      setFilmes(JSON.parse(minhaLista) || []);

   }, [])

   function excluirfilme(id){
    let filmesfilter = filmes.filter( (item) => {
      return (item.id !== id);
    })

    setFilmes(filmesfilter);
    localStorage.setItem("@devflix", JSON.stringify(filmesfilter));
    toast.info("Filme excluido com sucesso!");
   }

   return(
      <div className="meus-filmes" >
         <h1>Meus filmes</h1>

         {filmes.length === 0 && <span>Você não possuí nenhum filme salvo.</span>}

         <ul>
            {filmes.map((item) => {
               return(
                  <li key={item.id}>
                     <span>{item.title}</span>

                     <div>
                        <Link to={`./filmes/${item.id}`} >Ver detalhes</Link>
                        <button onClick={() => excluirfilme(item.id)} >Excluir</button>
                     </div>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default Favritos;