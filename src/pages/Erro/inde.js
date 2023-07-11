import { Link } from "react-router-dom";
import "./styles.css";

function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Ops! Página não encontrada!</h2> <br/>
            <Link to="/" >Veja todos os Filmes!</Link>
        </div>
    )
}

export default Erro;