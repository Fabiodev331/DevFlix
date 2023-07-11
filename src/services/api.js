import axios from "axios";

// URL api: https://api.themoviedb.org/3/movie/157336/videos?api_key=0f08a1f7d781c47ff4598e600f416f7d
// Base url: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})

export default api;